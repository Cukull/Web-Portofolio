import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const CARBON = "#171717";
const SLATE = "#707070";
const BORDER = "#EAEAEA";
const BG = "#FAFAF7";

function useInView(threshold = 0.2) {
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

export function About() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      style={{ background: BG, padding: "120px 0" }}
    >
      <div className="max-w-[1440px] mx-auto px-16" ref={ref}>
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
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
            About me
          </span>
          <div style={{ flex: 1, height: "1px", background: BORDER, maxWidth: "80px" }} />
        </div>

        <div className="flex items-start gap-20">
          {/* Left — Photo */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ width: "clamp(300px, 38%, 500px)" }}
          >
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                aspectRatio: "4/5",
                boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1631624215749-b10b3dd7bca7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&w=720&q=80"
                alt="Alex at his workspace"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Small floating echo icon — subtle */}
            <div
              className="absolute"
              style={{
                bottom: "32px",
                right: "-24px",
                opacity: 0.18,
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: "#F7DF1E" }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 900,
                    fontSize: "13px",
                    color: "#000",
                  }}
                >
                  JS
                </span>
              </div>
            </div>
            <div
              className="absolute"
              style={{
                top: "28px",
                right: "-18px",
                opacity: 0.14,
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: "#3178C6" }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 900,
                    fontSize: "12px",
                    color: "#fff",
                  }}
                >
                  TS
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(40px, 3.5vw, 56px)",
                fontWeight: 800,
                color: CARBON,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "32px",
              }}
            >
              Engineer by craft,<br />
              designer by <em style={{ fontStyle: "italic", color: SLATE }}>conviction.</em>
            </h2>

            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "17px",
                lineHeight: 1.75,
                color: SLATE,
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <p>
                I started coding at 16 in a tiny bedroom, pulling apart open-source libraries to understand how they worked. That same obsessive curiosity still drives me today — except now it's pointed at making software that genuinely delights the people who use it.
              </p>
              <p>
                Over the last six years I've worked across the full stack — from architecting real-time APIs to pixel-polishing React components — at companies ranging from funded startups to publicly traded companies. I care deeply about the <strong style={{ color: CARBON, fontWeight: 600 }}>intersection of engineering and design</strong>, and I believe the best products are built at that seam.
              </p>
              <p>
                When I'm not shipping code, I'm likely reading about systems thinking, exploring SF's Mission District, or curating a playlist that's embarrassingly long.
              </p>
            </div>

            {/* Highlight strip */}
            <div
              className="flex flex-wrap gap-3 mt-10"
            >
              {["Systems thinking", "Clean architecture", "Design-aware engineering", "Open source"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: CARBON,
                    background: "rgba(198,255,52,0.15)",
                    border: "1px solid rgba(198,255,52,0.4)",
                    padding: "6px 14px",
                    borderRadius: "100px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-5 mt-10">
              {[
                { label: "GitHub", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "X / Twitter", href: "#" },
                { label: "Resume ↗", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13.5px",
                    fontWeight: 500,
                    color: SLATE,
                    textDecoration: "none",
                    borderBottom: `1px solid ${BORDER}`,
                    paddingBottom: "2px",
                    transition: "color 0.15s, border-color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = CARBON;
                    e.currentTarget.style.borderColor = CARBON;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = SLATE;
                    e.currentTarget.style.borderColor = BORDER;
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
