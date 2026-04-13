
-- Create telegram_users table to store Telegram login data
CREATE TABLE public.telegram_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id BIGINT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT,
  username TEXT,
  photo_url TEXT,
  auth_date BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.telegram_users ENABLE ROW LEVEL SECURITY;

-- No direct client access - all writes go through the edge function (service role)
-- Edge function uses service role key to bypass RLS

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_telegram_users_updated_at
  BEFORE UPDATE ON public.telegram_users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
