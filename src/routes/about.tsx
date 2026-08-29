import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, HeartHandshake, Target } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Qamar E Bani Hashim School Alumni" }, { name: "description", content: "The history, mission, and heritage of Qamar E Bani Hashim School Alumni." }] }),
  component: About,
});

function About() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-navy py-28 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">About</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold tracking-tight lg:text-7xl">A school, and the people who left it.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Qamar E Bani Hashim School Alumni has been graduating Matric students since 1986. This page is the short version of what we stand for, and why the alumni network exists.
            </p>
          </div>
        </section>

        <section className="container mx-auto grid gap-14 px-4 py-28 lg:grid-cols-3 lg:px-8">
          {[
            { icon: BookOpen, title: "What the school does", body: "We prepare students for the Matric board exams, and for the decisions that follow them. Discipline, daily reading, and a teacher who knows your name." },
            { icon: HeartHandshake, title: "Why alumni stay involved", body: "Old students return to teach, to fund scholarships, and to hire from the new batches. The network makes that easier than a group chat." },
            { icon: Target, title: "What we are building", body: "A working directory, a real events calendar, and a job board that stays useful. No pageantry — just the practical parts of staying in touch." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <div className="grid h-12 w-12 place-items-center rounded-md bg-navy text-white">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-navy">{title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </section>

        <section className="bg-secondary/50 py-28">
          <div className="container mx-auto max-w-3xl px-4 text-center lg:px-8">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Mission</p>
            <p className="mt-6 font-display text-2xl leading-snug tracking-tight text-navy lg:text-4xl">
              Keep the bonds intact. Make the door easy to find for whoever wants to come back.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
