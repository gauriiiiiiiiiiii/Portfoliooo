import { useEffect, useMemo, useRef, useState } from "react";
import { skills } from "@/data/resume";

// simple-icons slug map (null = no logo, show name)
const ICON_SLUGS: Record<string, string | null> = {
  Python: "python",
  JavaScript: "javascript",
  TypeScript: "typescript",
  SQL: null,
  HTML: "html5",
  CSS: null,
  React: "react",
  "Next.js": "nextdotjs",
  "Node.js": "nodedotjs",
  "Express.js": "express",
  Deno: "deno",
  Langchain: "langchain",
  Pinecone: null,
  PyTorch: "pytorch",
  Pandas: "pandas",
  NumPy: "numpy",
  "Scikit-learn": "scikitlearn",
  Prolog: null,
  MongoDB: "mongodb",
  MySQL: "mysql",
  Supabase: "supabase",
  Prisma: "prisma",
  Git: "git",
  GitHub: "github",
  "Github Actions": "githubactions",
  DevOps: null,
  Postman: "postman",
  Zod: "zod",
  "Tailwind CSS": "tailwindcss",
  PostgreSQL: "postgresql",
  Vitest: "vitest",
};

type Bubble = {
  name: string;
  slug: string | null;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function SkillsBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [, force] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const allSkills = useMemo(() => {
    const list: { name: string; slug: string | null }[] = [];
    Object.values(skills)
      .flat()
      .forEach((s) => {
        list.push({ name: s, slug: ICON_SLUGS[s] ?? null });
      });
    return list;
  }, []);

  // init bubbles after container mounts
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const init = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      bubblesRef.current = allSkills.map((s) => {
        const hasLogo = !!s.slug;
        const size = hasLogo ? 58 + Math.random() * 18 : 70 + s.name.length * 4;
        return {
          name: s.name,
          slug: s.slug,
          size,
          x: Math.random() * Math.max(1, W - size),
          y: Math.random() * Math.max(1, H - size),
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        };
      });
      force((n) => n + 1);
    };
    init();

    let raf = 0;
    const tick = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      const bs = bubblesRef.current;
      for (let i = 0; i < bs.length; i++) {
        const b = bs[i];
        b.x += b.vx;
        b.y += b.vy;
        if (b.x <= 0) {
          b.x = 0;
          b.vx = Math.abs(b.vx);
        }
        if (b.y <= 0) {
          b.y = 0;
          b.vy = Math.abs(b.vy);
        }
        if (b.x + b.size >= W) {
          b.x = W - b.size;
          b.vx = -Math.abs(b.vx);
        }
        if (b.y + b.size >= H) {
          b.y = H - b.size;
          b.vy = -Math.abs(b.vy);
        }
        const node = nodesRef.current[i];
        if (node) {
          node.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [allSkills]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl border border-border bg-secondary/40"
      style={{ height: "min(70vh, 560px)" }}
      aria-label="Floating skills"
    >
      {bubblesRef.current.map((b, i) => {
        const hasLogo = !!b.slug;
        return (
          <div
            key={b.name}
            ref={(el) => {
              nodesRef.current[i] = el;
            }}
            className="absolute left-0 top-0 flex select-none items-center justify-center rounded-full border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            style={{
              width: b.size,
              height: b.size,
              transform: `translate3d(${b.x}px, ${b.y}px, 0)`,
              willChange: "transform",
            }}
            title={b.name}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === i ? (
              <span className="px-2 text-center font-mono-ui text-xs text-foreground">
                {b.name}
              </span>
            ) : hasLogo ? (
              <img
                src={`https://cdn.simpleicons.org/${b.slug}`}
                alt={b.name}
                className="pointer-events-none"
                style={{ width: b.size * 0.5, height: b.size * 0.5 }}
                loading="lazy"
              />
            ) : (
              <span className="px-2 text-center font-mono-ui text-xs text-foreground">
                {b.name}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
