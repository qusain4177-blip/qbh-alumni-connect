import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Join Alumni Network — QBH" }, { name: "description", content: "Create your alumni account." }] }),
  component: SignupPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(8, "Minimum 8 characters").max(100),
  graduation_year: z.coerce.number().int().min(1950).max(new Date().getFullYear()),
});

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", graduation_year: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) { toast.error(r.error.issues[0].message); return; }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: r.data.email,
      password: r.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: r.data.full_name },
      },
    });
    if (error) { setLoading(false); toast.error(error.message); return; }
    // Update graduation year on profile
    if (data.user) {
      await supabase.from("profiles").update({ graduation_year: r.data.graduation_year }).eq("id", data.user.id);
    }
    setLoading(false);
    toast.success("Account created! Welcome to the network.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Become a Member</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-navy">Join the network</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your account will be reviewed by the alumni office.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="full_name">Full name</Label>
              <Input id="full_name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="grad">Class of</Label>
                <Input id="grad" type="number" min={1950} max={new Date().getFullYear()} placeholder="2015" value={form.graduation_year} onChange={(e) => setForm({ ...form, graduation_year: e.target.value })} required />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-navy hover:opacity-95">
              {loading ? "Creating account..." : "Create my account"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already a member?{" "}
            <Link to="/login" className="font-medium text-navy hover:text-gold">Sign in</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
