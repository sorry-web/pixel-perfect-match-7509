export type SKey = "strategy" | "structure" | "systems" | "values" | "style" | "staff" | "skills";

export interface Element7S {
  key: SKey;
  name: string;
  kind: "Hard" | "Soft";
  essence: string;
  problem: string;
  intervention: string;
  implementation: string[];
  indicators: string[];
}

export const ELEMENTS: Element7S[] = [
  {
    key: "strategy",
    name: "Strategy",
    kind: "Hard",
    essence: "A single, focused improvement plan.",
    problem:
      "Declining results and a negative inspection report indicate the school lacks a clear, shared direction for improvement.",
    intervention:
      "Adopt a three-priority School Improvement Plan: raise teaching quality, restore attendance, and rebuild trust with families.",
    implementation: [
      "Translate inspection findings into three measurable priorities",
      "Publish the plan to staff, governors and parents",
      "Review progress against the plan every half term",
    ],
    indicators: [
      "Every department plan maps to the three priorities",
      "Half-termly progress review held and minuted",
    ],
  },
  {
    key: "structure",
    name: "Structure",
    kind: "Hard",
    essence: "Clear ownership and accountability.",
    problem:
      "Improvement cannot be sustained if responsibility for teaching, attendance and pastoral care is unclear.",
    intervention:
      "Create named leads for Teaching & Learning, Attendance, and Staff Development, each reporting to the head.",
    implementation: [
      "Define a remit and decision rights for each lead",
      "Establish a weekly 30-minute leadership stand-up",
      "Link pastoral and academic teams around each year group",
    ],
    indicators: [
      "Each priority has one accountable owner",
      "Staff can name who to approach for each issue",
    ],
  },
  {
    key: "systems",
    name: "Systems",
    kind: "Hard",
    essence: "Data that drives early action.",
    problem:
      "High absenteeism and falling performance suggest problems are being noticed too late.",
    intervention:
      "Introduce a simple tracking cycle for attendance and attainment with clear triggers for early intervention.",
    implementation: [
      "Same-day contact with families for unexplained absence",
      "Fortnightly attainment check-ins by year group",
      "A supportive lesson observation and feedback cycle",
    ],
    indicators: [
      "Proposed: attendance tracked weekly against a baseline",
      "Proposed: share of at-risk students with an action plan",
    ],
  },
  {
    key: "values",
    name: "Shared Values",
    kind: "Soft",
    essence: "A purpose everyone recognises.",
    problem:
      "Low morale and disengagement suggest the school community no longer shares a sense of purpose.",
    intervention:
      "Co-create a short statement of values with staff, students and parents that anchors every decision.",
    implementation: [
      "Facilitated workshops with each stakeholder group",
      "Agree three to four values in plain language",
      "Reference the values in assemblies, meetings and policies",
    ],
    indicators: [
      "Proposed: staff and student survey on sense of belonging",
      "Values visibly referenced in key decisions",
    ],
  },
  {
    key: "style",
    name: "Style",
    kind: "Soft",
    essence: "Leadership that is visible and supportive.",
    problem:
      "Low teacher morale often reflects a leadership style experienced as distant or judgemental.",
    intervention:
      "Shift to a visible, coaching-led leadership style that pairs high expectations with high support.",
    implementation: [
      "Leaders present in corridors and classrooms daily",
      "Open-door sessions and regular staff listening forums",
      "Recognise effort and progress publicly",
    ],
    indicators: [
      "Proposed: staff morale pulse survey each half term",
      "Proposed: number of staff concerns raised and resolved",
    ],
  },
  {
    key: "staff",
    name: "Staff",
    kind: "Soft",
    essence: "People who feel valued and supported.",
    problem:
      "Teachers with low morale are less able to change practice or engage students consistently.",
    intervention:
      "Protect staff wellbeing and workload while building collaborative teams around shared goals.",
    implementation: [
      "Audit and reduce low-value administrative tasks",
      "Pair teachers in peer-support partnerships",
      "Structured induction and mentoring for new staff",
    ],
    indicators: [
      "Proposed: staff absence and retention trends",
      "Proposed: participation in peer-support partnerships",
    ],
  },
  {
    key: "skills",
    name: "Skills",
    kind: "Soft",
    essence: "Modern, confident teaching practice.",
    problem:
      "Outdated teaching practices limit engagement, which can contribute to absenteeism and weaker outcomes.",
    intervention:
      "A sustained professional development programme focused on active, evidence-informed teaching.",
    implementation: [
      "Weekly short, practical training sessions",
      "Instructional coaching linked to observation",
      "Shared bank of effective lesson approaches",
    ],
    indicators: [
      "Proposed: observed use of agreed teaching strategies",
      "Proposed: student engagement in lesson feedback",
    ],
  },
];

