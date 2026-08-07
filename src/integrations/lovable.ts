import { supabase } from '@/lib/supabase';

export const lovable = {
  auth: {
    signInWithOAuth: async (
      provider: 'google',
      options?: { redirect_uri?: string }
    ) => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: options?.redirect_uri || `${window.location.origin}/auth/callback`,
        },
      });
      
      return {
        redirected: !!data.url, // If Supabase returns a URL, user is being redirected
        error,
      };
    },
  },
};
