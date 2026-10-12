import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Home, Maximize2, Minimize2, NotebookPen } from "lucide-react";
import { SLIDES, type SKey } from "./content";
import { Alignment, Challenge, Closing, Elements, Framework, Opening, Roadmap } from "./Slides";

export function Deck() {
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<SKey | null>(null);
  const [notes, setNotes] = useState(false);
  const [fs, setFs] = useState(false);
  const touch = useRef<number | null>(null);
  const n = SLIDES.length;

  useEffect(() => {
    const s = Number(new URLSearchParams(window.location.search).get("slide"));
    if (s >= 1 && s <= n) setI(s - 1);
  }, [n]);

  const go = useCallback(
    (t: number) => {
      const next = Math.max(0, Math.min(n - 1, t));
      setI(next);
      if (next !== 3) setSelected(null);
    },
    [n],
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(i + 1));
    window.history.replaceState(null, "", url);
    document.title = `${i + 1}/${n} — ${SLIDES[i].title} · St Anthony's`;
  }, [i, n]);

  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  };

  useEffect(() => {
    const onFs = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || (e.key === " " && tag !== "BUTTON")) {
        e.preventDefault();
        go(i + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(i - 1);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(n - 1);
      else if (e.key.toLowerCase() === "n") setNotes((v) => !v);
      else if (e.key.toLowerCase() === "f") toggleFs();
      else if (e.key === "Escape" && selected) setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, n, go, selected]);

  const slide = [
    <Opening key="o" onEnter={() => go(1)} />,
    <Challenge key="c" />,
    <Framework key="f" onSelect={(k) => { setSelected(k); go(3); }} />,
    <Elements key="e" selected={selected} setSelected={setSelected} />,
    <Alignment key="a" />,
    <Roadmap key="r" />,
    <Closing key="cl" onRestart={() => go(0)} />,
  ][i];

  const ctrl = "glass inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:text-navy disabled:opacity-30";

  return (
    <div
      className="stage-bg relative flex h-dvh flex-col overflow-hidden"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 60) go(i + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-hairline">
        <div className="h-full bg-navy transition-all duration-700" style={{ width: `${((i + 1) / n) * 100}%` }} />
      </div>

      <header className="flex items-center justify-between px-5 pt-5 sm:px-10">
        <button onClick={() => go(0)} className="kicker inline-flex items-center gap-2 hover:text-navy" aria-label="Return to beginning">
          <Home className="h-3.5 w-3.5" /> St Anthony's
        </button>
        <div className="flex items-center gap-2">
          <button className={ctrl} onClick={() => setNotes((v) => !v)} aria-pressed={notes} aria-label="Toggle speaker notes (N)" title="Speaker notes (N)">
            <NotebookPen className="h-4 w-4" />
          </button>
          <button className={ctrl} onClick={toggleFs} aria-label="Toggle presentation mode (F)" title="Presentation mode (F)">
            {fs ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <main key={i} className="mx-auto w-full max-w-7xl flex-1 overflow-y-auto px-5 py-8 sm:px-10" aria-roledescription="slide" aria-label={`${i + 1} of ${n}: ${SLIDES[i].title}`}>
        {slide}
      </main>

      {notes && (
        <aside className="glass mx-5 mb-3 rounded-xl p-4 text-sm leading-relaxed sm:mx-10" aria-label="Speaker notes">
          <p className="kicker mb-1">Speaker notes · {SLIDES[i].title}</p>
          {SLIDES[i].notes}
        </aside>
      )}

      <footer className="flex items-center justify-between gap-4 px-5 pb-5 sm:px-10">
        <nav aria-label="Slides" className="flex items-center gap-1">
          {SLIDES.map((s, k) => (
            <button
              key={s.id}
              onClick={() => go(k)}
              aria-current={k === i ? "step" : undefined}
              aria-label={`Slide ${k + 1}: ${s.title}`}
              title={s.title}
              className={`h-8 min-w-8 rounded-full px-2 text-xs font-semibold tabular-nums transition-colors ${k === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-navy"}`}
            >
              {String(k + 1).padStart(2, "0")}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="kicker hidden sm:inline">{SLIDES[i].title}</span>
          <button className={ctrl} onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous slide"><ChevronLeft className="h-4 w-4" /></button>
          <button className={ctrl} onClick={() => go(i + 1)} disabled={i === n - 1} aria-label="Next slide"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </footer>
    </div>
  );
}
