/**
 * Hero.tsx — Cover Notebook Section + Floating Tech Stack Icons (21st.dev Framer Motion)
 * Menggabungkan desain buku catatan faquloh.site/classic.html dengan:
 *  - Animasi teks bergelombang (wave) per-huruf pada nama
 *  - Efek hover stabilo kuning slide dari kiri ke kanan pada nama
 *  - Background floating tech stack icons berfisika pegas dari 21st.dev
 */

import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroData from '../../content/singletons/hero.json';
import { siteConfig } from '../../config/site';
import { FloatingIconsBackground } from '@/components/ui/floating-icons-hero-section';
import { techStackIcons } from '@/components/ui/floating-icons-hero-demo';

gsap.registerPlugin(ScrollTrigger);

/** Teks dengan penanda **stabilo** → <mark class="hl">. */
function withHighlights(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, index) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <mark className="hl" key={index}>
          {part.slice(2, -2)}
        </mark>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      ),
    );
}

/**
 * Angka statistik yang menghitung naik setelah layar pembuka selesai.
 * Nilai final tetap dirender di SSR; animasi baru berjalan setelah hydration.
 */
function StatValue({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let tween: ReturnType<typeof gsap.to> | undefined;
    let observer: MutationObserver | undefined;

    const start = () => {
      const counter = { n: 0 };
      el.textContent = `0${suffix}`;
      tween = gsap.to(counter, {
        n: value,
        duration: 1,
        ease: 'power3.out',
        onUpdate: () => {
          el.textContent = `${Math.round(counter.n)}${suffix}`;
        },
        onComplete: () => {
          el.textContent = `${value}${suffix}`;
        },
      });
    };

    const root = document.documentElement;
    if (root.classList.contains('is-booting')) {
      observer = new MutationObserver(() => {
        if (!root.classList.contains('is-booting')) {
          observer?.disconnect();
          start();
        }
      });
      observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    } else {
      start();
    }

    return () => {
      observer?.disconnect();
      tween?.kill();
    };
  }, [value, suffix]);

  return (
    <dd ref={ref}>
      {value}
      {suffix}
    </dd>
  );
}

