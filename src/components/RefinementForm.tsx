
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RefinementFormProps {
  onSubmit: (text: string) => Promise<void>;
  isLoading: boolean;
}

const RefinementForm: React.FC<RefinementFormProps> = ({ onSubmit, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter your product idea or requirements.",
        variant: "destructive"
      });
      return;
    }

    try {
      await onSubmit(inputText.trim());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <Sparkles className="h-6 w-6 text-blue-600" />
          Requirements Refinement
        </CardTitle>
        <p className="text-muted-foreground">
          Transform your raw product ideas into structured epics, user stories, features, and development tasks.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="requirements" className="block text-sm font-medium mb-2">
              Describe your product idea or feature requirements
            </label>
            <Textarea
              id="requirements"
              placeholder="Example: We need a mobile app that helps users track their daily water intake. Users should be able to set goals, log consumption, get reminders, and see their progress over time. The app should also provide insights about hydration habits and integrate with health apps."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] resize-none"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || !inputText.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refining Requirements...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Refine Requirements
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RefinementForm;
