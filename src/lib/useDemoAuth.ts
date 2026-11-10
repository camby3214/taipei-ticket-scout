import { useCallback, useEffect, useState } from "react";

// Temporary front-end-only session so the app shell can be previewed.
// Replace with real sign-in once the auth backend is connected.
const KEY = "fpn-demo-session";
type Session = { email: string };

export function readDemoSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function useDemoAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readDemoSession());
    setReady(true);
  }, []);

  const signIn = useCallback((email: string) => {
    const s = { email };
    window.localStorage.setItem(KEY, JSON.stringify(s));
    setSession(s);
  }, []);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(KEY);
    setSession(null);
  }, []);

  return { session, ready, signIn, signOut };
}
