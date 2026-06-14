import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { buildAuthCallbackUrl } from '@/lib/authRedirect';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAnonymous: boolean;
  signUp: (
    email: string,
    password: string,
    redirectPath?: string
  ) => Promise<{ error: AuthError | null; signedIn: boolean; requiresEmailVerification: boolean }>;
  resendSignupVerification: (email: string, redirectPath?: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithMagicLink: (email: string, redirectPath?: string) => Promise<{ error: AuthError | null }>;
  signInAnonymously: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ensureUserProfile = async (currentSession: Session | null) => {
  if (!currentSession?.user || currentSession.user.is_anonymous) return;

  const { error } = await supabase
    .from('profiles')
    .upsert(
      {
        user_id: currentSession.user.id,
        email: currentSession.user.email ?? 'unknown@example.invalid',
      },
      { onConflict: 'user_id' }
    );

  if (error) {
    console.warn('Unable to prepare user profile after sign-in.', error.message);
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const isAnonymous = user?.is_anonymous ?? false;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      void ensureUserProfile(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        void ensureUserProfile(session);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, redirectPath?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: buildAuthCallbackUrl(redirectPath),
      },
    });
    if (data.session) await ensureUserProfile(data.session);
    return {
      error,
      signedIn: Boolean(data.session),
      requiresEmailVerification: Boolean(data.user && !data.session),
    };
  };

  const resendSignupVerification = async (email: string, redirectPath?: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: buildAuthCallbackUrl(redirectPath),
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) await ensureUserProfile(data.session);
    return { error };
  };

  const signInWithMagicLink = async (email: string, redirectPath?: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: buildAuthCallbackUrl(redirectPath),
        shouldCreateUser: true,
      },
    });
    return { error };
  };

  const signInAnonymously = async () => {
    const { error } = await supabase.auth.signInAnonymously();
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: buildAuthCallbackUrl('/auth/reset-password'),
    });
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAnonymous,
        signUp,
        resendSignupVerification,
        signIn,
        signInWithMagicLink,
        signInAnonymously,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
