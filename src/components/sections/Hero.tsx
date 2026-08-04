/**
 * Hero.tsx
 * Main hero section — menggunakan FloatingIcons untuk tech icon chips
 * dengan cursor repulsion physics.
 */

import { useEffect, useState } from 'react';
import FloatingIcons from './FloatingIcons';
import CountUp from '../ui/CountUp';

const LIME   = '#C6FF34';
const CARBON = '#171717';
const SLATE  = '#707070';
const CREAM  = '#F5F5F0';
const BORDER = '#EAEAEA';
const BG     = '#FAFAF7';

/* ── Ping dot ──────────────────────────────────────────────────── */
function PingDot({ color = '#22C55E' }: { color?: string }) {
  return (
    <span style={{ position:'relative', display:'inline-flex', width:10, height:10, flexShrink:0 }}>
      <span style={{
        position:'absolute', inset:0, borderRadius:'50%', background:color,
        animation:'hero-ping 1.4s cubic-bezier(0,0,0.2,1) infinite',
      }}/>
      <span style={{
        position:'relative', display:'inline-flex',
        borderRadius:'50%', width:10, height:10, background:color,
      }}/>
    </span>
  );
}

/* ── Main Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const stats = [
    { number: 2,  suffix: '+', label: 'Tahun Pengalaman' },
    { number: 10, suffix: '+', label: 'Project Selesai'   },
    { number: 5,  suffix: '+', label: 'Happy Clients'     },
  ];

  return (
    <>
      <style>{`
        @keyframes hero-ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes hero-scroll-line {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>

      <section
        id="hero"
        style={{
          background: BG,
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ── Floating tech icons with cursor repulsion ── */}
        <FloatingIcons />

        {/* ── Main content (above icons) ── */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 4vw, 4rem)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(2rem, 5vw, 5rem)',
            width: '100%',
            paddingTop: '7rem',
            paddingBottom: '5rem',
            flexWrap: 'wrap',
          }}>

            {/* ── LEFT copy ── */}
            <div style={{ flex: '1 1 340px', maxWidth: 580 }}>

              {/* Status pill */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 9999, marginBottom: 32,
                background: CREAM, border: `1px solid ${BORDER}`,
              }}>
                <PingDot />
                <span style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 12.5, color: SLATE, fontWeight: 500,
                }}>
                  Available for new projects
                </span>
              </div>

              {/* Heading */}
              <h1 style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontSize: 'clamp(44px, 5.5vw, 80px)',
                lineHeight: 1.04,
                fontWeight: 800,
                color: CARBON,
                letterSpacing: '-0.03em',
                margin: 0,
              }}>
                Crafting<br />
                digital products<br />
                that{' '}
                <em style={{ fontStyle: 'italic', color: SLATE, fontWeight: 700 }}>
                  move
                </em>{' '}
                people.
              </h1>

              {/* Sub-line */}
              <p style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 17,
                lineHeight: 1.65,
                color: SLATE,
                maxWidth: 460,
                marginTop: 24,
                marginBottom: 0,
              }}>
                Saya{' '}
                <strong style={{ color: CARBON, fontWeight: 600 }}>
                  Mochamad Syukur
                </strong>{' '}
                — Web Developer yang menjembatani engineering bersih dengan desain yang thoughtful.
              </p>

              {/* CTAs */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 40,
                flexWrap: 'wrap',
              }}>
                <button
                  id="hero-view-work"
                  data-spark-color="#171717"
                  onClick={() => scrollTo('projects')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: LIME, color: CARBON,
                    padding: '14px 26px', borderRadius: 14,
                    fontFamily: "'Inter',sans-serif", fontWeight: 600,
                    fontSize: 15, border: 'none', cursor: 'pointer',
                    letterSpacing: '-0.01em', transition: 'background 0.15s, transform 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#b8f020';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = LIME;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  View My Work
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>

                <a
                  href="/cv.pdf"
                  download
                  id="hero-download-cv"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'transparent', color: CARBON,
                    padding: '14px 26px', borderRadius: 14,
                    fontFamily: "'Inter',sans-serif", fontWeight: 600,
                    fontSize: 15, border: `1.5px solid ${BORDER}`,
                    cursor: 'pointer', letterSpacing: '-0.01em',
                    textDecoration: 'none', transition: 'border-color 0.15s, transform 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = CARBON;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Download CV
                </a>
              </div>

              {/* Stats row */}
              <div style={{
                display: 'flex', alignItems: 'center',
                gap: 'clamp(1.5rem, 4vw, 2.5rem)',
                marginTop: 52, flexWrap: 'wrap',
              }}>
                {stats.map(s => (
                  <div key={s.label}>
                    <div style={{
                      fontFamily: "'Bricolage Grotesque',sans-serif",
                      fontSize: 28, fontWeight: 800,
                      color: CARBON, lineHeight: 1,
                    }}>
                      <CountUp
                        from={0}
                        to={s.number}
                        suffix={s.suffix}
                        duration={1.8}
                      />
                    </div>
                    <div style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 12.5, color: SLATE, marginTop: 4,
                    }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Photo card ── */}
            <div style={{
              flex: '1 1 280px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <div style={{ position: 'relative' }}>

                {/* Portrait card */}
                <div style={{
                  width: 'clamp(260px, 28vw, 400px)',
                  aspectRatio: '3/4',
                  borderRadius: 32,
                  overflow: 'hidden',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 0.8s ease, transform 0.8s ease',
                }}>
                  {/* Gambar Hero yang ditambahkan */}
                  <img
                    src="/images/hero.jpeg"
                    alt="Foto Profil Mochamad Syukur"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* "Available for work" badge */}
                <div style={{
                  position: 'absolute', bottom: -18, left: -20,
                  background: '#fff', padding: '12px 18px',
                  borderRadius: 18,
                  boxShadow: '0 8px 28px rgba(0,0,0,0.10)',
                  display: 'flex', alignItems: 'center', gap: 8,
                  border: `1px solid ${BORDER}`,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateX(0)' : 'translateX(-12px)',
                  transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
                }}>
                  <PingDot />
                  <span style={{
                    fontFamily: "'Inter',sans-serif",
                    fontWeight: 500, fontSize: 13, color: CARBON,
                  }}>
                    Available for work
                  </span>
                </div>

                {/* Location badge */}
                <div style={{
                  position: 'absolute', top: -16, right: -20,
                  background: LIME, padding: '10px 14px',
                  borderRadius: 14,
                  boxShadow: '0 6px 20px rgba(198,255,52,0.35)',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'scale(1)' : 'scale(0.8)',
                  transition: 'opacity 0.5s ease 0.7s, transform 0.5s ease 0.7s',
                }}>
                  <div style={{
                    fontFamily: "'Bricolage Grotesque',sans-serif",
                    fontWeight: 800, fontSize: 13,
                    color: CARBON, letterSpacing: '-0.02em',
                  }}>
                    🇮🇩 Indonesia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 8, opacity: 0.4, zIndex: 10,
        }}>
          <span style={{
            fontFamily: "'Inter',sans-serif", fontSize: 10,
            letterSpacing: '0.1em', color: CARBON, textTransform: 'uppercase',
          }}>
            Scroll
          </span>
          <div style={{
            width: 1, height: 28, background: CARBON,
            animation: 'hero-scroll-line 1.8s ease-in-out infinite',
          }}/>
        </div>
      </section>
    </>
  );
}
