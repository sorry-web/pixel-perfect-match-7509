import { ELEMENTS, LINKS, type SKey } from "./content";

// Hard elements sit on the upper arc, soft on the lower arc, Shared Values at the centre.
const ANGLES: Record<Exclude<SKey, "values">, number> = {
  strategy: -150,
  structure: -90,
  systems: -30,
  style: 30,
  staff: 90,
  skills: 150,
};

export function positions(r = 160) {
  const pos = { values: { x: 0, y: 0 } } as Record<SKey, { x: number; y: number }>;
  (Object.keys(ANGLES) as (keyof typeof ANGLES)[]).forEach((k) => {
    const a = (ANGLES[k] * Math.PI) / 180;
    pos[k] = { x: Math.cos(a) * r, y: Math.sin(a) * r };
  });
  return pos;
}

interface Props {
  active?: SKey | null;
  onHover?: (k: SKey | null) => void;
  onSelect?: (k: SKey) => void;
  /** kind: hard/soft distinction · links: show dependencies · unity: all aligned */
  mode?: "kind" | "links" | "unity";
  labels?: boolean;
  className?: string;
}

export function SevenS({ active, onHover, onSelect, mode = "links", labels = true, className }: Props) {
  const pos = positions();
  const pairs: [SKey, SKey][] = [];
  const seen = new Set<string>();
  (Object.keys(LINKS) as SKey[]).forEach((a) =>
    LINKS[a].forEach((b) => {
      const id = [a, b].sort().join("-");
      if (!seen.has(id)) {
        seen.add(id);
        pairs.push([a, b]);
      }
    }),
  );
  const isLit = (a: SKey, b: SKey) => !!active && (a === active || b === active);
  const interactive = !!(onSelect || onHover);

  return (
    <svg viewBox="-250 -250 500 500" className={className} role="group" aria-label="McKinsey 7-S framework diagram">
      <circle r="160" fill="none" className="stroke-hairline" strokeWidth="1" />
      {mode === "unity" && <circle r="214" fill="none" className="stroke-bronze" strokeOpacity="0.45" strokeWidth="0.75" />}
      {mode === "kind" && (
        <>
          <line x1="-240" x2="240" y1="0" y2="0" className="stroke-hairline" strokeDasharray="2 5" />
          <text x="-240" y="-12" className="fill-muted-foreground" style={{ fontSize: 10, letterSpacing: "0.2em" }}>HARD</text>
          <text x="-240" y="22" className="fill-muted-foreground" style={{ fontSize: 10, letterSpacing: "0.2em" }}>SOFT</text>
        </>
      )}

      {pairs.map(([a, b]) => {
        const on = isLit(a, b);
        const show = mode !== "kind" || on;
        return (
          <line
            key={a + b}
            x1={pos[a].x}
            y1={pos[a].y}
            x2={pos[b].x}
            y2={pos[b].y}
            className={on ? "stroke-forest" : "stroke-foreground"}
            strokeOpacity={!show ? 0 : on ? 0.85 : active ? 0.05 : mode === "unity" ? 0.28 : 0.12}
            strokeWidth={on ? 1.6 : 0.8}
            style={{ transition: "all .45s var(--ease-out-soft)" }}
          />
        );
      })}

      {ELEMENTS.map((e) => {
        const p = pos[e.key];
        const isActive = active === e.key;
        const related = active ? LINKS[active].includes(e.key) : false;
        const dim = !!active && !isActive && !related;
        const hard = e.kind === "Hard";
        const centre = e.key === "values";
        const r = centre ? 54 : 42;
        const filled = isActive || (hard && mode !== "unity") || (centre && mode === "unity");
        return (
          <g
            key={e.key}
            transform={`translate(${p.x} ${p.y})`}
            tabIndex={interactive ? 0 : -1}
            role={onSelect ? "button" : undefined}
            aria-label={onSelect ? `Open ${e.name} (${e.kind} element)` : undefined}
            onMouseEnter={() => onHover?.(e.key)}
            onMouseLeave={() => onHover?.(null)}
            onFocus={() => onHover?.(e.key)}
            onBlur={() => onHover?.(null)}
            onClick={(ev) => {
              ev.stopPropagation();
              onSelect?.(e.key);
            }}
            onKeyDown={(ev) => {
              if ((ev.key === "Enter" || ev.key === " ") && onSelect) {
                ev.preventDefault();
                ev.stopPropagation();
                onSelect(e.key);
              }
            }}
            style={{ cursor: interactive ? "pointer" : "default", opacity: dim ? 0.3 : 1, transition: "opacity .45s" }}
          >
            {centre && <circle r={r + 8} fill="none" className="stroke-bronze" strokeWidth="0.75" />}
            <circle
              r={r}
              className={filled ? "fill-forest stroke-forest" : hard ? "fill-card stroke-forest" : "fill-card stroke-bronze"}
              strokeWidth={isActive ? 2 : 1}
              style={{ transition: "all .45s var(--ease-out-soft)" }}
            />
            {labels && (
              <text
                textAnchor="middle"
                dy="0.35em"
                className={filled ? "fill-primary-foreground" : "fill-foreground"}
                style={{ fontFamily: "var(--font-display)", fontSize: centre ? 19 : 17, pointerEvents: "none" }}
              >
                {centre ? (
                  <>
                    <tspan x="0" dy="-0.3em">Shared</tspan>
                    <tspan x="0" dy="1.1em">Values</tspan>
                  </>
                ) : (
                  e.name
                )}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
