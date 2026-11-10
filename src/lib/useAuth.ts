import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

type Session = { email: string };
type AuthResult = { error: string | null; needsConfirmation?: boolean };

// Supabase Auth session, exposed in the same shape the pages already use.
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const toSession = (email: string | undefined) => (email ? { email } : null);

    supabase.auth.getSession().then(({ data }) => {
      setSession(toSession(data.session?.user.email));
      setReady(true);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(toSession(s?.user.email));
      setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, []);

  const signUp = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/app` },
    });
    if (error) return { error: error.message };
    // With "Confirm email" enabled in Supabase, no session is returned until the link is clicked.
    return { error: null, needsConfirmation: !data.session };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { session, ready, signIn, signUp, signOut };
}
