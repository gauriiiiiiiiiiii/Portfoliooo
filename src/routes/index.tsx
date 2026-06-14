import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  profile,
  projects,
  experience,
  education,
  flatSkills,
  skills,
} from "@/data/profile";
import { Terminal } from "@/components/Terminal";
import { SkillsBubbles } from "@/components/SkillsBubbles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Portfolio` },
      {
        name: "description",
        content:
          "Portfolio of Gauri Agarwal — aspiring software developer and final-year CS student at NIT Delhi. Projects, experience, and a hidden terminal mode.",
      },
      { property: "og:title", content: "Gauri Agarwal — Aspiring Software Developer" },
      {
        property: "og:description",
        content: "I build things that matter — thoughtful. scalable. real. Try the hidden terminal mode.",
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

const NAV_SECTIONS = [
  { id: "experience", label: "Education" },
  { id: "work-experience", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "stack", label: "Skills" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

function Index() {
  const [termOpen, setTermOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [underline, setUnderline] = useState<{ left: number; width: number } | null>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [eduVisible, setEduVisible] = useState(false);
  const [workVisible, setWorkVisible] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const eduRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

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

  // Track active section on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollPct(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);

      const nearBottom = scrollY + window.innerHeight >= document.body.scrollHeight - 80;
      if (nearBottom) {
        setActiveSection("contact");
        return;
      }
      const mid = scrollY + window.innerHeight * 0.4;
      let current = "";
      for (const { id } of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + scrollY <= mid) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slide underline to active link
  useEffect(() => {
    if (!activeSection) { setUnderline(null); return; }
    const linkEl = linkRefs.current[activeSection];
    const navEl = navRef.current;
    if (!linkEl || !navEl) return;
    const navRect = navEl.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    setUnderline({ left: linkRect.left - navRect.left, width: linkRect.width });
  }, [activeSection]);

  // Trigger timeline + chart animations when sections enter view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === eduRef.current) setEduVisible(true);
          if (entry.target === workRef.current) setWorkVisible(true);
          if (entry.target === chartRef.current) setChartVisible(true);
        });
      },
      { threshold: 0.1 },
    );
    if (eduRef.current) observer.observe(eduRef.current);
    if (workRef.current) observer.observe(workRef.current);
    if (chartRef.current) observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* Top nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-mono-ui text-sm tracking-tight">
            <span className="text-muted-foreground">~/</span>gauri.dev
          </a>
          <nav ref={navRef} className="relative hidden gap-7 text-sm text-muted-foreground sm:flex">
            {underline && (
              <span
                className="pointer-events-none absolute -bottom-[17px] h-0.5 bg-accent"
                style={{
                  left: underline.left,
                  width: underline.width,
                  transition: "left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            )}
            {NAV_SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                ref={(el) => { linkRefs.current[id] = el; }}
                className={`transition-colors ${activeSection === id ? "text-foreground" : "hover:text-foreground"}`}
              >
                {label}
              </a>
            ))}
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
            final-year CS student · open to opportunities · {profile.location}
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

      {/* Education */}
      <section
        id="experience"
        className="border-t border-border/60 bg-secondary/30"
      >
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="mb-12 text-3xl font-medium tracking-tight sm:text-4xl">
            <span className="font-display italic">Education</span>
          </h2>
          <div className="relative" ref={eduRef}>
            <div className={`timeline-line${eduVisible ? " visible" : ""}`} />
            <ol className="relative space-y-8 pl-6">
              {education.map((e, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-foreground" />
                  <p className="font-mono-ui text-xs text-muted-foreground">{e.period}</p>
                  <p className="mt-1 text-lg font-medium">{e.degree}</p>
                  <p className="text-sm text-muted-foreground">{e.school}</p>
                  {e.details.length > 0 && (
                    <div className="mt-1 space-y-0.5">
                      {e.details.map((d, j) => (
                        <p key={j} className="text-sm text-muted-foreground">{d}</p>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section
        id="work-experience"
        className="border-t border-border/60"
      >
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="mb-12 text-3xl font-medium tracking-tight sm:text-4xl">
            Work <span className="font-display italic">Experience</span>
          </h2>
          <div className="relative" ref={workRef}>
            <div className={`timeline-line${workVisible ? " visible" : ""}`} />
            <ol className="relative space-y-10 pl-6">
              {experience.map((e, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-accent" />
                  <p className="font-mono-ui text-xs text-muted-foreground">{e.period}</p>
                  <p className="mt-1 text-lg font-medium">{e.role}</p>
                  <p className="text-sm text-muted-foreground">{e.company} · {e.location}</p>
                  <ul className="mt-3 space-y-1.5">
                    {e.points.map((point, j) => (
                      <li key={j} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 text-accent shrink-0">▸</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Work / Projects */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-12">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Project <span className="font-display italic">work</span>
          </h2>
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
          <div className="mb-8">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              The <span className="font-display italic">stack</span>
            </h2>
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

      {/* GitHub */}
      <section id="github" className="border-t border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="mb-10 text-3xl font-medium tracking-tight sm:text-4xl">
            Open <span className="font-display italic">source</span>
          </h2>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-mono-ui text-sm hover:text-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                @gauriiiiiiiiiiii
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono-ui text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                View profile ↗
              </a>
            </div>
            <div className="overflow-x-auto rounded-xl bg-background border border-border p-4" ref={chartRef}>
              <img
                src="https://ghchart.rshah.org/72a36e/gauriiiiiiiiiiii"
                alt="Gauri's GitHub contribution chart"
                className={`w-full min-w-[640px] h-auto${chartVisible ? " chart-reveal" : " opacity-0"}`}
                loading="lazy"
              />
            </div>
            <div className="mt-5 flex items-center gap-3 font-mono-ui text-sm text-muted-foreground">
              <span className="flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <span
                    key={i}
                    className="inline-block h-3 rounded-sm"
                    style={{
                      width: "10px",
                      opacity: 0.2 + i * 0.12,
                      background: "oklch(0.72 0.18 145)",
                    }}
                  />
                ))}
              </span>
              <span>366+ contributions in the last year · always shipping</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="ml-auto hover:text-accent transition-colors shrink-0"
              >
                see more ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-6 py-40">
        <h2 className="text-4xl font-medium tracking-tight sm:text-6xl">
          Let's build <span className="font-display italic">something</span>.
        </h2>
        <p className="mt-6 max-w-lg text-muted-foreground">
          Open to internships and new-grad opportunities. The fastest way to reach me is email — or
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
