import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const CARBON = "#171717";
const LIME = "#C6FF34";
const SLATE = "#707070";
const BORDER = "#EAEAEA";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(250,250,247,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-16 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: "20px",
            color: CARBON,
            letterSpacing: "-0.03em",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          AC
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: LIME,
              marginLeft: "3px",
              verticalAlign: "super",
            }}
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: SLATE,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = CARBON)}
              onMouseLeave={(e) => (e.currentTarget.style.color = SLATE)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo("#contact")}
          className="hidden md:flex items-center"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13.5px",
            fontWeight: 600,
            color: CARBON,
            background: LIME,
            border: "none",
            borderRadius: "10px",
            padding: "9px 20px",
            cursor: "pointer",
            transition: "background 0.15s",
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#b8f020")}
          onMouseLeave={(e) => (e.currentTarget.style.background = LIME)}
        >
          Get in touch
        </button>

        {/* Mobile toggle */}
        <button
          className="flex md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: CARBON }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(250,250,247,0.97)",
            backdropFilter: "blur(16px)",
            borderTop: `1px solid ${BORDER}`,
            padding: "16px 24px 24px",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left py-3"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                color: CARBON,
                background: "none",
                border: "none",
                borderBottom: `1px solid ${BORDER}`,
                cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="mt-4 w-full"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              color: CARBON,
              background: LIME,
              border: "none",
              borderRadius: "12px",
              padding: "13px",
              cursor: "pointer",
            }}
          >
            Get in touch
          </button>
        </div>
      )}
    </nav>
  );
}
