import { useEffect, useMemo, useRef, useState } from "react";
import { skills } from "@/data/profile";

const ICON_SLUGS: Record<string, string | null> = {
  Python: "python",
  "C/C++": "cplusplus",
  TypeScript: "typescript",
  JavaScript: "javascript",
  SQL: null,
  HTML: "html5",
  CSS: "css",
  "React.js": "react",
  "Next.js": "nextdotjs",
  "Node.js": "nodedotjs",
  "Express.js": "express",
  Flutter: "flutter",
  "REST APIs": null,
  MySQL: "mysql",
  MongoDB: "mongodb",
  Supabase: "supabase",
  Firebase: "firebase",
  Vercel: "vercel",
  Render: "render",
  PyTorch: "pytorch",
  "Scikit-Learn": "scikitlearn",
  Transformers: "huggingface",
  LLMs: null,
  NLP: null,
  "Computer Vision": "opencv",
  Docker: "docker",
  Git: "git",
  GitHub: "github",
  Linux: "linux",
};

const ICON_COLORS: Record<string, string> = {
  express: "000000",
  nextdotjs: "000000",
  vercel: "000000",
  github: "181717",
  linux: "000000",
  opencv: "5C3EE8",
};

// Custom inline SVG icons for concepts with no brand logo
const CUSTOM_ICONS: Record<string, React.ReactElement> = {
  SQL: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  "REST APIs": (
    <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8l-3 3 3 3" />
      <path d="M2 11h14" />
      <path d="M19 16l3-3-3-3" />
      <path d="M8 13h14" />
    </svg>
  ),
  NLP: (
    <svg viewBox="0 0 24 24" fill="#64748b">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9H7V9h6v2zm4-4H7V5h10v2z" />
    </svg>
  ),
  LLMs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="3.5" r="1.5" />
      <circle cx="12" cy="20.5" r="1.5" />
      <circle cx="3.5" cy="12" r="1.5" />
      <circle cx="20.5" cy="12" r="1.5" />
      <circle cx="6.1" cy="6.1" r="1.5" />
      <circle cx="17.9" cy="6.1" r="1.5" />
      <circle cx="6.1" cy="17.9" r="1.5" />
      <circle cx="17.9" cy="17.9" r="1.5" />
      <line x1="12" y1="5" x2="12" y2="9.5" />
      <line x1="12" y1="14.5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="9.5" y2="12" />
      <line x1="14.5" y1="12" x2="19" y2="12" />
      <line x1="7" y1="7" x2="10.2" y2="10.2" />
      <line x1="13.8" y1="10.2" x2="17" y2="7" />
      <line x1="7" y1="17" x2="10.2" y2="13.8" />
      <line x1="13.8" y1="13.8" x2="17" y2="17" />
    </svg>
  ),
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

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const init = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      const n = allSkills.length;
      const cols = Math.ceil(Math.sqrt(n * (W / H)));
      const rows = Math.ceil(n / cols);
      const cellW = W / cols;
      const cellH = H / rows;

      bubblesRef.current = allSkills.map((s, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const hasVisual = !!s.slug || !!CUSTOM_ICONS[s.name];
        const size = hasVisual ? 60 + Math.random() * 16 : 68 + s.name.length * 4;
        const cx = col * cellW + cellW / 2;
        const cy = row * cellH + cellH / 2;
        return {
          name: s.name,
          slug: s.slug,
          size,
          x: Math.max(0, Math.min(W - size, cx - size / 2 + (Math.random() - 0.5) * cellW * 0.4)),
          y: Math.max(0, Math.min(H - size, cy - size / 2 + (Math.random() - 0.5) * cellH * 0.4)),
          vx: (Math.random() - 0.5) * 1.0,
          vy: (Math.random() - 0.5) * 1.0,
        };
      });
      force((n) => n + 1);
    };
    init();

    let raf = 0;
    const MAX_SPEED = 1.5;
    const tick = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      const bs = bubblesRef.current;

      // Phase 1: Move + wall bounce
      for (let i = 0; i < bs.length; i++) {
        const b = bs[i];
        b.x += b.vx;
        b.y += b.vy;
        if (b.x <= 0) { b.x = 0; b.vx = Math.abs(b.vx); }
        if (b.y <= 0) { b.y = 0; b.vy = Math.abs(b.vy); }
        if (b.x + b.size >= W) { b.x = W - b.size; b.vx = -Math.abs(b.vx); }
        if (b.y + b.size >= H) { b.y = H - b.size; b.vy = -Math.abs(b.vy); }
      }

      // Phase 2: Pairwise collision repulsion
      for (let i = 0; i < bs.length; i++) {
        for (let j = i + 1; j < bs.length; j++) {
          const a = bs[i];
          const b = bs[j];
          const r1 = a.size / 2;
          const r2 = b.size / 2;
          const dx = (b.x + r2) - (a.x + r1);
          const dy = (b.y + r2) - (a.y + r1);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = r1 + r2 + 2;
          if (dist < minDist && dist > 0) {
            const push = ((minDist - dist) / minDist) * 0.4;
            const nx = dx / dist;
            const ny = dy / dist;
            a.vx -= nx * push;
            a.vy -= ny * push;
            b.vx += nx * push;
            b.vy += ny * push;
            const sa = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
            const sb = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
            if (sa > MAX_SPEED) { a.vx = (a.vx / sa) * MAX_SPEED; a.vy = (a.vy / sa) * MAX_SPEED; }
            if (sb > MAX_SPEED) { b.vx = (b.vx / sb) * MAX_SPEED; b.vy = (b.vy / sb) * MAX_SPEED; }
          }
        }
      }

      // Phase 3: Update DOM
      for (let i = 0; i < bs.length; i++) {
        const node = nodesRef.current[i];
        if (node) node.style.transform = `translate3d(${bs[i].x}px, ${bs[i].y}px, 0)`;
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
      style={{ height: "min(80vh, 680px)" }}
      aria-label="Floating skills"
    >
      {bubblesRef.current.map((b, i) => {
        const customIcon = CUSTOM_ICONS[b.name];
        const iconUrl = b.slug
          ? `https://cdn.simpleicons.org/${b.slug}${ICON_COLORS[b.slug] ? `/${ICON_COLORS[b.slug]}` : ""}`
          : null;
        const iconSize = b.size * 0.48;

        return (
          <div
            key={b.name}
            ref={(el) => { nodesRef.current[i] = el; }}
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
            ) : customIcon ? (
              <span className="pointer-events-none" style={{ width: iconSize, height: iconSize, display: "flex" }}>
                {customIcon}
              </span>
            ) : iconUrl ? (
              <img
                src={iconUrl}
                alt={b.name}
                className="pointer-events-none"
                style={{ width: iconSize, height: iconSize }}
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
