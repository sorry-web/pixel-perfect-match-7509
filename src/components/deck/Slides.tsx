import { useState } from "react";
import { ELEMENTS, LINK_NOTES, LINKS, PHASES, WARNINGS, type SKey } from "./content";
import { SevenS } from "./SevenS";

const d = (s: number) => ({ animationDelay: `${s}s` });

function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="kicker rise flex items-center gap-4">
      <span className="text-bronze tabular-nums">{n}</span>
      <span className="h-px w-10 bg-bronze/50" />
      {children}
    </p>
  );
}

/* 01 ─ Opening */
export function Opening() {
  return (
    <div className="grid min-h-full items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <p className="kicker rise">Educational leadership · Case analysis</p>
        <h1 className="display rise mt-8 text-[clamp(3.2rem,8vw,7.5rem)]" style={d(0.1)}>
          St Anthony's
          <span className="block italic text-forest">aligned.</span>
        </h1>
        <div className="rise mt-10 flex max-w-xl gap-6 border-t border-hairline pt-6" style={d(0.3)}>
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            A 90-day proposal for school improvement, built on the McKinsey 7-S Framework.
          </p>
        </div>
      </div>
      <div className="fadein hidden lg:block" style={d(0.35)}>
        <SevenS mode="unity" labels={false} className="mx-auto w-full max-w-md" />
        <p className="kicker mt-4 text-center">Seven elements · one centre</p>
      </div>
    </div>
  );
}

/* 02 ─ The case */
export function Challenge() {
  return (
    <div className="flex min-h-full flex-col justify-center">
      <Eyebrow n="02">The case</Eyebrow>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-end">
        <h2 className="display rise text-[clamp(2.6rem,5.5vw,5rem)]" style={d(0.05)}>
          Five warning signs. <em className="text-forest">One system.</em>
        </h2>
        <p className="rise max-w-xl text-lg leading-relaxed text-muted-foreground" style={d(0.15)}>
          Ms. Aminah has been appointed principal and has formed a task force of student leaders, teachers and
          school board members. The case presents these symptoms:
        </p>
      </div>
      <ol className="mt-12 grid border-t border-hairline sm:grid-cols-5">
        {WARNINGS.map((w, i) => (
          <li
            key={w.n}
            className="rise border-b border-hairline py-6 sm:border-b-0 sm:border-l sm:px-5 sm:py-8 sm:first:border-l-0 sm:first:pl-0"
            style={d(0.25 + i * 0.08)}
          >
            <span className="display text-5xl text-bronze">{w.n}</span>
            <p className="mt-4 text-lg font-medium leading-snug sm:text-xl">{w.title}</p>
          </li>
        ))}
      </ol>
      <p className="rise mt-8 text-sm text-muted-foreground" style={d(0.7)}>
        <span className="font-semibold text-foreground">Fact</span> — as stated in the case study. Each symptom feeds
        the next; treating one in isolation will not hold.
      </p>
    </div>
  );
}

/* 03 ─ Framework */
export function Framework({ onSelect }: { onSelect: (k: SKey) => void }) {
  const [hover, setHover] = useState<SKey | null>(null);
  const h = ELEMENTS.find((e) => e.key === hover);
  return (
    <div className="grid min-h-full items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
      <div>
        <Eyebrow n="03">The framework</Eyebrow>
        <h2 className="display rise mt-6 text-[clamp(2.6rem,5.5vw,5rem)]" style={d(0.05)}>
          Seven elements, <em className="text-forest">one centre.</em>
        </h2>
        <dl className="rise mt-10 grid max-w-lg grid-cols-2 gap-8 border-t border-hairline pt-6" style={d(0.15)}>
          <div>
            <dt className="flex items-center gap-2 font-semibold"><span className="h-2.5 w-2.5 rounded-full bg-forest" />Hard</dt>
            <dd className="mt-2 text-muted-foreground">Strategy, Structure, Systems. Tangible and easier to define.</dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 font-semibold"><span className="h-2.5 w-2.5 rounded-full border border-bronze" />Soft</dt>
            <dd className="mt-2 text-muted-foreground">Shared Values, Style, Staff, Skills. Cultural and often decisive.</dd>
          </div>
        </dl>
        <p className="rise mt-8 min-h-14 max-w-lg text-lg" style={d(0.25)} aria-live="polite">
          {h ? (
            <><span className="display text-2xl text-forest">{h.name}</span> — {h.essence}</>
          ) : (
            <span className="text-muted-foreground">Select an element to open its analysis.</span>
          )}
        </p>
      </div>
      <SevenS mode="kind" active={hover} onHover={setHover} onSelect={onSelect} className="fadein mx-auto w-full max-w-lg" />
    </div>
  );
}

