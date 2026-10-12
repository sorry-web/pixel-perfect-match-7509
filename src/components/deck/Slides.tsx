import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ELEMENTS, LINK_NOTES, LINKS, PHASES, WARNINGS, type SKey } from "./content";
import { SevenS } from "./SevenS";

const Kicker = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <p className="kicker rise flex items-center gap-3">
    <span className="text-navy">{n}</span>
    <span className="h-px w-8 bg-hairline" />
    {children}
  </p>
);

export function Opening({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="relative grid h-full items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <p className="kicker rise">A proposal using the McKinsey 7-S Framework</p>
        <h1 className="display rise mt-6 text-5xl sm:text-7xl lg:text-8xl" style={{ animationDelay: ".1s" }}>
          St Anthony's:
          <br />
          <em className="text-navy">The Architecture</em>
          <br />
          of School Transformation
        </h1>
        <p className="rise mt-8 max-w-lg text-lg text-muted-foreground" style={{ animationDelay: ".25s" }}>
          A coherent, sustainable strategy for improvement — built by aligning seven elements of one organisation.
        </p>
        <button
          onClick={onEnter}
          className="rise group mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:gap-5"
          style={{ animationDelay: ".4s" }}
        >
          Enter Presentation <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="rise hidden lg:block" style={{ animationDelay: ".3s" }}>
        <SevenS mode="unity" className="mx-auto w-full max-w-md" />
      </div>
    </div>
  );
}

