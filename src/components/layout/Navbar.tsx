'use client';

import React, { useEffect, useState } from 'react';
import { navItems } from '../../config/navigation';
import { siteConfig } from '../../config/site';

/**
 * Navbar.tsx — React Island (client:load)
 * Floating "island" navbar — pill-shaped, centered, backdrop blur.
 *
 * Dari Organic Editorial Design:
 *  - Fixed top-6, centered, max-w-[800px], rounded-full
 *  - bg-white/80 + backdrop-blur-xl
 *  - Border border-[#EAEAEA]
 *  - Logo kiri, nav tengah, CTA kanan
 *  - Active section indicator
 *  - Mobile hamburger
 */
export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // ─── Active section detection ───────────────────────────────────────────
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ─── Smooth scroll handler ──────────────────────────────────────────────
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const lenis = (window as unknown as Window & { lenis?: { scrollTo: (el: Element) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* ─── FLOATING ISLAND NAV ─────────────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 48px)',
          maxWidth: '800px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid #EAEAEA',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 1.5rem',
          zIndex: 50,
        }}
      >
        {/* Logo — monogram mark, no text */}
        <a
          href="/"
          aria-label={`${siteConfig.name} - Kembali ke atas`}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: '#C6FF34',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: '0.75rem',
            color: '#171717',
            letterSpacing: '-0.04em',
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'transform 0.15s ease',
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          &lt;/&gt;
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-6 items-center" role="list">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    text-sm font-body font-medium
                    transition-colors duration-150
                    ${isActive
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          {/* "Let's Talk" button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="
              hidden md:inline-flex items-center gap-1.5
              px-5 py-2 text-sm font-medium font-body
              bg-accent hover:bg-accent-hover
              text-text-primary
              rounded-full
              transition-all duration-150
              hover:scale-105
            "
          >
            Let&apos;s Talk
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{isMobileOpen ? 'Close' : 'Menu'}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              {isMobileOpen ? (
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                />
              ) : (
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ─── MOBILE DROPDOWN ─────────────────────────────────────────────── */}
      {isMobileOpen && (
        <div
          id="mobile-menu"
          style={{
            position: 'fixed',
            top: '88px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 48px)',
            maxWidth: '800px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid #EAEAEA',
            borderRadius: '1.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            zIndex: 40,
            padding: '1rem',
          }}
        >
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="
                    block px-4 py-3 text-sm font-body font-medium
                    text-text-secondary hover:text-text-primary
                    hover:bg-bg-secondary rounded-xl
                    transition-all duration-150
                  "
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2 pt-2 border-t border-border">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="
                  block text-center px-4 py-3 text-sm font-medium font-body
                  bg-accent text-text-primary rounded-xl
                  transition-colors duration-150
                "
              >
                Let&apos;s Talk
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;