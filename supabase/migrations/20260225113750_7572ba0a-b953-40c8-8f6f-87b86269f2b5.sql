-- Create a storage bucket for data files
INSERT INTO storage.buckets (id, name, public) VALUES ('data-files', 'data-files', true)
ON CONFLICT (id) DO NOTHING;