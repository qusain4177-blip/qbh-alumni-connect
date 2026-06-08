import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Support — QBH Alumni" }, { name: "description", content: "Get technical support or contact the alumni office." }] }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(2000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) { toast.error(r.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.from("support_tickets").insert(r.data);
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Message sent. We'll be in touch shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto grid gap-12 px-4 py-24 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Support</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-navy lg:text-6xl">Talk to a person.</h1>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Trouble signing in, a profile to correct, or a batch that needs adding — write to the alumni office. We reply within two working days.
            </p>
            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-navy text-white"><Mail className="h-4 w-4" strokeWidth={1.75} /></div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground">alumni@qbh.school</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-navy text-white"><MessageSquare className="h-4 w-4" strokeWidth={1.75} /></div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Response</p>
                  <p className="text-sm text-foreground">Within 1–2 working days</p>
                </div>
              </div>
            </div>
          </div>


          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
            </div>
            <div className="mt-4 space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
            </div>
            <Button type="submit" disabled={loading} className="mt-6 w-full bg-navy text-navy-foreground hover:opacity-90">
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </section>

        <section className="border-t border-border bg-secondary/30">
          <div className="container mx-auto grid gap-12 px-4 py-20 lg:grid-cols-2 lg:px-8">
            <div className="space-y-8">
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Locations</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy lg:text-4xl">Visit us in Karachi.</h2>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-navy text-white"><MapPin className="h-4 w-4" strokeWidth={1.75} /></div>
                  <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Head Office</p>
                    <p className="mt-1 text-sm text-foreground">Ghazi Dawood Brohi Goth, Karachi, Karachi City, Sindh, Pakistan</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-navy text-white"><MapPin className="h-4 w-4" strokeWidth={1.75} /></div>
                  <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Branch Office</p>
                    <p className="mt-1 text-sm text-foreground">8/639 Hasnain Co-operative Housing Society, Malir City, Karachi</p>
                    <a
                      href="https://maps.google.com/maps?ll=24.881576,67.19435&z=16&t=m&hl=en&gl=US&mapclient=embed&cid=9729416497845381521"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-navy transition-all duration-300 hover:bg-navy hover:text-navy-foreground"
                    >
                      View on Google Maps <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <iframe
                title="Branch Office — Malir City, Karachi"
                src="https://maps.google.com/maps?ll=24.881576,67.19435&z=16&t=m&hl=en&gl=US&mapclient=embed&cid=9729416497845381521&output=embed"
                className="h-full min-h-[360px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
