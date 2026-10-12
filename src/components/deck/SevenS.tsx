import { ELEMENTS, LINKS, type SKey } from "./content";

const ORDER: SKey[] = ["strategy", "structure", "systems", "style", "staff", "skills"];

export function positions(r = 150) {
  const pos: Record<string, { x: number; y: number }> = { values: { x: 0, y: 0 } };
  ORDER.forEach((k, i) => {
    const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    pos[k] = { x: Math.cos(a) * r, y: Math.sin(a) * r };
  });
  return pos as Record<SKey, { x: number; y: number }>;
}

interface Props {
  active?: SKey | null;
  onHover?: (k: SKey | null) => void;
  onSelect?: (k: SKey) => void;
  mode?: "kind" | "links" | "unity";
  className?: string;
}

export function SevenS({ active, onHover, onSelect, mode = "links", className }: Props) {
  const pos = positions();
  const all = ELEMENTS.map((e) => e.key);
  const pairs: [SKey, SKey][] = [];
  all.forEach((a, i) => all.slice(i + 1).forEach((b) => pairs.push([a, b])));
  const lit = (a: SKey, b: SKey) =>
    active ? (a === active && LINKS[a].includes(b)) || (b === active && LINKS[b].includes(a)) : false;

  return (
    <svg viewBox="-230 -230 460 460" className={className} role="group" aria-label="McKinsey 7-S diagram">
      {mode === "kind" && (
        <circle r="150" fill="none" className="stroke-hairline" strokeDasharray="2 6" />
      )}
      {mode === "unity" && (
        <g className="drift">
          <circle r="200" fill="none" className="stroke-silver" strokeWidth="0.6" />
          <circle r="150" fill="none" className="stroke-navy" strokeOpacity="0.25" strokeWidth="0.6" />
        </g>
      )}
      {pairs.map(([a, b]) => {
        const on = lit(a, b);
        return (
          <line
            key={a + b}
            x1={pos[a].x}
            y1={pos[a].y}
            x2={pos[b].x}
            y2={pos[b].y}
            className={on ? "stroke-navy" : "stroke-foreground"}
            strokeOpacity={on ? 0.8 : active ? 0.05 : mode === "unity" ? 0.22 : 0.1}
            strokeWidth={on ? 1.6 : 0.8}
            style={{ transition: "all .4s var(--ease-out-soft)" }}
          />
        );
      })}
      {ELEMENTS.map((e) => {
        const p = pos[e.key];
        const isActive = active === e.key;
        const related = active ? LINKS[active].includes(e.key) : false;
        const dim = active && !isActive && !related;
        const hard = e.kind === "Hard";
        const r = e.key === "values" ? 46 : 40;
        return (
          <g
            key={e.key}
            transform={`translate(${p.x} ${p.y})`}
            tabIndex={onSelect || onHover ? 0 : -1}
            role={onSelect ? "button" : undefined}
            aria-label={`${e.name}, ${e.kind} element`}
            onMouseEnter={() => onHover?.(e.key)}
            onMouseLeave={() => onHover?.(null)}
            onFocus={() => onHover?.(e.key)}
            onBlur={() => onHover?.(null)}
            onClick={() => onSelect?.(e.key)}
            onKeyDown={(ev) => {
              if ((ev.key === "Enter" || ev.key === " ") && onSelect) {
                ev.preventDefault();
                ev.stopPropagation();
                onSelect(e.key);
              }
            }}
            style={{ cursor: onSelect || onHover ? "pointer" : "default", opacity: dim ? 0.35 : 1, transition: "opacity .4s" }}
          >
            <circle
              r={r}
              className={
                isActive || (mode === "kind" && hard)
                  ? "fill-navy stroke-navy"
                  : "fill-card stroke-silver"
              }
              strokeWidth="1"
              style={{ transition: "all .4s var(--ease-out-soft)" }}
            />
            <text
              textAnchor="middle"
              dy="0.35em"
              className={
                isActive || (mode === "kind" && hard) ? "fill-primary-foreground" : "fill-foreground"
              }
              style={{ fontFamily: "var(--font-display)", fontSize: e.key === "values" ? 17 : 16 }}
            >
              {e.key === "values" ? (
                <>
                  <tspan x="0" dy="-0.25em">Shared</tspan>
                  <tspan x="0" dy="1.1em">Values</tspan>
                </>
              ) : (
                e.name
              )}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
