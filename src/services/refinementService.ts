
import { supabase } from "@/integrations/supabase/client";
import { RefinementResult } from "@/types/refinement";

export class RefinementService {
  async refineRequirements(inputText: string): Promise<RefinementResult> {
    console.log('Refining requirements for input:', inputText);
    
    try {
      const { data, error } = await supabase.functions.invoke('refine-requirements', {
        body: { inputText }
      });

      if (error) {
        console.error('Error calling refine-requirements function:', error);
        throw new Error('Failed to refine requirements');
      }

      console.log('Refinement result:', data);
      return data;
    } catch (error) {
      console.error('Error in refineRequirements:', error);
      throw error;
    }
  }

  async saveRefinement(inputText: string, result: RefinementResult, userId: string = 'anonymous') {
    try {
      const { data, error } = await supabase
        .from('refinement_inputs')
        .insert({
          user_id: userId,
          raw_text: inputText,
          epics: result.epics,
          user_stories: result.userStories,
          features: result.features,
          tasks: result.tasks
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving refinement:', error);
        throw new Error('Failed to save refinement');
      }

      return data;
    } catch (error) {
      console.error('Error in saveRefinement:', error);
      throw error;
    }
  }

  async getRefinementHistory(userId: string = 'anonymous', limit: number = 10) {
    try {
      const { data, error } = await supabase
        .from('refinement_inputs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching refinement history:', error);
        throw new Error('Failed to fetch refinement history');
      }

      return data || [];
    } catch (error) {
      console.error('Error in getRefinementHistory:', error);
      throw error;
    }
  }
}

export const refinementService = new RefinementService();
