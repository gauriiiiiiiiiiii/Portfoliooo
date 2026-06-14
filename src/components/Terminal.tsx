import { useEffect, useRef, useState } from "react";
import {
  profile,
  projects,
  experience,
  education,
  skills,
} from "@/data/resume";

type Line = { kind: "in" | "out" | "sys"; text: string };

const HELP = `Available commands:
  about         — who I am
  skills        — tech stack
  experience    — work history
  projects      — selected projects
  education     — schools
  contact       — how to reach me
  socials       — github / linkedin
  clear         — clear screen
  exit          — close terminal

  Try Easter egg commands: sudo, git commit,
  coffee, fix-bugs, recursion, sudo rm -rf `;

function fmtSkills() {
  return Object.entries(skills)
    .map(([k, v]) => `  ${k.padEnd(12)} ${v.join(", ")}`)
    .join("\n");
}
function fmtExp() {
  return experience
    .map(
      (e) =>
        `  ${e.role} @ ${e.company}\n    ${e.period} · ${e.location}\n` +
        e.points.map((p) => `    - ${p}`).join("\n"),
    )
    .join("\n\n");
}
function fmtProjects() {
  return projects
    .map((p) => `  ▸ ${p.name} — ${p.blurb}\n      [${p.stack.join(", ")}]`)
    .join("\n\n");
}
function fmtEdu() {
  return education
    .map((e) => `  ${e.degree}\n    ${e.school} · ${e.period} · ${e.detail}`)
    .join("\n\n");
}

const COMMANDS: Record<string, () => string> = {
  help: () => HELP,
  about: () =>
    `${profile.name} — ${profile.role}\n${profile.location}\n\n${profile.tagline}`,
  skills: fmtSkills,
  experience: fmtExp,
  exp: fmtExp,
  projects: fmtProjects,
  education: fmtEdu,
  contact: () =>
    `  email     ${profile.email}\n  location  ${profile.location}`,
  socials: () =>
    `  github    ${profile.github}\n  linkedin  ${profile.linkedin}`,
  whoami: () => "guest@nancy.dev",
  ls: () => "about  skills  experience  projects  education  contact  socials",
  pwd: () => "/home/nancy/portfolio",
  date: () => new Date().toString(),
  echo: () => "",

  // Easter eggs
  sudo: () =>
    "Permission denied. Nice try, but you don't have root privileges on my portfolio! 😉",
  "sudo rm -rf /": () =>
    "⚠️  CRITICAL ERROR: Attempting to delete the portfolio core...\nWait, I'm an AI-enhanced application. I cannot let you do that, Dave.\n(Plus, I already checked my inputs with Zod.)",
  recursion: () =>
    "Did you mean: 'recursion'?\n(Type 'recursion' to find out...)",
  "git commit": () =>
    'Error: Cannot commit.\nReason: Your staging area contains 47 console.log statements\nand a comment that says "// I will fix this tomorrow."',
  coffee: () =>
    "☕  Error: 418 I'm a teapot.\nPlease insert coffee token to convert caffeine into clean TypeScript code.",
  caffeine: () =>
    "☕  Error: 418 I'm a teapot.\nPlease insert coffee token to convert caffeine into clean TypeScript code.",
  "fix-bugs": () => "🐛  0 bugs found! (Because it works on my local machine.)",
  vim: () => "Trapped in vim? :q to escape. Welcome to the club.",
  hello: () => "hi there 👋",
  hi: () => "hello, fellow human (or bot, no judgement).",
};

const BANNER = `  _   _                       _  __     _             _      
 | \\ | | __ _ _ __   ___ _   _| |/ /__ _| |_ __ _ _ __(_) __ _ 
 |  \\| |/ _\` | '_ \\ / __| | | | ' // _\` | __/ _\` | '__| |/ _\` |
 | |\\  | (_| | | | | (__| |_| | . \\ (_| | || (_| | |  | | (_| |
 |_| \\_|\\__,_|_| |_|\\___|\\__, |_|\\_\\__,_|\\__\\__,_|_|  |_|\\__,_|
                         |___/                                  
`;

export function Terminal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [lines, setLines] = useState<Line[]>([
    { kind: "sys", text: BANNER },
    { kind: "sys", text: "Last login: just now on ttys000" },
    { kind: "sys", text: "Type 'help' to get started.\n" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function run(raw: string) {
    const cmd = raw.trim();
    const next: Line[] = [...lines, { kind: "in", text: cmd }];
    if (!cmd) return setLines(next);

    if (cmd === "clear" || cmd === "cls") {
      setLines([]);
      return;
    }
    if (cmd === "exit" || cmd === "quit") {
      setLines(next);
      onClose();
      return;
    }

    const lower = cmd.toLowerCase();
    let out: string | undefined;
    if (COMMANDS[lower]) out = COMMANDS[lower]();
    else if (lower.startsWith("echo ")) out = cmd.slice(5);
    else if (lower.startsWith("sudo ")) out = COMMANDS["sudo"]();
    else out = `command not found: ${cmd}\nType 'help' for available commands.`;

    setLines([...next, { kind: "out", text: out }]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    run(input);
    if (input.trim()) setHistory((h) => [input, ...h]);
    setInput("");
    setHIdx(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(hIdx + 1, history.length - 1);
      if (history[n] !== undefined) {
        setHIdx(n);
        setInput(history[n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = Math.max(hIdx - 1, -1);
      setHIdx(n);
      setInput(n === -1 ? "" : history[n]);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm rise"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
        style={{ backgroundColor: "var(--terminal-bg)" }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-3 py-2.5">
          <button
            aria-label="Close"
            onClick={onClose}
            className="h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-110"
          />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="flex-1 text-center font-mono-ui text-xs text-white/60">
            nancy — -zsh — 80×24
          </div>
          <div className="w-12" />
        </div>

        {/* Body */}
        <div
          ref={scrollRef}
          className="term-scroll h-[60vh] max-h-[520px] overflow-y-auto px-4 py-3 font-mono-ui text-[13px] leading-relaxed"
          style={{ color: "var(--terminal-fg)" }}
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l, i) => (
            <pre
              key={i}
              className="whitespace-pre-wrap break-words"
              style={{
                color:
                  l.kind === "sys"
                    ? "var(--terminal-dim)"
                    : l.kind === "in"
                      ? "var(--terminal-fg)"
                      : "var(--terminal-fg)",
              }}
            >
              {l.kind === "in" ? (
                <>
                  <span style={{ color: "var(--terminal-prompt)" }}>
                    nancy@portfolio
                  </span>
                  <span style={{ color: "var(--terminal-dim)" }}> ~ </span>
                  <span style={{ color: "var(--terminal-accent)" }}>$ </span>
                  {l.text}
                </>
              ) : (
                l.text
              )}
            </pre>
          ))}

          <form onSubmit={onSubmit} className="flex items-center">
            <span style={{ color: "var(--terminal-prompt)" }}>
              nancy@portfolio
            </span>
            <span style={{ color: "var(--terminal-dim)" }}>&nbsp;~&nbsp;</span>
            <span style={{ color: "var(--terminal-accent)" }}>$&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent font-mono-ui text-[13px] outline-none"
              style={{
                color: "var(--terminal-fg)",
                caretColor: "var(--terminal-accent)",
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
