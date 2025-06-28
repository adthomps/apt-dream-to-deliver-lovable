
export interface Epic {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface UserStory {
  id: string;
  epicId: string;
  role: string;
  goal: string;
  reason: string;
  acceptanceCriteria: string[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  userStoryIds: string[];
}

export interface Task {
  id: string;
  featureId: string;
  summary: string;
  description: string;
  estimatedHours: number;
  priority: 'High' | 'Medium' | 'Low';
}

export interface RefinementInput {
  id: string;
  userId: string;
  createdAt: string;
  rawText: string;
  latestRevisionId: string;
}

export interface RefinementRevision {
  id: string;
  inputId: string;
  createdAt: string;
  epics: Epic[];
  userStories: UserStory[];
  features: Feature[];
  tasks: Task[];
}

export interface RefinementResult {
  epics: Epic[];
  userStories: UserStory[];
  features: Feature[];
  tasks: Task[];
}
