import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  profile,
  projects,
  experience,
  education,
  flatSkills,
  skills,
} from "@/data/resume";
import { Terminal } from "@/components/Terminal";
import { SkillsBubbles } from "@/components/SkillsBubbles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${"Nancy Kataria"} — Software Engineer` },
      {
        name: "description",
        content:
          "Portfolio of Nancy Kataria — full-stack & AI software engineer. Projects, experience, and a hidden terminal mode.",
      },
      { property: "og:title", content: "Nancy Kataria — Software Engineer" },
      {
        property: "og:description",
        content: "Full-stack & AI engineer. Try the hidden terminal mode.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [termOpen, setTermOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTermOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-mono-ui text-sm tracking-tight">
            <span className="text-muted-foreground">~/</span>nancy.dev
          </a>
          <nav className="hidden gap-7 text-sm text-muted-foreground sm:flex">
            <a href="#experience" className="transition hover:text-foreground">
              Experience
            </a>
            <a href="#work" className="transition hover:text-foreground">
              Work
            </a>
            <a href="#stack" className="transition hover:text-foreground">
              Skills
            </a>
            <a href="#contact" className="transition hover:text-foreground">
              Contact
            </a>
          </nav>
          <button
            onClick={() => setTermOpen(true)}
            className="group inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-1.5 font-mono-ui text-xs text-foreground transition hover:border-accent hover:bg-accent/10"
            aria-label="Open terminal"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>terminal</span>
            <kbd className="hidden text-muted-foreground sm:inline">⌘K</kbd>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 sm:pt-32">
          <p className="rise font-mono-ui text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="caret mr-1 inline-block h-2 w-2 rounded-full bg-accent align-middle" />
            actively seeking new-grad roles · {profile.location}
          </p>
          <h1 className="rise mt-6 max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
            Hi, I'm{" "}
            <span className="font-display italic">
              {profile.name.split(" ")[0]}
            </span>
            .
            <br />I build software.
          </h1>
          <p
            className="rise mt-7 max-w-xl text-lg text-muted-foreground"
            style={{ animationDelay: "120ms" }}
          >
            {profile.tagline}
          </p>

          <div
            className="rise mt-10 flex flex-wrap gap-3"
            style={{ animationDelay: "200ms" }}
          >
            <a
              href={`mailto:${profile.email}`}
              className="link-arrow rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition hover:bg-primary/90"
            >
              Get in touch <span aria-hidden>→</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm transition hover:border-foreground"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm transition hover:border-foreground"
            >
              LinkedIn
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm transition hover:border-foreground"
            >
              Resume
            </a>
            <button
              onClick={() => setTermOpen(true)}
              className="rounded-full border border-dashed border-accent/70 px-5 py-2.5 font-mono-ui text-xs text-foreground transition hover:bg-accent/10"
            >
              $ open terminal
            </button>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="border-t border-border/60 bg-secondary/30"
      >
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="mb-12 text-3xl font-medium tracking-tight sm:text-4xl">
            <span className="font-display italic">Experience</span> & education
          </h2>

          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 font-mono-ui text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Work
              </h3>
              <ol className="relative space-y-8 border-l border-border pl-6">
                {experience.map((e, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-accent" />
                    <p className="font-mono-ui text-xs text-muted-foreground">
                      {e.period}
                    </p>
                    <p className="mt-1 text-lg font-medium">{e.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {e.company} · {e.location}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="mb-6 font-mono-ui text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Education
              </h3>
              <ol className="relative space-y-8 border-l border-border pl-6">
                {education.map((e, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-foreground" />
                    <p className="font-mono-ui text-xs text-muted-foreground">
                      {e.period}
                    </p>
                    <p className="mt-1 text-lg font-medium">{e.degree}</p>
                    <p className="text-sm text-muted-foreground">
                      {e.school} · {e.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Work / Projects */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-12 flex items-baseline justify-between">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Project <span className="font-display italic">work</span>
          </h2>
          <span className="font-mono-ui text-xs text-muted-foreground">
            0{projects.length} projects
          </span>
        </div>

        <ul className="divide-y divide-border">
          {projects.map((p, i) => (
            <li key={p.name}>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-12 gap-6 py-8 transition"
              >
                <span className="col-span-12 font-mono-ui text-xs text-muted-foreground sm:col-span-1">
                  0{i + 1}
                </span>
                <div className="col-span-12 sm:col-span-7">
                  <h3 className="text-2xl font-medium tracking-tight transition group-hover:text-accent sm:text-3xl">
                    {p.name}
                    <span className="ml-2 inline-block opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
                      ↗
                    </span>
                  </h3>
                  <p className="mt-2 text-muted-foreground">{p.blurb}</p>
                </div>
                <div className="col-span-12 flex flex-wrap items-start gap-2 sm:col-span-4 sm:justify-end">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-2.5 py-1 font-mono-ui text-[11px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills marquee */}
      <section id="stack" className="border-y border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              The <span className="font-display italic">stack</span>
            </h2>
            <span className="font-mono-ui text-xs text-muted-foreground">
              {Object.values(skills).flat().length} skills
            </span>
          </div>
          <SkillsBubbles />
        </div>
      </section>
      <section
        id="stack"
        className="border-y border-border/60 bg-secondary/40 py-6"
      >
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-mono-ui text-sm text-muted-foreground">
            {[...flatSkills, ...flatSkills].map((s, i) => (
              <span key={i} className="flex items-center gap-10">
                {s}
                <span className="text-accent">/</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-6 py-28">
        <h2 className="text-4xl font-medium tracking-tight sm:text-6xl">
          Let's build <span className="font-display italic">something</span>.
        </h2>
        <p className="mt-6 max-w-lg text-muted-foreground">
          Open to new-grad SWE roles. The fastest way to reach me is email — or
          open the terminal and type{" "}
          <span className="font-mono-ui text-foreground">contact</span>.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="link-arrow rounded-full bg-primary px-6 py-3 text-primary-foreground"
          >
            {profile.email} <span aria-hidden>→</span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-6 py-3 transition hover:border-foreground"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-6 py-3 transition hover:border-foreground"
          >
            GitHub
          </a>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 px-6 py-8 font-mono-ui text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {profile.name}.
          </span>
          <button
            onClick={() => setTermOpen(true)}
            className="hover:text-foreground"
          >
            press ⌘K for terminal →
          </button>
        </div>
      </footer>

      <Terminal open={termOpen} onClose={() => setTermOpen(false)} />
    </div>
  );
}
