import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";

const CARBON = "#171717";
const LIME = "#C6FF34";
const SLATE = "#707070";
const BORDER = "#EAEAEA";
const CREAM = "#F5F5F0";

function useInView(threshold = 0.1) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const experience = [
  {
    company: "Stripe",
    role: "Senior Frontend Engineer",
    period: "2022 — Present",
    description:
      "Lead the Checkout team's component library migration to TypeScript + React 18. Own accessibility across three core product surfaces. Collaborate directly with design on the new Stripe Elements redesign.",
    tags: ["React", "TypeScript", "A11y"],
  },
  {
    company: "Airbnb",
    role: "Frontend Developer",
    period: "2020 — 2022",
    description:
      "Built and maintained core parts of the search and listing pages. Improved LCP by 38% through image lazy-loading and critical CSS extraction. Worked with the design systems team on DLS contributions.",
    tags: ["React", "GraphQL", "Perf"],
  },
  {
    company: "FormStack",
    role: "Junior Frontend Developer",
    period: "2019 — 2020",
    description:
      "First industry role. Shipped the redesigned form builder UI and improved mobile responsiveness across the platform. Wrote extensive unit tests and helped migrate the codebase from Angular to React.",
    tags: ["React", "Angular", "Jest"],
  },
];

const education = [
  {
    institution: "UC Berkeley",
    degree: "B.S. Computer Science",
    period: "2015 — 2019",
    description:
      "Graduated with honors. Focused on HCI, distributed systems, and algorithms. Senior thesis on adaptive UI personalization using collaborative filtering.",
    tags: ["HCI", "Algorithms", "Systems"],
  },
  {
    institution: "IDEO U",
    degree: "Design Thinking Certificate",
    period: "2021",
    description:
      "Intensive course on human-centered design methodology. Applied design sprints and rapid prototyping techniques that I now use regularly in product work.",
    tags: ["Design Thinking", "Prototyping"],
  },
  {
    institution: "Self-taught / Open Source",
    degree: "Continuous Learning",
    period: "2015 — Ongoing",
    description:
      "500+ contributions on GitHub. Regular open-source maintainer. Courses from Egghead, Frontend Masters, and reading everything from SICP to Refactoring UI.",
    tags: ["OSS", "GitHub", "Learning"],
  },
];

function TimelineItem({
  item,
  index,
  inView,
}: {
  item: { company?: string; institution?: string; role?: string; degree?: string; period: string; description: string; tags: string[] };
  index: number;
  inView: boolean;
}) {
  const title = item.company ?? item.institution ?? "";
  const subtitle = item.role ?? item.degree ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.12, ease: "easeOut" }}
      style={{
        display: "flex",
        gap: "20px",
        paddingBottom: "40px",
        position: "relative",
      }}
    >
      {/* Timeline dot + line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: "20px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: LIME,
            border: `3px solid #fff`,
            boxShadow: `0 0 0 2px ${LIME}`,
            flexShrink: 0,
            marginTop: "4px",
          }}
        />
        <div
          style={{
            flex: 1,
            width: "2px",
            background: `linear-gradient(to bottom, ${LIME}, rgba(198,255,52,0.15))`,
            marginTop: "6px",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: "8px" }}>
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <div
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "19px",
                fontWeight: 700,
                color: CARBON,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: SLATE,
                marginTop: "3px",
              }}
            >
              {subtitle}
            </div>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: SLATE,
              background: CREAM,
              border: `1px solid ${BORDER}`,
              padding: "4px 10px",
              borderRadius: "100px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {item.period}
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            lineHeight: 1.7,
            color: SLATE,
            marginTop: "8px",
            marginBottom: "12px",
          }}
        >
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11.5px",
                fontWeight: 500,
                color: "#2D4A0A",
                background: "rgba(198,255,52,0.12)",
                border: "1px solid rgba(198,255,52,0.35)",
                padding: "3px 10px",
                borderRadius: "100px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Timeline() {
  const { ref, inView } = useInView();

  return (
    <section
      id="experience"
      style={{ background: "#FAFAF7", padding: "120px 0" }}
    >
      <div className="max-w-[1440px] mx-auto px-16" ref={ref}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: SLATE,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Experience & Education
          </span>
          <div style={{ width: "80px", height: "1px", background: BORDER }} />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(36px, 3vw, 52px)",
            fontWeight: 800,
            color: CARBON,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "64px",
          }}
        >
          Where I've been.
        </motion.h2>

        {/* Two-column timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Experience column */}
          <div>
            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                color: CARBON,
                letterSpacing: "-0.02em",
                marginBottom: "32px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: LIME,
                }}
              />
              Work
            </h3>
            <div>
              {experience.map((item, i) => (
                <TimelineItem key={item.company} item={item} index={i} inView={inView} />
              ))}
            </div>
          </div>

          {/* Education column */}
          <div>
            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                color: CARBON,
                letterSpacing: "-0.02em",
                marginBottom: "32px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: LIME,
                }}
              />
              Education
            </h3>
            <div>
              {education.map((item, i) => (
                <TimelineItem key={item.institution} item={item} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
