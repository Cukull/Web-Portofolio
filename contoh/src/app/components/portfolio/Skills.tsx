import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";

const CARBON = "#171717";
const LIME = "#C6FF34";
const SLATE = "#707070";
const BORDER = "#EAEAEA";
const CREAM = "#F5F5F0";

function useInView(threshold = 0.15) {
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

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      "React", "TypeScript", "Next.js", "Tailwind CSS",
      "Framer Motion", "Three.js", "HTML5 / CSS3", "Webpack / Vite",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js", "Express", "PostgreSQL", "Redis",
      "REST APIs", "GraphQL", "Prisma ORM", "Docker",
    ],
  },
  {
    category: "UI / UX",
    skills: [
      "Figma", "Design Systems", "Prototyping", "Accessibility (WCAG)",
      "Motion Design", "Component Libraries", "Storybook",
    ],
  },
  {
    category: "Tools & Infra",
    skills: [
      "Git", "GitHub Actions", "AWS", "Vercel", "CI/CD", "VS Code", "Postman",
    ],
  },
];

function SkillBadge({ label, index }: { label: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "13.5px",
        fontWeight: 500,
        color: "#2D4A0A",
        background: "rgba(198,255,52,0.13)",
        border: "1px solid rgba(198,255,52,0.45)",
        padding: "7px 15px",
        borderRadius: "100px",
        display: "inline-block",
        cursor: "default",
        transition: "background 0.15s, border-color 0.15s",
      }}
      whileHover={{ background: "rgba(198,255,52,0.28)", scale: 1.03 }}
    >
      {label}
    </motion.span>
  );
}

export function Skills() {
  const { ref, inView } = useInView();

  return (
    <section
      id="skills"
      style={{ background: CREAM, padding: "120px 0" }}
    >
      <div className="max-w-[1440px] mx-auto px-16" ref={ref}>
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
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
                Skills
              </span>
              <div style={{ width: "80px", height: "1px", background: BORDER }} />
            </div>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(36px, 3vw, 52px)",
                fontWeight: 800,
                color: CARBON,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              The stack I build with.
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              color: SLATE,
              maxWidth: "320px",
              lineHeight: 1.7,
              textAlign: "right",
            }}
          >
            Tools and technologies I've used to ship real products.
          </p>
        </div>

        {/* Skill groups grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: gi * 0.1, ease: "easeOut" }}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "32px",
                border: `1px solid ${BORDER}`,
              }}
            >
              {/* Category label */}
              <div className="flex items-center gap-2.5 mb-5">
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: LIME,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: CARBON,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {group.category}
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {inView &&
                  group.skills.map((skill, si) => (
                    <SkillBadge key={skill} label={skill} index={si} />
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="text-center mt-12"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            color: SLATE,
            opacity: 0.7,
          }}
        >
          And always learning — currently exploring Rust and AI tooling.
        </p>
      </div>
    </section>
  );
}
