import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Send, Mail, MapPin } from "lucide-react";

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

export function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: "#fff",
    border: `1.5px solid ${focused === field ? CARBON : BORDER}`,
    borderRadius: "14px",
    padding: "16px 18px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "15px",
    color: CARBON,
    outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
  });

  return (
    <section
      id="contact"
      style={{ background: CREAM, padding: "120px 0" }}
    >
      <div className="max-w-[1440px] mx-auto px-16" ref={ref}>
        {/* Centered card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            background: "#fff",
            borderRadius: "28px",
            border: `1px solid ${BORDER}`,
            padding: "72px 80px",
            maxWidth: "760px",
            margin: "0 auto",
            boxShadow: "0 16px 56px rgba(0,0,0,0.06)",
          }}
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div style={{ width: "40px", height: "1px", background: BORDER }} />
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
              Get in touch
            </span>
            <div style={{ width: "40px", height: "1px", background: BORDER }} />
          </div>

          {/* Heading */}
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(34px, 3.5vw, 52px)",
              fontWeight: 800,
              color: CARBON,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Let's build something<br />
            <em style={{ fontStyle: "italic", color: SLATE }}>worth remembering.</em>
          </h2>

          <p
            className="text-center mb-10"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              color: SLATE,
              lineHeight: 1.7,
            }}
          >
            Whether it's a full-time role, a freelance project, or just a great conversation — my inbox is open.
          </p>

          {/* Contact info strip */}
          <div className="flex items-center justify-center gap-8 mb-10">
            <div className="flex items-center gap-2">
              <Mail size={14} style={{ color: SLATE }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13.5px",
                  color: SLATE,
                }}
              >
                hello@alexchen.dev
              </span>
            </div>
            <div
              style={{ width: "1px", height: "16px", background: BORDER }}
            />
            <div className="flex items-center gap-2">
              <MapPin size={14} style={{ color: SLATE }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13.5px",
                  color: SLATE,
                }}
              >
                San Francisco, CA
              </span>
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "rgba(198,255,52,0.15)",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontSize: "28px" }}>✓</span>
              </div>
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: CARBON,
                  marginBottom: "8px",
                }}
              >
                Message sent!
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  color: SLATE,
                }}
              >
                I'll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Name + Email row */}
              <div className="flex gap-4">
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: CARBON,
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    style={inputStyle("name")}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: CARBON,
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    style={inputStyle("email")}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: CARBON,
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project, role, or idea..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  rows={5}
                  style={{
                    ...inputStyle("message"),
                    resize: "none",
                    lineHeight: 1.65,
                  }}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2.5 w-full mt-2"
                style={{
                  background: LIME,
                  color: CARBON,
                  border: "none",
                  borderRadius: "14px",
                  padding: "17px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  cursor: "pointer",
                  transition: "background 0.15s",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b8f020")}
                onMouseLeave={(e) => (e.currentTarget.style.background = LIME)}
              >
                Send Message
                <Send size={15} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
