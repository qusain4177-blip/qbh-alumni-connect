import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_EMAIL } from "@/lib/admin";

export const Route = createFileRoute("/admin_/login")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — QBH UMBRELLA Alumni" },
      { name: "description", content: "Restricted sign-in for the QBH UMBRELLA Alumni alumni portal administrator." },
      { property: "og:title", content: "Admin Sign In — QBH UMBRELLA Alumni" },
      { property: "og:description", content: "Restricted administrator access to the QBH UMBRELLA Alumni alumni portal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLoginPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "At least 8 characters").max(100),
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (parsed.data.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      toast.error("This account is not authorised to sign in.");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
    if (error || !data.user) {
      setLoading(false);
      toast.error(error?.message ?? "Sign in failed");
      return;
    }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
    const isAdmin = (roles ?? []).some((r) => r.role === "admin");
    setLoading(false);
    if (!isAdmin) {
      await supabase.auth.signOut();
      toast.error("This account does not have administrator access.");
      return;
    }
    toast.success("Signed in as administrator");
    navigate({ to: "/admin" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em]">Restricted access</p>
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy">Administrator sign in.</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Only the designated alumni-office administrator can sign in. Public registration is closed.
          </p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Admin email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-navy text-navy-foreground hover:opacity-90">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