export function Challenge() {
  return (
    <div className="grid h-full content-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
      <div>
        <Kicker n="02">The Challenge</Kicker>
        <h2 className="display rise mt-6 text-4xl sm:text-6xl">Five warning signs. One connected problem.</h2>
        <p className="rise mt-6 max-w-md text-muted-foreground" style={{ animationDelay: ".15s" }}>
          Each symptom feeds the others. Isolated fixes treat one sign while the rest pull it back. Lasting
          improvement requires the whole organisation to move in alignment.
        </p>
      </div>
      <ol className="divide-y divide-hairline border-y border-hairline">
        {WARNINGS.map((w, i) => (
          <li
            key={w.n}
            className="rise group flex items-baseline gap-6 py-5 transition-colors hover:text-navy"
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          >
            <span className="kicker w-8 group-hover:text-navy">{w.n}</span>
            <span className="display text-2xl sm:text-4xl">{w.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Framework({ onSelect }: { onSelect: (k: SKey) => void }) {
  const [hover, setHover] = useState<SKey | null>(null);
  const h = ELEMENTS.find((e) => e.key === hover);
  return (
    <div className="grid h-full content-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div>
        <Kicker n="03">The Framework</Kicker>
        <h2 className="display rise mt-6 text-4xl sm:text-6xl">Seven elements, one system.</h2>
        <div className="rise mt-8 grid max-w-md grid-cols-2 gap-6" style={{ animationDelay: ".15s" }}>
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <span className="h-3 w-3 rounded-full bg-navy" /> Hard elements
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Strategy, Structure, Systems — tangible and easier to define.</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <span className="h-3 w-3 rounded-full border border-silver bg-card" /> Soft elements
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Shared Values, Style, Staff, Skills — cultural and often decisive.</p>
          </div>
        </div>
        <div className="glass rise mt-8 min-h-28 max-w-md rounded-xl p-5" style={{ animationDelay: ".25s" }} aria-live="polite">
          {h ? (
            <>
              <p className="kicker">{h.kind} element</p>
              <p className="display mt-2 text-2xl">{h.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{h.essence} Click to explore.</p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Hover or focus an element to preview it. Click to open its detail.</p>
          )}
        </div>
      </div>
      <SevenS mode="kind" active={hover} onHover={setHover} onSelect={onSelect} className="rise mx-auto w-full max-w-lg" />
    </div>
  );
}

export function Elements({ selected, setSelected }: { selected: SKey | null; setSelected: (k: SKey | null) => void }) {
  const idx = ELEMENTS.findIndex((e) => e.key === selected);
  const el = ELEMENTS[idx];

  if (el) {
    const go = (d: number) => setSelected(ELEMENTS[(idx + d + 7) % 7]!.key);
    return (
      <div key={el.key} className="flex h-full flex-col justify-center">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button onClick={() => setSelected(null)} className="kicker inline-flex items-center gap-2 hover:text-navy">
            <ArrowLeft className="h-3.5 w-3.5" /> All seven elements
          </button>
          <div className="flex items-center gap-2">
            <button aria-label="Previous element" onClick={() => go(-1)} className="glass rounded-full p-2 hover:text-navy"><ArrowLeft className="h-4 w-4" /></button>
            <span className="kicker">{idx + 1} / 7</span>
            <button aria-label="Next element" onClick={() => go(1)} className="glass rounded-full p-2 hover:text-navy"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="rise">
            <p className="kicker">{el.kind} element · {String(idx + 1).padStart(2, "0")}</p>
            <h2 className="display mt-4 text-5xl sm:text-7xl">{el.name}</h2>
            <p className="display mt-4 text-2xl italic text-navy">{el.essence}</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2">
            {[
              ["The problem", <p key="p">{el.problem}</p>],
              ["Proposed intervention", <p key="i">{el.intervention}</p>],
              ["Implementation", <ul key="m" className="space-y-2">{el.implementation.map((x) => <li key={x} className="flex gap-2"><span className="text-navy">—</span>{x}</li>)}</ul>],
              ["Indicators of progress", <ul key="k" className="space-y-2">{el.indicators.map((x) => <li key={x} className="flex gap-2"><span className="text-navy">—</span>{x}</li>)}</ul>],
            ].map(([t, body], i) => (
              <section key={t as string} className="rise bg-card p-6 text-sm leading-relaxed" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                <h3 className="kicker mb-3 text-navy">{t}</h3>
                {body}
              </section>
            ))}
          </div>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Indicators are proposed measures, not existing school data.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center">
      <Kicker n="04">The Seven Elements</Kicker>
      <h2 className="display rise mt-6 text-4xl sm:text-6xl">Select an element to explore.</h2>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {ELEMENTS.map((e, i) => (
          <button
            key={e.key}
            onClick={() => setSelected(e.key)}
            className="glass rise group flex min-h-40 flex-col justify-between rounded-xl p-5 text-left transition-all duration-500 hover:-translate-y-1 hover:border-navy/40"
            style={{ animationDelay: `${0.1 + i * 0.06}s` }}
          >
            <div className="flex items-center justify-between">
              <span className="kicker">{String(i + 1).padStart(2, "0")} · {e.kind}</span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-navy" />
            </div>
            <div>
              <p className="display text-3xl group-hover:text-navy">{e.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{e.essence}</p>
            </div>
          </button>
        ))}
        <div className="rise hidden flex-col justify-end rounded-xl border border-dashed border-hairline p-5 text-xs text-muted-foreground lg:flex" style={{ animationDelay: ".55s" }}>
          Each card reveals the problem, intervention, implementation and proposed indicators.
        </div>
      </div>
    </div>
  );
}

export function Alignment() {
  const [active, setActive] = useState<SKey | null>("values");
  const el = ELEMENTS.find((e) => e.key === active);
  return (
    <div className="grid h-full content-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <SevenS active={active} onHover={(k) => k && setActive(k)} className="rise order-2 mx-auto w-full max-w-lg lg:order-1" />
      <div className="order-1 lg:order-2">
        <Kicker n="05">The Alignment</Kicker>
        <h2 className="display rise mt-6 text-4xl sm:text-6xl">Change one, and you change them all.</h2>
        {el && (
          <div key={el.key} className="glass rise mt-8 rounded-xl p-6" aria-live="polite">
            <p className="display text-3xl text-navy">{el.name}</p>
            <p className="mt-3 text-sm leading-relaxed">{LINK_NOTES[el.key]}</p>
            <p className="kicker mt-4">Depends on</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {LINKS[el.key].map((k) => (
                <button key={k} onClick={() => setActive(k)} className="rounded-full border border-hairline px-3 py-1 text-xs hover:border-navy hover:text-navy">
                  {ELEMENTS.find((x) => x.key === k)!.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Roadmap() {
  return (
    <div className="flex h-full flex-col justify-center">
      <Kicker n="06">The 90-Day Roadmap</Kicker>
      <h2 className="display rise mt-6 text-4xl sm:text-6xl">Ninety days, three deliberate phases.</h2>
      <div className="relative mt-10 grid gap-4 md:grid-cols-3">
        <div className="absolute left-0 right-0 top-0 hidden h-px bg-hairline md:block" />
        {PHASES.map((p, i) => (
          <article key={p.days} className="rise relative pt-6" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
            <span className="absolute -top-1.5 left-0 hidden h-3 w-3 rounded-full bg-navy md:block" />
            <p className="kicker text-navy">{p.days}</p>
            <h3 className="display mt-2 text-3xl">{p.title}</h3>
            <div className="glass mt-4 space-y-4 rounded-xl p-5 text-sm">
              <div><p className="kicker mb-1">Responsible</p>{p.owner}</div>
              <div>
                <p className="kicker mb-1">Priorities</p>
                <ul className="space-y-1">{p.priorities.map((x) => <li key={x} className="flex gap-2"><span className="text-navy">—</span>{x}</li>)}</ul>
              </div>
              <div className="border-t border-hairline pt-3"><p className="kicker mb-1">Signal of progress</p>{p.signal}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Closing({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="grid h-full content-center justify-items-center gap-8 text-center">
      <SevenS mode="unity" className="rise w-56 sm:w-72" />
      <blockquote className="display rise max-w-4xl text-3xl sm:text-5xl lg:text-6xl" style={{ animationDelay: ".2s" }}>
        Better schools are not built by isolated solutions. They are built by{" "}
        <em className="text-navy">aligned systems, empowered people, and a shared purpose.</em>
      </blockquote>
      <button onClick={onRestart} className="kicker rise hover:text-navy" style={{ animationDelay: ".4s" }}>
        Return to the beginning
      </button>
    </div>
  );
}
