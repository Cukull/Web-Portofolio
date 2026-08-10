import { motion } from "motion/react";
import { Maximize2, Moon, RefreshCw, ArrowRight, Download } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const BG = "#FAFAF7";
const LIME = "#C6FF34";
const CARBON = "#171717";
const SLATE = "#707070";
const CREAM = "#F5F5F0";
const BORDER = "#EAEAEA";

function JSIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#F7DF1E" }}>
      <span style={{ fontFamily: "monospace", fontWeight: 900, fontSize: "13px", color: "#000", letterSpacing: "-0.5px" }}>JS</span>
    </div>
  );
}
function TSIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#3178C6" }}>
      <span style={{ fontFamily: "monospace", fontWeight: 900, fontSize: "13px", color: "#fff", letterSpacing: "-0.5px" }}>TS</span>
    </div>
  );
}
function ReactIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#20232A" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
      </svg>
    </div>
  );
}
function NodeIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#339933" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        <text x="8.5" y="15.5" fontFamily="Arial" fontSize="7" fontWeight="bold" fill="#fff">N</text>
      </svg>
    </div>
  );
}
function GitIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#F05032" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="2.5" fill="#fff" />
        <circle cx="18" cy="6" r="2.5" fill="#fff" />
        <circle cx="6" cy="18" r="2.5" fill="#fff" />
        <path d="M6 8.5V15.5M6 8.5C8 8.5 15.5 8.5 15.5 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
function VSCodeIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#007ACC" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M17 3L7 13.5l-4-3.5L1 11.5l4 3.5L1 18.5 3 20l4-3.5 10 7V3z" fill="#fff" />
      </svg>
    </div>
  );
}
function TailwindIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#06B6D4" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M6 9.5C7.5 5.5 10 4 12 6.5C13.5 8.5 14 10.5 16 9C17.5 7.5 19 7.5 20 9.5M6 15.5C7.5 11.5 10 10 12 12.5C13.5 14.5 14 16.5 16 15C17.5 13.5 19 13.5 20 15.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
function GitHubIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#24292E" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.74 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    </div>
  );
}
function FigmaIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#F0F0EE" }}>
      <svg width="18" height="22" viewBox="0 0 12 18" fill="none">
        <rect x="0" y="0" width="6" height="6" rx="3" fill="#F24E1E" />
        <rect x="6" y="0" width="6" height="6" rx="3" fill="#FF7262" />
        <rect x="0" y="6" width="6" height="6" rx="3" fill="#A259FF" />
        <rect x="6" y="6" width="6" height="6" rx="3" fill="#1ABCFE" />
        <rect x="0" y="12" width="6" height="6" rx="3" fill="#0ACF83" />
      </svg>
    </div>
  );
}
function NpmIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#CB3837" }}>
      <span style={{ fontFamily: "monospace", fontWeight: 900, fontSize: "11px", color: "#fff", letterSpacing: "-0.5px" }}>npm</span>
    </div>
  );
}
function LinkedInIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#0A66C2" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" fill="#fff" />
      </svg>
    </div>
  );
}
function XIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#000" }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </div>
  );
}
function SpotifyIcon() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[6px]" style={{ background: "#1DB954" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.305-1.76-8.786-.963-.335.077-.67-.133-.746-.47-.077-.334.132-.67.47-.745 3.808-.87 7.076-.496 9.712 1.115.293.18.386.563.207.856zm1.223-2.723c-.226.367-.706.482-1.072.257-2.687-1.652-6.785-2.131-9.965-1.166-.413.127-.848-.106-.973-.517-.125-.413.108-.849.52-.973 3.632-1.102 8.147-.568 11.234 1.328.366.226.48.707.256 1.071zm.105-2.835c-3.223-1.916-8.54-2.091-11.618-1.156-.493.15-1.016-.129-1.166-.623-.148-.495.13-1.017.624-1.166 3.532-1.073 9.404-.865 13.115 1.338.445.264.59.838.327 1.282-.264.444-.838.59-1.282.327z" />
      </svg>
    </div>
  );
}

const iconMap: Record<string, JSX.Element> = {
  js: <JSIcon />,
  ts: <TSIcon />,
  react: <ReactIcon />,
  node: <NodeIcon />,
  git: <GitIcon />,
  vscode: <VSCodeIcon />,
  tailwind: <TailwindIcon />,
  github: <GitHubIcon />,
  figma: <FigmaIcon />,
  npm: <NpmIcon />,
  linkedin: <LinkedInIcon />,
  x: <XIcon />,
  spotify: <SpotifyIcon />,
};

const floatingCards = [
  { id: "js", pos: { left: "2.5%", top: "20%" }, size: 52, opacity: 1, delay: 0 },
  { id: "ts", pos: { left: "5.5%", top: "35%" }, size: 44, opacity: 0.85, delay: 0.9 },
  { id: "git", pos: { left: "2%", top: "65%" }, size: 46, opacity: 0.8, delay: 0.4 },
  { id: "vscode", pos: { left: "6%", top: "80%" }, size: 52, opacity: 0.9, delay: 1.2 },
  { id: "react", pos: { left: "44%", top: "4.5%" }, size: 58, opacity: 0.9, delay: 0.6 },
  { id: "npm", pos: { left: "33%", bottom: "9%" }, size: 44, opacity: 0.7, delay: 1.0 },
  { id: "node", pos: { right: "14%", top: "9%" }, size: 52, opacity: 1, delay: 0.3 },
  { id: "github", pos: { right: "3%", top: "20%" }, size: 46, opacity: 0.75, delay: 0.9 },
  { id: "figma", pos: { right: "2%", top: "40%" }, size: 54, opacity: 0.85, delay: 0.5 },
  { id: "spotify", pos: { right: "3%", top: "57%" }, size: 42, opacity: 0.55, delay: 1.4 },
  { id: "tailwind", pos: { right: "4%", top: "73%" }, size: 48, opacity: 0.7, delay: 0.7 },
  { id: "linkedin", pos: { right: "17%", bottom: "14%" }, size: 52, opacity: 0.85, delay: 0.2 },
  { id: "x", pos: { right: "5%", bottom: "7%" }, size: 40, opacity: 0.6, delay: 1.1 },
];

