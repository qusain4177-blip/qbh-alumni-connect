import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Edit Profile — QBH Alumni" }] }),
  component: ProfileEdit,
});

function ProfileEdit() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => { if (!loading && !user) navigate({ to: "/login" }); }, [loading, user, navigate]);

  const { data, isLoading } = useQuery({
    enabled: !!user,
    queryKey: ["profile-edit", user?.id],
    queryFn: async () => (await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle()).data,
  });

  useEffect(() => { if (data) setForm(data); }, [data]);

  if (loading || isLoading || !user) {
    return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading...</div>;
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const linkedin = (form.linkedin_url ?? "").trim();
    if (linkedin && !/^https:\/\/(www\.)?linkedin\.com\/.+/i.test(linkedin)) {
      return toast.error("LinkedIn URL must start with https://linkedin.com/ or https://www.linkedin.com/");
    }
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      full_name: form.full_name,
      avatar_url: form.avatar_url || null,
      graduation_year: form.graduation_year ? Number(form.graduation_year) : null,
      matric_stream: form.matric_stream || null,
      roll_number: form.roll_number || null,
      profession: form.profession || null,
      company: form.company || null,
      higher_education: form.higher_education || null,
      city: form.city || null,
      country: form.country || null,
      phone: form.phone || null,
      linkedin_url: form.linkedin_url || null,
      website_url: form.website_url || null,
      bio: form.bio || null,
    } as any).eq("id", user.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Profile updated");
    navigate({ to: "/dashboard" });
  };

  const f = (k: string) => ({ value: form[k] ?? "", onChange: (e: any) => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto max-w-3xl flex-1 px-4 py-12 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Account</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy">Edit your profile</h1>
        <p className="mt-2 text-muted-foreground">Keep your alumni record current so classmates can find you.</p>

        <form onSubmit={save} className="mt-10 space-y-6 rounded-2xl border border-border bg-card p-8 shadow-card">
          <Section title="Identity">
            <Field label="Full name"><Input {...f("full_name")} required /></Field>
            <Field label="Profile photo URL"><Input placeholder="https://..." {...f("avatar_url")} /></Field>
          </Section>

          <Section title="Matric Record">
            <Field label="Matric Passing Year"><Input type="number" min={1950} max={new Date().getFullYear()} placeholder="e.g. 2018" {...f("graduation_year")} /></Field>
            <Field label="Matric Stream / Group">
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.matric_stream ?? ""} onChange={(e) => setForm({ ...form, matric_stream: e.target.value })}>
                <option value="">Select stream</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Biology">Biology</option>
                <option value="Arts/Commerce">Arts/Commerce</option>
              </select>
            </Field>
            <Field label="Roll Number (optional)"><Input placeholder="For verification" {...f("roll_number")} /></Field>
            <Field label="Higher Education"><Input placeholder="Intermediate, Bachelors, Masters..." {...f("higher_education")} /></Field>
          </Section>

          <Section title="Career">
            <Field label="Profession / Role"><Input {...f("profession")} /></Field>
            <Field label="Company"><Input {...f("company")} /></Field>
          </Section>

          <Section title="Contact & Location">
            <Field label="Phone"><Input {...f("phone")} /></Field>
            <Field label="City"><Input {...f("city")} /></Field>
            <Field label="Country"><Input {...f("country")} /></Field>
            <Field label="LinkedIn Profile URL"><Input type="url" placeholder="https://www.linkedin.com/in/yourprofile" pattern="https://(www\.)?linkedin\.com/.*" {...f("linkedin_url")} /></Field>
            <Field label="Personal website"><Input placeholder="https://..." {...f("website_url")} /></Field>
          </Section>

          <div className="space-y-1.5">
            <Label>Short bio</Label>
            <Textarea rows={4} placeholder="A line or two about yourself..." {...f("bio")} />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate({ to: "/dashboard" })}>Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-navy text-navy-foreground hover:opacity-90">
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm uppercase tracking-wider text-gold">{title}</h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
}
