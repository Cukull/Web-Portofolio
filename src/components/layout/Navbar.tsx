'use client';

import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navItems } from '../../config/navigation';
import { siteConfig } from '../../config/site';

gsap.registerPlugin(ScrollTrigger);

/**
 * Navbar.tsx — Sticky Notebook Header
 * Persis seperti referensi faquloh.site/classic.html:
 *  - Brand kiri: bintang berputar + teks Pixelify Sans
 *  - Links tengah/kanan: Space Mono uppercase dengan animasi garis bawah
 *  - Tombol NIGHT / DAY mode toggle (label diatur lewat CSS)
 *  - Reading progress bar di bawah header (GSAP, setelah hydration)
 */
interface NavbarProps {
  /** False on standalone pages (e.g. project detail) so hash links point back home. */
  home?: boolean;
}

export function Navbar({ home = true }: NavbarProps) {
  const progressRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: 0.2,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const sectionHref = (href: string) => {
    if (!href.startsWith('#')) return href;
    return home ? href : `/${href}`;
  };

  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href={sectionHref('#top')} aria-label={`${siteConfig.name}, home`}>
          <span className="nav__star" aria-hidden="true">&#9733;</span>
          <span className="nav__brand-text">{siteConfig.shortName}</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {navItems.map((item, idx) => (
            <a
              key={item.href}
              href={sectionHref(item.href)}
              className={`nav__link${home && idx === 0 ? ' is-current' : ''}`}
              aria-current={home && idx === 0 ? 'true' : undefined}
              suppressHydrationWarning
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button className="theme-toggle" type="button" id="themeToggle">
          <span className="theme-toggle__label">
            <span className="theme-toggle__night">NIGHT</span>
            <span className="theme-toggle__day">DAY</span>
          </span>
        </button>
      </div>
      <span ref={progressRef} className="nav__progress" aria-hidden="true"></span>
    </header>
  );
}

export default Navbar;
