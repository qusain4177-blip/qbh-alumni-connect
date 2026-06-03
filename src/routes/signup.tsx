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
  head: () => ({ meta: [{ title: "Join Alumni Network — QBH" }, { name: "description", content: "Create your Matric alumni account." }] }),
  component: SignupPage,
});

const STREAMS = ["Computer Science", "Biology", "Arts/Commerce"] as const;

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(8, "Minimum 8 characters").max(100),
  graduation_year: z.coerce.number().int().min(1950).max(new Date().getFullYear()),
  matric_stream: z.enum(STREAMS, { message: "Select your Matric stream" }),
  roll_number: z.string().trim().max(50).optional().or(z.literal("")),
});

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", graduation_year: "", matric_stream: "", roll_number: "" });
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
    if (data.user) {
      await supabase.from("profiles").update({
        graduation_year: r.data.graduation_year,
        matric_stream: r.data.matric_stream,
        roll_number: r.data.roll_number || null,
      } as any).eq("id", data.user.id);
    }
    setLoading(false);
    toast.success("Account created! Welcome to the network.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Create account</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy">Join your batch.</h1>
          <p className="mt-2 text-sm text-muted-foreground">Verified by the alumni office, usually within a working day.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="full_name">Full name</Label>
              <Input id="full_name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="grad">Matric Passing Year</Label>
                <Input id="grad" type="number" min={1950} max={new Date().getFullYear()} placeholder="2018" value={form.graduation_year} onChange={(e) => setForm({ ...form, graduation_year: e.target.value })} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="roll">Roll Number <span className="text-muted-foreground">(optional)</span></Label>
                <Input id="roll" placeholder="e.g. 12345" value={form.roll_number} onChange={(e) => setForm({ ...form, roll_number: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="stream">Academic Stream / Group</Label>
              <select
                id="stream"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.matric_stream}
                onChange={(e) => setForm({ ...form, matric_stream: e.target.value })}
                required
              >
                <option value="">Select your stream</option>
                {STREAMS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
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