/* 04–10 ─ Individual element */
export function ElementSlide({ k, onBack }: { k: SKey; onBack: () => void }) {
  const idx = ELEMENTS.findIndex((e) => e.key === k);
  const el = ELEMENTS[idx]!;
  const flip = idx % 2 === 1;
  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="flex items-center justify-between">
        <Eyebrow n={String(idx + 4).padStart(2, "0")}>{el.kind} element · {idx + 1} of 7</Eyebrow>
        <button onClick={onBack} className="kicker underline-offset-4 hover:text-forest hover:underline">
          Return to framework
        </button>
      </div>
      <div className={`mt-8 grid gap-10 lg:gap-16 ${flip ? "lg:grid-cols-[1.5fr_1fr]" : "lg:grid-cols-[1fr_1.5fr]"}`}>
        <div className={`rise ${flip ? "lg:order-2" : ""}`}>
          <h2 className="display text-[clamp(3.2rem,7vw,6.5rem)]">{el.name}</h2>
          <p className="display mt-4 text-2xl italic text-forest sm:text-3xl">{el.essence}</p>
          <SevenS mode="kind" active={k} labels={false} className="mt-8 hidden w-40 lg:block" />
        </div>
        <div className={`grid content-start gap-0 ${flip ? "lg:order-1" : ""}`}>
          <section className="rise border-t border-hairline py-5" style={d(0.1)}>
            <h3 className="kicker">Diagnosis · from the case</h3>
            <p className="mt-3 text-lg leading-relaxed sm:text-xl">{el.problem}</p>
          </section>
          <section className="rise border-t border-hairline py-5" style={d(0.2)}>
            <h3 className="kicker text-forest">Recommendation</h3>
            <p className="mt-3 text-lg font-medium leading-relaxed sm:text-xl">{el.intervention}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-3 sm:gap-6">
              {el.implementation.map((x, i) => (
                <li key={x} className="text-muted-foreground">
                  <span className="mr-2 text-sm tabular-nums text-bronze">{i + 1}</span>{x}
                </li>
              ))}
            </ul>
          </section>
          <section className="rise border-t border-hairline py-5" style={d(0.3)}>
            <h3 className="kicker text-bronze">Evidence of progress · proposed</h3>
            <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
              {el.indicators.map((x) => (
                <li key={x}>{x.replace(/^Proposed:\s*/, "")}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

/* 11 ─ Alignment */
export function Alignment() {
  const [active, setActive] = useState<SKey>("values");
  const [hover, setHover] = useState<SKey | null>(null);
  const cur = hover ?? active;
  const el = ELEMENTS.find((e) => e.key === cur)!;
  return (
    <div className="grid min-h-full items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
      <SevenS mode="links" active={cur} onHover={setHover} onSelect={setActive} className="fadein order-2 mx-auto w-full max-w-xl lg:order-1" />
      <div className="order-1 lg:order-2">
        <Eyebrow n="11">Alignment</Eyebrow>
        <h2 className="display rise mt-6 text-[clamp(2.6rem,5vw,4.5rem)]" style={d(0.05)}>
          Nothing moves <em className="text-forest">alone.</em>
        </h2>
        <div key={cur} className="fadein mt-10 border-t border-hairline pt-6">
          <p className="display text-3xl text-forest">{el.name}</p>
          <p className="mt-3 text-lg leading-relaxed">{LINK_NOTES[cur]}</p>
          <p className="kicker mt-6">Depends on</p>
          <p className="mt-2 text-muted-foreground">
            {LINKS[cur].map((x) => ELEMENTS.find((e) => e.key === x)!.name).join(" · ")}
          </p>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">Select any element to trace its dependencies.</p>
      </div>
    </div>
  );
}

/* 12 ─ Roadmap */
export function Roadmap() {
  return (
    <div className="flex min-h-full flex-col justify-center">
      <Eyebrow n="12">90-day roadmap</Eyebrow>
      <h2 className="display rise mt-6 text-[clamp(2.6rem,5vw,4.5rem)]" style={d(0.05)}>
        Listen. Build. <em className="text-forest">Refine.</em>
      </h2>
      <div className="relative mt-14">
        <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-hairline sm:block" />
        <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {PHASES.map((p, i) => (
            <li key={p.days} className="rise relative" style={d(0.15 + i * 0.12)}>
              <span className={`relative block h-3.5 w-3.5 rounded-full border-2 border-forest ${i === 0 ? "bg-forest" : "bg-background"}`} />
              <p className="kicker mt-6 text-bronze">{p.days}</p>
              <p className="display mt-2 text-3xl sm:text-4xl">{p.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">Led by {p.owner}</p>
              <ul className="mt-5 space-y-2 border-t border-hairline pt-4">
                {p.priorities.map((x) => <li key={x}>{x}</li>)}
              </ul>
              <p className="mt-5 text-sm"><span className="font-semibold text-forest">Milestone</span> — {p.signal.replace(/^Proposed:\s*/, "")}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* 13 ─ Measurement */
const MEASURES: { sign: string; items: string[] }[] = [
  { sign: "Academic performance", items: ["Share of at-risk students with an action plan", "Fortnightly attainment check-ins held"] },
  { sign: "Teacher morale", items: ["Staff morale pulse survey each half term", "Staff absence and retention trends"] },
  { sign: "Teaching practice", items: ["Observed use of agreed teaching strategies", "Student engagement in lesson feedback"] },
  { sign: "Student attendance", items: ["Attendance tracked weekly against a baseline", "Same-day contact for unexplained absence"] },
  { sign: "Inspection readiness", items: ["Department plans mapped to the three priorities", "Half-termly progress review minuted"] },
];

export function Measurement() {
  return (
    <div className="flex min-h-full flex-col justify-center">
      <Eyebrow n="13">Measurement</Eyebrow>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <h2 className="display rise text-[clamp(2.6rem,5vw,4.5rem)]" style={d(0.05)}>
          How we would <em className="text-forest">know.</em>
        </h2>
        <p className="rise max-w-md text-muted-foreground" style={d(0.15)}>
          Proposed indicators only — no current school data is shown. Baselines are agreed in Days 1–30.
        </p>
      </div>
      <table className="rise mt-12 w-full border-collapse text-left" style={d(0.25)}>
        <thead>
          <tr className="border-b border-foreground/30">
            <th className="kicker w-1/3 pb-3 font-semibold">Warning sign</th>
            <th className="kicker pb-3 font-semibold">Proposed indicators</th>
          </tr>
        </thead>
        <tbody>
          {MEASURES.map((m) => (
            <tr key={m.sign} className="border-b border-hairline align-top">
              <td className="display py-4 pr-4 text-2xl">{m.sign}</td>
              <td className="py-4">
                <div className="grid gap-1 sm:grid-cols-2 sm:gap-6 sm:text-lg">
                  {m.items.map((x) => <span key={x}>{x}</span>)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* 14 ─ Closing */
export function Closing() {
  return (
    <div className="grid min-h-full items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <p className="kicker rise">In closing</p>
        <h2 className="display rise mt-8 text-[clamp(2.8rem,6.5vw,6rem)]" style={d(0.1)}>
          Schools improve when <em className="text-forest">everything</em> points the same way.
        </h2>
        <p className="rise mt-10 max-w-lg border-t border-hairline pt-6 text-lg text-muted-foreground" style={d(0.3)}>
          Aligned systems, empowered people and a shared purpose. Thank you.
        </p>
      </div>
      <SevenS mode="unity" className="fadein mx-auto w-full max-w-md" />
    </div>
  );
}
