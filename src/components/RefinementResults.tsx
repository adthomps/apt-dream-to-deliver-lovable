
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Users, Zap, CheckSquare, Clock } from "lucide-react";
import { RefinementResult } from "@/types/refinement";

interface RefinementResultsProps {
  results: RefinementResult;
}

const RefinementResults: React.FC<RefinementResultsProps> = ({ results }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Refined Requirements</CardTitle>
        <p className="text-muted-foreground">
          Your requirements have been structured into actionable components
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="epics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="epics" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Epics ({results.epics.length})
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Stories ({results.userStories.length})
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Features ({results.features.length})
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Tasks ({results.tasks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="epics" className="space-y-4">
            {results.epics.map((epic) => (
              <Card key={epic.id} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{epic.title}</CardTitle>
                    <Badge className={getPriorityColor(epic.priority)}>
                      {epic.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{epic.description}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="stories" className="space-y-4">
            {results.userStories.map((story) => (
              <Card key={story.id} className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    As a {story.role}, I want to {story.goal}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    <strong>So that:</strong> {story.reason}
                  </p>
                  {story.acceptanceCriteria.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Acceptance Criteria:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {story.acceptanceCriteria.map((criteria, index) => (
                          <li key={index}>{criteria}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            {results.features.map((feature) => (
              <Card key={feature.id} className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                  {feature.userStoryIds.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium">Related User Stories: {feature.userStoryIds.length}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            {results.tasks.map((task) => (
              <Card key={task.id} className="border-l-4 border-l-orange-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{task.summary}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {task.estimatedHours}h
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{task.description}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RefinementResults;
