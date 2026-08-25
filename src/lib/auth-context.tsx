import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Role = "admin" | "alumni";

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  roles: Role[];
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | undefined;
    try {
      const { data } = supabase.auth.onAuthStateChange((_e, s) => {
        setSession(s);
        if (s?.user) {
          setTimeout(async () => {
            try {
              const { data } = await supabase.from("user_roles").select("role").eq("user_id", s.user.id);
              setRoles((data ?? []).map((r) => r.role as Role));
            } catch (err) {
              console.error("[Auth] Failed to fetch roles:", err);
            }
          }, 0);
        } else {
          setRoles([]);
        }
      });
      subscription = data.subscription;

      supabase.auth.getSession().then(async ({ data: { session: s } }) => {
        setSession(s);
        if (s?.user) {
          try {
            const { data } = await supabase.from("user_roles").select("role").eq("user_id", s.user.id);
            setRoles((data ?? []).map((r) => r.role as Role));
          } catch (err) {
            console.error("[Auth] Failed to fetch roles:", err);
          }
        }
        setLoading(false);
      }).catch((err) => {
        console.error("[Auth] Failed to get session:", err);
        setLoading(false);
      });
    } catch (err) {
      console.error("[Auth] Supabase initialization failed:", err);
      setLoading(false);
    }

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        roles,
        isAdmin: roles.includes("admin"),
        loading,
        signOut: async () => { await supabase.auth.signOut(); },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
