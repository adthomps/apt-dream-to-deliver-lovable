
-- Create a table for refinement inputs
CREATE TABLE public.refinement_inputs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'anonymous',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  raw_text TEXT NOT NULL,
  epics JSONB NOT NULL DEFAULT '[]'::jsonb,
  user_stories JSONB NOT NULL DEFAULT '[]'::jsonb,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
  latest_revision_id UUID
);

-- Add Row Level Security (RLS) 
ALTER TABLE public.refinement_inputs ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view all refinements (for now, since we're using anonymous users)
CREATE POLICY "Anyone can view refinements" 
  ON public.refinement_inputs 
  FOR SELECT 
  USING (true);

-- Create policy that allows users to insert refinements
CREATE POLICY "Anyone can create refinements" 
  ON public.refinement_inputs 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows users to update refinements
CREATE POLICY "Anyone can update refinements" 
  ON public.refinement_inputs 
  FOR UPDATE 
  USING (true);
