import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";
import type { Profile, UserRole } from "@/shared/types/database";

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  role: UserRole | null;
  loading: boolean;
  sendOtp: (email: string) => Promise<{ error: Error | null }>;
  verifyOtp: (email: string, token: string, rememberMe: boolean) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchingRef = useRef(false);
  const lastUserIdRef = useRef<string | null>(null);

  const fetchProfile = async (userId: string) => {
    // Prevent duplicate concurrent fetches for the same user
    if (fetchingRef.current && lastUserIdRef.current === userId) return;
    fetchingRef.current = true;
    lastUserIdRef.current = userId;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code === "PGRST116") {
        const { data: newProfile, error: insertErr } = await supabase
          .from("profiles")
          .insert({ id: userId, role: "student" as UserRole })
          .select()
          .single();
        if (insertErr) console.error("Profile create error:", insertErr);
        setProfile(newProfile);
      } else if (error) {
        console.error("Profile fetch error:", error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error("Profile fetch failed:", err);
      setProfile(null);
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) {
        fetchProfile(s.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, s) => {
        setSession(s);
        if (s?.user) {
          // Only re-fetch if user changed
          if (s.user.id !== lastUserIdRef.current || !profile) {
            fetchProfile(s.user.id);
          }
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const sendOtp = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const verifyOtp = async (email: string, token: string, rememberMe: boolean) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (!error) {
      localStorage.setItem("zento_remember_me", rememberMe ? "true" : "false");
    }
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    lastUserIdRef.current = null;
    localStorage.removeItem("zento_remember_me");
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        role: profile?.role ?? null,
        loading,
        sendOtp,
        verifyOtp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