export const LINKS: Record<SKey, SKey[]> = {
  strategy: ["structure", "systems", "values", "skills"],
  structure: ["strategy", "systems", "style", "values"],
  systems: ["strategy", "structure", "skills", "values"],
  values: ["strategy", "structure", "systems", "style", "staff", "skills"],
  style: ["structure", "staff", "values"],
  staff: ["style", "skills", "values"],
  skills: ["staff", "systems", "strategy", "values"],
};

export const LINK_NOTES: Record<SKey, string> = {
  strategy: "The plan only works if structure assigns owners, systems measure progress and skills make delivery possible.",
  structure: "New roles need systems to report through, and a leadership style that empowers rather than controls.",
  systems: "Tracking data is only useful if staff have the skills and the structure to act on it quickly.",
  values: "Shared values sit at the centre. Every other element should express them; when they drift, alignment breaks.",
  style: "A supportive leadership style is what lifts staff morale and makes the values credible.",
  staff: "Valued, supported staff are the people who develop new skills and carry the change into classrooms.",
  skills: "Better teaching depends on staff wellbeing, coaching systems and a strategy that protects time to learn.",
};

export const WARNINGS = [
  { n: "01", title: "Declining academic performance" },
  { n: "02", title: "Low teacher morale" },
  { n: "03", title: "Outdated teaching practices" },
  { n: "04", title: "High student absenteeism" },
  { n: "05", title: "Negative inspection report" },
];

export const PHASES = [
  {
    days: "Days 1–30",
    title: "Diagnose & stabilise",
    owner: "Head teacher & senior leadership",
    priorities: ["Listen to staff, students and parents", "Assign priority leads", "Launch same-day absence follow-up"],
    signal: "Baseline data agreed; every priority owned",
  },
  {
    days: "Days 31–60",
    title: "Implement & support",
    owner: "Priority leads & middle leaders",
    priorities: ["Begin weekly CPD and coaching", "Co-create shared values", "Reduce staff workload"],
    signal: "Coaching cycle running; values agreed",
  },
  {
    days: "Days 61–90",
    title: "Evaluate & refine",
    owner: "Leadership team & governors",
    priorities: ["Review attendance and attainment trends", "Repeat morale survey", "Adjust the plan for the next term"],
    signal: "Proposed: measurable movement against baseline",
  },
];

const ELEMENT_NOTES: Record<SKey, string> = {
  strategy: "Strategy first: the inspection gives us a starting point. I propose narrowing everything to three priorities so the whole school pulls in one direction.",
  structure: "Structure: priorities need owners. Named leads with clear remits mean nothing falls between the cracks, and staff know who to approach.",
  systems: "Systems: the case suggests problems are spotted too late. A simple tracking cycle with clear triggers lets us act early on absence and attainment.",
  values: "Shared Values sit at the centre. Ms. Aminah's task force — student leaders, teachers and board members — is the natural place to co-create them.",
  style: "Style: morale is shaped by how leaders behave. A visible, coaching-led style pairs high expectations with high support.",
  staff: "Staff: teachers carry the change. Protecting workload and building peer support makes new practice possible.",
  skills: "Skills: outdated practice is one of the five warning signs. Sustained, practical professional development with coaching addresses it directly.",
};

export type SlideDef = { id: string; title: string; notes: string; element?: SKey };

export const SLIDES: SlideDef[] = [
  { id: "opening", title: "Opening", notes: "Welcome. Over the next ten minutes I'll propose how St Anthony's can be transformed — not through one fix, but by aligning the whole organisation using the McKinsey 7-S Framework." },
  { id: "challenge", title: "The Case", notes: "The case gives us five warning signs. Ms. Aminah has been appointed principal and has formed a task force of student leaders, teachers and board members. The signs reinforce each other: outdated teaching lowers engagement, which drives absence, which lowers results." },
  { id: "framework", title: "The Framework", notes: "The 7-S model has three hard elements — strategy, structure, systems — which are easier to define, and four soft elements — style, staff, skills and, at the centre, shared values. Select any element to jump to it." },
  ...ELEMENTS.map((e) => ({ id: e.key, title: e.name, notes: ELEMENT_NOTES[e.key], element: e.key })),
  { id: "alignment", title: "Alignment", notes: "The elements are interdependent. Select any element to see what it relies on. A new strategy without new skills fails; new systems without supportive leadership create fear. Lasting change requires all seven to move together." },
  { id: "roadmap", title: "90-Day Roadmap", notes: "The plan is phased. First thirty days: listen, diagnose, stabilise. Next thirty: implement and support staff. Final thirty: evaluate and refine. Each phase has a clear owner and a signal of progress." },
  { id: "measurement", title: "Measurement", notes: "How would we know it's working? These are proposed indicators, mapped to the five warning signs. They are not current school data — baselines would be agreed in the first thirty days." },
  { id: "closing", title: "Closing", notes: "To close: better schools are not built by isolated solutions. They're built by aligned systems, empowered people and a shared purpose. Thank you." },
];