export default function Hero() {
  const rawLines = (heroData.headline || 'MOCHAMAD\nSYUKUR')
    .replace(/\./g, '')
    .trim()
    .split('\n');
  const line1 = (rawLines[0] || 'MOCHAMAD').toUpperCase();
  const line2 = (rawLines[1] || 'SYUKUR').toUpperCase();

  const line1Chars = line1.split('');
  const line2Chars = line2.split('');

  // Parallax ikon techstack. Dipasang setelah hydration supaya GSAP memegang
  // node yang benar-benar dipakai React (bukan node SSR yang bisa diganti).
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layer = document.querySelector<HTMLElement>('[data-hero-float]');
    const stage = document.querySelector<HTMLElement>('.hero-stage');
    if (!layer || !stage) return;

    const tween = gsap.fromTo(
      layer,
      { yPercent: 0 },
      {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const stats = heroData.stats && heroData.stats.length >= 3
    ? heroData.stats
    : [
        { number: 2, suffix: '+', label: 'Years Experience' },
        { number: 10, suffix: '+', label: 'Projects Live' },
        { number: 6, suffix: '', label: 'Certifications' },
      ];

  const portraitSrc = heroData.portrait || '/images/hero.jpeg';
  const portraitFallback = '/images/profil.jpeg';

  return (
    <>
      <section className="hero-stage" id="top">
        {/* 21st.dev Floating Tech Stack Icons with Framer Motion spring repulsion */}
        <FloatingIconsBackground icons={techStackIcons} />

        <div className="hero">
          <div className="hero__copy">
            {/* Top of the notebook sheet: printed label, hand-written value */}
            <dl className="masthead" style={{ '--i': 0 } as React.CSSProperties}>
              <div className="masthead__cell">
                <dt className="masthead__k">{heroData.masthead?.currentlyLabel || 'Currently'}</dt>
                <dd className="masthead__v">{heroData.masthead?.currently || 'USB YPKP Bandung'}</dd>
              </div>
              <div className="masthead__cell">
                <dt className="masthead__k">{heroData.masthead?.sinceLabel || 'Since'}</dt>
                <dd className="masthead__v">{heroData.masthead?.since || 'Oct 2025'}</dd>
              </div>
              <div className="masthead__cell">
                <dt className="masthead__k">{heroData.masthead?.focusLabel || 'Focus'}</dt>
                <dd className="masthead__v">{heroData.masthead?.focus || 'Frontend, Astro, Network'}</dd>
              </div>
            </dl>

            <p className="hero__hand" style={{ '--i': 1 } as React.CSSProperties}>
              {heroData.handIntro || 'my name is'}
            </p>

            <h1
              className="hero__name is-split"
              style={{ '--i': 2 } as React.CSSProperties}
              aria-label={`${line1} ${line2}`}
            >
              <span className="hero__name-l1" aria-hidden="true">
                {line1Chars.map((ch, idx) => (
                  <span
                    key={`l1-${idx}`}
                    className="ch"
                    style={{ '--ci': idx } as React.CSSProperties}
                  >
                    {ch.trim() ? <span className="ch__i">{ch}</span> : '\u00A0'}
                  </span>
                ))}
              </span>
              <span className="hero__name-l2" aria-hidden="true">
                {line2Chars.map((ch, idx) => (
                  <span
                    key={`l2-${idx}`}
                    className="ch"
                    style={{ '--ci': line1Chars.length + idx } as React.CSSProperties}
                  >
                    {ch.trim() ? <span className="ch__i">{ch}</span> : '\u00A0'}
                  </span>
                ))}
              </span>
            </h1>

            <p className="hero__meta" style={{ '--i': 3 } as React.CSSProperties}>
              <span className="chip chip--ink">{heroData.roleLabel || 'Web Developer'}</span>
              <span className="badge-wrap">
                <span className="badge">
                  <span className="badge__dot" aria-hidden="true"></span>
                  {heroData.statusLabel || 'Available for new opportunities'}
                </span>
                <svg
                  className="doodle doodle--circle"
                  data-reveal suppressHydrationWarning
                  style={{ '--i': 5 } as React.CSSProperties}
                  viewBox="0 0 180 70"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use href="#d-circle" />
                </svg>
              </span>
              <span className="hero__place">{heroData.location || 'Indonesia'}</span>
            </p>

            <p className="hero__lede" style={{ '--i': 4 } as React.CSSProperties}>
              {withHighlights(
                heroData.subheadline ||
                  siteConfig.tagline ||
                  'I craft clean interfaces & teach computer networks by day, and **build web apps that feel alive** by night.',
              )}
            </p>

            <p className="hero__cta" style={{ '--i': 5 } as React.CSSProperties}>
              <a
                className="btn btn--primary"
                href={siteConfig.resumeUrl}
                download={siteConfig.resumeUrl.startsWith('/') ? true : undefined}
              >
                {heroData.primaryCtaLabel || 'DOWNLOAD CV'}
              </a>
              <a className="btn btn--ghost" href={heroData.secondaryCtaHref || '#projects'}>
                {heroData.secondaryCtaLabel || 'SEE MY WORK'}
              </a>
            </p>
          </div>

          <div className="hero__collage">
            <div className="collage__photo">
              <figure className="avatar" style={{ '--i': 1 } as React.CSSProperties}>
                <span className="tape tape--top" aria-hidden="true"></span>
                <img
                  src={portraitSrc}
                  width={640}
                  height={640}
                  alt={heroData.portraitAlt || 'Potret Mochamad Syukur'}
                  fetchPriority="high"
                  onError={(event) => {
                    const img = event.currentTarget;
                    // Jangan biarkan foto hero kosong kalau file CMS terhapus
                    // atau path-nya berubah. Pakai foto profil yang tersedia.
                    if (img.dataset.fallbackApplied === 'true') return;
                    img.dataset.fallbackApplied = 'true';
                    img.src = portraitFallback;
                  }}
                />
                <figcaption>{heroData.portraitMeta || 'Indonesia, 2026'}</figcaption>
              </figure>
              <svg
                className="doodle doodle--spark"
                data-reveal suppressHydrationWarning
                style={{ '--i': 5 } as React.CSSProperties}
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <use href="#d-spark" />
              </svg>
              <svg
                className="doodle doodle--spark-sm"
                data-reveal suppressHydrationWarning
                style={{ '--i': 6 } as React.CSSProperties}
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <use href="#d-spark-sm" />
              </svg>
            </div>

            <svg
              className="doodle doodle--arrow"
              data-reveal suppressHydrationWarning
              style={{ '--i': 4 } as React.CSSProperties}
              viewBox="0 0 72 48"
              aria-hidden="true"
              focusable="false"
            >
              <use href="#d-arrow" />
            </svg>

            <div className="collage__stats">
              <aside className="statcard" style={{ '--i': 2 } as React.CSSProperties}>
                <span className="tape tape--corner" aria-hidden="true"></span>
                <dl className="statcard__list">
                  {stats.map((s) => (
                    <div className="statcard__row" key={s.label}>
                      <dt>{s.label}</dt>
                      <StatValue value={s.number} suffix={s.suffix || ''} />
                    </div>
                  ))}
                </dl>
              </aside>
              <p
                className="scrap-note"
                data-reveal suppressHydrationWarning
                style={{ '--i': 3 } as React.CSSProperties}
              >
                {heroData.note || 'ps. everything is crafted with care & detail'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TAPE BAND ============ */}
      <div className="marquee" aria-hidden="true">
        <span className="marquee__track">
          <span className="marquee__run">
            {(heroData.marquee && heroData.marquee.length
              ? heroData.marquee
              : ['Astro', 'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'MikroTik MTCNA', 'Computer Network', 'UI/UX Design', 'Figma', 'PostgreSQL', 'Vercel', 'Git']
            ).map((item) => (
              <span key={`a-${item}`}>{item}</span>
            ))}
          </span>
          <span className="marquee__run">
            {(heroData.marquee && heroData.marquee.length
              ? heroData.marquee
              : ['Astro', 'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'MikroTik MTCNA', 'Computer Network', 'UI/UX Design', 'Figma', 'PostgreSQL', 'Vercel', 'Git']
            ).map((item) => (
              <span key={`b-${item}`}>{item}</span>
            ))}
          </span>
        </span>
      </div>
    </>
  );
}
