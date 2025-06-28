
import React, { useState } from 'react';
import RefinementForm from '@/components/RefinementForm';
import RefinementResults from '@/components/RefinementResults';
import { refinementService } from '@/services/refinementService';
import { RefinementResult } from '@/types/refinement';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, History, Sparkles } from "lucide-react";

const Index = () => {
  const [results, setResults] = useState<RefinementResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentInput, setCurrentInput] = useState('');

  const handleRefinement = async (inputText: string) => {
    setIsLoading(true);
    setCurrentInput(inputText);
    
    try {
      const refinedResults = await refinementService.refineRequirements(inputText);
      setResults(refinedResults);
      
      // Save the refinement for history
      await refinementService.saveRefinement(inputText, refinedResults);
    } catch (error) {
      console.error('Error refining requirements:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNew = () => {
    setResults(null);
    setCurrentInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Dream to Deliver
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your product ideas into structured requirements that teams can execute
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {!results ? (
            <>
              <RefinementForm onSubmit={handleRefinement} isLoading={isLoading} />
              
              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="text-center">
                  <CardHeader>
                    <Sparkles className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <CardTitle className="text-lg">AI-Powered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Advanced AI analyzes your ideas and creates comprehensive requirements
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <History className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                    <CardTitle className="text-lg">Version History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Keep track of all your refinements and iterate on previous versions
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <div className="h-8 w-8 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-2" />
                    <CardTitle className="text-lg">Structured Output</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Get epics, user stories, features, and tasks ready for your team
                    </p>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between max-w-6xl mx-auto">
                <Button
                  variant="outline"
                  onClick={handleStartNew}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Start New Refinement
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  <strong>Original Input:</strong> {currentInput.substring(0, 100)}...
                </div>
              </div>
              
              <RefinementResults results={results} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
