
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { inputText } = await req.json();

    if (!inputText) {
      return new Response(
        JSON.stringify({ error: 'Input text is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Processing requirements refinement for:', inputText);

    const systemPrompt = `You are a senior product manager and business analyst. Your task is to take raw product ideas or feature descriptions and convert them into well-structured requirements.

Given the input text, create a comprehensive breakdown into:
1. Epics (high-level features or capabilities)
2. User Stories (specific user needs in "As a... I want... So that..." format)
3. Features (concrete functionality)
4. Tasks (specific development work items)

Return your response as a valid JSON object with this exact structure:
{
  "epics": [
    {
      "id": "epic-1",
      "title": "Epic Title",
      "description": "Detailed description",
      "priority": "High|Medium|Low"
    }
  ],
  "userStories": [
    {
      "id": "story-1",
      "epicId": "epic-1",
      "role": "user role",
      "goal": "what they want to achieve",
      "reason": "why they want it",
      "acceptanceCriteria": ["criteria 1", "criteria 2"]
    }
  ],
  "features": [
    {
      "id": "feature-1",
      "title": "Feature Title",
      "description": "Feature description",
      "userStoryIds": ["story-1"]
    }
  ],
  "tasks": [
    {
      "id": "task-1",
      "featureId": "feature-1",
      "summary": "Task summary",
      "description": "Detailed task description",
      "estimatedHours": 8,
      "priority": "High|Medium|Low"
    }
  ]
}

Make sure:
- Each item has a unique ID
- Priorities are realistic and distributed
- User stories follow proper format
- Tasks are specific and actionable
- Estimated hours are reasonable (1-40 hours per task)
- IDs properly link related items`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please refine these requirements:\n\n${inputText}` }
        ],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI Response:', aiResponse);

    // Parse the AI response as JSON
    let refinedRequirements;
    try {
      refinedRequirements = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      throw new Error('Failed to parse AI response');
    }

    // Validate the structure
    if (!refinedRequirements.epics || !refinedRequirements.userStories || 
        !refinedRequirements.features || !refinedRequirements.tasks) {
      throw new Error('Invalid response structure from AI');
    }

    return new Response(JSON.stringify(refinedRequirements), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in refine-requirements function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
