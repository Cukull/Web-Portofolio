import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const CARBON = "#171717";
const LIME = "#C6FF34";
const SLATE = "#707070";
const BORDER = "#EAEAEA";
const BG = "#FAFAF7";

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

const projects = [
  {
    id: "fintrack",
    name: "FinTrack",
    tagline: "Personal finance, beautifully simplified.",
    description:
      "A real-time finance dashboard helping 12,000+ users track spending, investments, and savings goals in one place. Built with Next.js, PostgreSQL, and Plaid API — shipped from zero to production in 10 weeks.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Plaid API", "Recharts"],
    role: "Lead Engineer & Designer",
    year: "2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&w=1100&q=80",
    imageAlt: "FinTrack analytics dashboard",
    imageLeft: false,
    accent: "#C6FF34",
  },
  {
    id: "shopmate",
    name: "ShopMate",
    tagline: "Smarter mobile shopping, zero friction.",
    description:
      "A Shopify companion app for iOS and Android that lets merchants manage their store from their pocket. Deep-linked push notifications, real-time inventory updates, and a native-feel UI built entirely in React Native.",
    tags: ["React Native", "Node.js", "Shopify API", "Redis", "Expo"],
    role: "Full-Stack Developer",
    year: "2023",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&w=1100&q=80",
    imageAlt: "ShopMate mobile app",
    imageLeft: true,
    accent: "#C6FF34",
  },
  {
    id: "devmetrics",
    name: "DevMetrics",
    tagline: "Ship faster. Burn out less.",
    description:
      "A SaaS tool for engineering teams to visualize DORA metrics, PR cycle times, and deployment frequency. Integrates with GitHub, GitLab, and Jira. Helps teams identify bottlenecks and celebrate wins.",
    tags: ["React", "Express", "GraphQL", "AWS", "GitHub API"],
    role: "Co-founder & Engineering Lead",
    year: "2022",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&w=1100&q=80",
    imageAlt: "DevMetrics engineering dashboard",
    imageLeft: false,
    accent: "#C6FF34",
  },
];

function ProjectBlock({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, inView } = useInView(0.1);
  const imgLeft = project.imageLeft;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: `1px solid ${BORDER}`,
        display: "flex",
        flexDirection: imgLeft ? "row-reverse" : "row",
        minHeight: "440px",
      }}
    >
      {/* Text side */}
      <div
        style={{
          flex: "0 0 42%",
          padding: "52px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Meta row */}
        <div className="flex items-center gap-3 mb-6">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11.5px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: SLATE,
            }}
          >
            {project.year}
          </span>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: BORDER, display: "inline-block" }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11.5px",
              fontWeight: 500,
              color: SLATE,
              letterSpacing: "0.04em",
            }}
          >
            {project.role}
          </span>
        </div>

        {/* Name */}
        <h3
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(30px, 2.5vw, 40px)",
            fontWeight: 800,
            color: CARBON,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "8px",
          }}
        >
          {project.name}
        </h3>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            color: SLATE,
            marginBottom: "18px",
            fontStyle: "italic",
          }}
        >
          {project.tagline}
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            lineHeight: 1.75,
            color: SLATE,
            marginBottom: "28px",
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                color: CARBON,
                background: BG,
                border: `1px solid ${BORDER}`,
                padding: "4px 12px",
                borderRadius: "100px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: CARBON,
            textDecoration: "none",
            borderBottom: `2px solid ${LIME}`,
            paddingBottom: "3px",
            width: "fit-content",
            transition: "gap 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.gap = "12px";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.gap = "8px";
          }}
        >
          View Case Study
          <ArrowUpRight size={15} />
        </a>
      </div>

      {/* Image side */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <ImageWithFallback
          src={project.image}
          alt={project.imageAlt}
          className="w-full h-full object-cover"
          style={{ transition: "transform 0.5s ease" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
          }}
        />
        {/* Subtle overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: imgLeft
              ? "linear-gradient(to right, rgba(255,255,255,0.06), transparent)"
              : "linear-gradient(to left, rgba(255,255,255,0.06), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}

export function Projects() {
  const { ref, inView } = useInView();

  return (
    <section id="projects" style={{ background: BG, padding: "120px 0" }}>
      <div className="max-w-[1440px] mx-auto px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-16" ref={ref}>
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
                Selected work
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
              }}
            >
              Products I've built<br />that people use.
            </motion.h2>
          </div>

          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: SLATE,
              textDecoration: "none",
            }}
          >
            All projects
            <ArrowUpRight size={15} />
          </motion.a>
        </div>

        {/* Project blocks */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectBlock key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