function FloatingIconCard({
  id, pos, size, opacity, delay,
}: { id: string; pos: React.CSSProperties; size: number; opacity: number; delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ ...pos, opacity, zIndex: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.8 + delay * 0.7, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 6px 24px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        {iconMap[id]}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const scrollToWork = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: BG, minHeight: "100vh" }}
    >
      {/* Floating icon field */}
      {floatingCards.map((card) => (
        <FloatingIconCard key={card.id} {...card} />
      ))}

      {/* Toolbar — top-left */}
      <div className="absolute top-6 left-6 z-20">
        <div
          className="flex items-center gap-1 px-3 py-2 rounded-full"
          style={{ background: CARBON }}
        >
          <button
            className="flex items-center justify-center p-1.5 rounded-full transition-colors"
            style={{ color: "rgba(255,255,255,0.55)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
          >
            <Maximize2 size={13} />
          </button>
          <button
            className="flex items-center justify-center p-1.5 rounded-full transition-colors"
            style={{ color: "rgba(255,255,255,0.55)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
          >
            <Moon size={13} />
          </button>
          <button
            className="flex items-center justify-center p-1.5 rounded-full transition-colors"
            style={{ color: "rgba(255,255,255,0.55)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div
        className="relative z-10 max-w-[1440px] mx-auto px-16 flex items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="flex items-center gap-20 w-full py-28">
          {/* ── LEFT ── */}
          <div className="flex-1 max-w-[580px]">
            {/* Status pill */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8"
              style={{ background: CREAM, border: `1px solid ${BORDER}` }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#22C55E" }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12.5px",
                  color: SLATE,
                  fontWeight: 500,
                }}
              >
                Available for new projects
              </span>
            </div>

            {/* Heading */}
            <h1
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(52px, 5.5vw, 80px)",
                lineHeight: 1.04,
                fontWeight: 800,
                color: CARBON,
                letterSpacing: "-0.03em",
              }}
            >
              Mochamad<br />
              Syukur<br />
              that{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: SLATE,
                  fontWeight: 700,
                }}
              >
                move
              </em>{" "}
              people.
            </h1>

            {/* Sub-line */}
            <p
              className="mt-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "18px",
                lineHeight: 1.65,
                color: SLATE,
                maxWidth: "480px",
              }}
            >
              I'm{" "}
              <strong style={{ color: CARBON, fontWeight: 600 }}>
                Alex Chen
              </strong>{" "}
              — a full-stack developer who bridges clean engineering with thoughtful design.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={scrollToWork}
                className="flex items-center gap-2 transition-all"
                style={{
                  background: LIME,
                  color: CARBON,
                  padding: "15px 28px",
                  borderRadius: "14px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b8f020")}
                onMouseLeave={(e) => (e.currentTarget.style.background = LIME)}
              >
                View My Work
                <ArrowRight size={16} />
              </button>
              <button
                onClick={scrollToContact}
                className="flex items-center gap-2 transition-all"
                style={{
                  background: "transparent",
                  color: CARBON,
                  padding: "15px 28px",
                  borderRadius: "14px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  border: `1.5px solid ${BORDER}`,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = CARBON;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = BORDER;
                }}
              >
                <Download size={15} />
                Download CV
              </button>
            </div>

            {/* Micro stats */}
            <div className="flex items-center gap-8 mt-14">
              {[
                { value: "6+", label: "Years experience" },
                { value: "40+", label: "Projects shipped" },
                { value: "20+", label: "Happy clients" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontSize: "28px",
                      fontWeight: 800,
                      color: CARBON,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12.5px",
                      color: SLATE,
                      marginTop: "4px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Photo card ── */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              {/* Main portrait card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                style={{
                  width: "clamp(320px, 30vw, 440px)",
                  aspectRatio: "3/4",
                  borderRadius: "32px",
                  overflow: "hidden",
                  boxShadow:
                    "0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
                }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&w=600&q=80"
                  alt="Alex Chen — developer portrait"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating status badge */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute"
                style={{
                  bottom: "-18px",
                  left: "-20px",
                  background: "#fff",
                  padding: "12px 18px",
                  borderRadius: "18px",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: `1px solid ${BORDER}`,
                }}
              >
                <span
                  className="relative flex h-2.5 w-2.5"
                >
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: "#22C55E" }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2.5 w-2.5"
                    style={{ background: "#22C55E" }}
                  />
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: CARBON,
                  }}
                >
                  Available for work
                </span>
              </motion.div>

              {/* Small accent card — top-right overlap */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute"
                style={{
                  top: "-16px",
                  right: "-20px",
                  background: LIME,
                  padding: "10px 14px",
                  borderRadius: "14px",
                  boxShadow: "0 6px 20px rgba(198,255,52,0.35)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    fontSize: "13px",
                    color: CARBON,
                    letterSpacing: "-0.02em",
                  }}
                >
                  SF, CA 🌉
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity: 0.45 }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: CARBON,
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "28px",
            background: CARBON,
          }}
        />
      </div>
    </section>
  );
}
