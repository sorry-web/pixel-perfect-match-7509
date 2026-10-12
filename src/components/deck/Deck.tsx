import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { SLIDES, type SKey } from "./content";
import { Alignment, Challenge, Closing, ElementSlide, Framework, Measurement, Opening, Roadmap } from "./Slides";

const FRAMEWORK = SLIDES.findIndex((s) => s.id === "framework");

export function Deck() {
  const [i, setI] = useState(0);
  const [notes, setNotes] = useState(false);
  const touch = useRef<number | null>(null);
  const n = SLIDES.length;
  const last = i === n - 1;

  useEffect(() => {
    const s = Number(new URLSearchParams(window.location.search).get("slide"));
    if (s >= 1 && s <= n) setI(s - 1);
  }, [n]);

  const go = useCallback((t: number) => setI(Math.max(0, Math.min(n - 1, t))), [n]);
  const next = useCallback(() => setI((v) => (v >= n - 1 ? 0 : v + 1)), [n]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(i + 1));
    window.history.replaceState(null, "", url);
    document.title = `${i + 1}/${n} — ${SLIDES[i]!.title} · St Anthony's`;
  }, [i, n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || (e.key === " " && tag !== "BUTTON")) {
        e.preventDefault();
        if (!last) go(i + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(i - 1);
      } else if (e.key.toLowerCase() === "n") setNotes((v) => !v);
      else if (e.key.toLowerCase() === "f") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, go, last]);

  const s = SLIDES[i]!;
  const openElement = (k: SKey) => go(SLIDES.findIndex((x) => x.element === k));

  let body: React.ReactNode;
  if (s.element) body = <ElementSlide k={s.element} onBack={() => go(FRAMEWORK)} />;
  else
    body = {
      opening: <Opening />,
      challenge: <Challenge />,
      framework: <Framework onSelect={openElement} />,
      alignment: <Alignment />,
      roadmap: <Roadmap />,
      measurement: <Measurement />,
      closing: <Closing />,
    }[s.id];

  return (
    <div
      className="relative flex h-dvh flex-col overflow-hidden bg-background"
      onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0]!.clientX - touch.current;
        if (Math.abs(dx) > 60) go(i + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}
    >
      <header className="flex items-center justify-between px-6 pt-6 sm:px-12">
        <p className="kicker">St Anthony's · McKinsey 7-S</p>
        <p className="kicker hidden sm:block">{s.title}</p>
      </header>

      <main
        key={i}
        className="mx-auto w-full max-w-7xl flex-1 overflow-y-auto px-6 py-8 sm:px-12"
        aria-roledescription="slide"
        aria-label={`${i + 1} of ${n}: ${s.title}`}
      >
        {body}
      </main>

      {notes && (
        <aside className="glass fadein mx-6 mb-3 rounded-md p-4 text-sm leading-relaxed sm:mx-12" aria-label="Speaker notes">
          <p className="kicker mb-1">Notes · {s.title}</p>
          {s.notes}
        </aside>
      )}

      <footer className="flex items-center justify-between gap-4 px-6 pb-6 sm:px-12">
        <p className="text-sm tabular-nums text-muted-foreground" aria-live="polite">
          <span className="font-semibold text-foreground">{String(i + 1).padStart(2, "0")}</span>
          <span className="mx-1.5">/</span>
          {String(n).padStart(2, "0")}
          <span className="ml-4 hidden text-xs md:inline">← → to navigate · N notes · F full screen</span>
        </p>
        <button
          onClick={next}
          className="group inline-flex items-center gap-3 rounded-full bg-primary py-3 pl-6 pr-5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-300 hover:pr-4 hover:pl-7"
        >
          {last ? "Restart" : "Next"}
          {last ? <RotateCcw className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </button>
      </footer>

      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-hairline">
        <div className="h-full bg-forest transition-all duration-700" style={{ width: `${((i + 1) / n) * 100}%` }} />
      </div>
    </div>
  );
}
