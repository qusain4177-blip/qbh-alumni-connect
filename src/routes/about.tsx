import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, HeartHandshake, Target } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Qamar E Bani Hashim" }, { name: "description", content: "The history, mission, and heritage of Qamar E Bani Hashim School." }] }),
  component: About,
});

function About() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-24 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Our Heritage</p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold lg:text-6xl">About Qamar E Bani Hashim</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              A school built on faith, scholarship, and service — and the alumni community that carries its legacy forward.
            </p>
          </div>
        </section>

        <section className="container mx-auto grid gap-14 px-4 py-24 lg:grid-cols-3 lg:px-8">
          {[
            { icon: BookOpen, title: "Tradition of Excellence", body: "For decades, our school has cultivated a culture of rigorous learning and moral grounding. Every graduate carries that standard into the world." },
            { icon: HeartHandshake, title: "A Living Community", body: "The alumni network turns memories into momentum — connecting classmates, championing mentorship, and supporting today's students." },
            { icon: Target, title: "Looking Forward", body: "Through scholarships, events, and chapters around the world, we invest in the future of Qamar E Bani Hashim and its people." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <div className="grid h-12 w-12 place-items-center rounded-md bg-navy text-gold">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-navy">{title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </section>

        <section className="bg-secondary/50 py-24">
          <div className="container mx-auto max-w-3xl px-4 text-center lg:px-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Mission Statement</p>
            <p className="mt-6 font-display text-2xl leading-relaxed text-navy lg:text-3xl">
              "To preserve the bonds of our school community, to honor those who came before, and to open every possible door for those who will follow."
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
