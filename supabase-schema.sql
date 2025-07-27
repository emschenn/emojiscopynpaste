-- Create the emojis table
CREATE TABLE IF NOT EXISTS public.emojis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    emoji TEXT NOT NULL,
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.emojis ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for anonymous users
-- Note: In production, you might want more restrictive policies
CREATE POLICY "Allow all operations for anonymous users" ON public.emojis
    FOR ALL USING (true) WITH CHECK (true);

-- Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS emojis_created_at_idx ON public.emojis (created_at DESC);

-- Create an index on tags for better search performance
CREATE INDEX IF NOT EXISTS emojis_tags_idx ON public.emojis USING GIN (tags);