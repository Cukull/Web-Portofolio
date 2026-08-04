/**
 * OrbitAnimation.tsx
 * Animasi icon React ecosystem berputar di orbit konsentris.
 * Tiga lingkaran orbit dengan kecepatan berbeda, ikon tidak ikut berputar.
 * Digunakan di section Contact sebelah kanan form.
 */

import { useEffect, useRef } from 'react';

/* ── SVG Icons (original brand colors) ─────────────────────────── */

const IcoReact = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="2.8" fill="#61DAFB"/>
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.4" fill="none"/>
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.4" fill="none" transform="rotate(60 16 16)"/>
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.4" fill="none" transform="rotate(120 16 16)"/>
  </svg>
);

const IcoNextJS = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 8h-5v11.5L20 8h-5zm2 8.5V24h5L17 16.5z" fill="#000"/>
    <circle cx="16" cy="16" r="14" fill="none" stroke="#000" strokeWidth="1.5"/>
  </svg>
);

const IcoTS = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="3" fill="#3178C6"/>
    <path d="M18 18.4v1.5c.25.12.55.22.9.28.35.07.72.1 1.1.1.37 0 .73-.04 1.06-.1.34-.08.63-.2.88-.38.25-.18.45-.4.6-.7.15-.28.22-.64.22-1.04 0-.3-.05-.57-.14-.8-.1-.22-.24-.42-.43-.6-.2-.17-.43-.33-.7-.47-.27-.14-.57-.28-.9-.42-.24-.1-.45-.2-.6-.3-.16-.1-.29-.2-.38-.3-.1-.1-.16-.2-.2-.3-.05-.1-.07-.2-.07-.33 0-.1.02-.2.07-.28.05-.1.12-.17.2-.23.1-.07.2-.12.34-.16.14-.04.3-.06.46-.06.14 0 .27.01.4.03.13.02.26.05.38.1.13.05.24.1.35.18.1.07.2.15.27.23v-1.4c-.22-.08-.46-.14-.73-.18-.27-.04-.56-.06-.87-.06-.36 0-.7.05-1.02.14-.32.1-.6.24-.84.43-.24.2-.43.44-.57.73-.14.3-.21.64-.21 1.03 0 .52.14.96.42 1.32.28.36.7.66 1.28.9.26.1.5.2.7.32.2.1.38.22.52.34.14.12.25.25.33.4.08.14.12.3.12.48 0 .12-.02.23-.06.33-.04.1-.1.2-.2.27-.1.08-.2.14-.36.18-.15.04-.32.06-.52.06-.33 0-.65-.06-.95-.2-.3-.13-.55-.32-.74-.56zm-7-5.5H8v-1.4h9v1.4h-3v9h-2v-9z" fill="#fff"/>
  </svg>
);

const IcoNode = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4L5 10v12l11 6 11-6V10L16 4z" fill="none" stroke="#339933" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M16 4v18M5 10l11 6M27 10l-11 6" stroke="#339933" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const IcoVite = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M29 5L16.5 27 10 16l5-3L29 5z" fill="#BD34FE"/>
    <path d="M3 5l13.5 22L10 16l5-3L3 5z" fill="#41D1FF"/>
  </svg>
);

const IcoTailwind = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 13c1-4.5 3.7-6.5 7.5-6.5 5.5 0 6 4.5 9.5 5-1 4.5-3.7 6.5-7.5 6.5-5.5 0-6-4.5-9.5-5zm-2 8c1-4.5 3.7-6.5 7.5-6.5 5.5 0 6 4.5 9.5 5-1 4.5-3.7 6.5-7.5 6.5-5.5 0-6-4.5-9.5-5z" fill="#06B6D4"/>
  </svg>
);

const IcoPrisma = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 26l8-22 13 17-21 5z" fill="none" stroke="#0C344B" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M13 4l-8 22 21-5L13 4z" fill="#0C344B" opacity="0.15"/>
    <path d="M13 4L5 26" stroke="#0C344B" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IcoRedux = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.5 7.5C18 5 14 4.5 11 6.5c-2 1.4-3.2 3.5-3.2 5.8 0 .8.1 1.6.4 2.4-1.8.5-3.2 2-3.2 3.8 0 2.2 1.8 4 4 4h1.2c.5 1.5 1.8 2.5 3.3 2.5 1.5 0 2.8-1 3.3-2.5H18c2.5 0 4.5-2 4.5-4.5 0-1.7-1-3.2-2.5-4 .3-.7.5-1.5.5-2.3 0-1.7-.7-3.3-2-4.4" fill="none" stroke="#764ABC" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="17" cy="10" r="1.5" fill="#764ABC"/>
    <circle cx="10" cy="20" r="1.5" fill="#764ABC"/>
    <circle cx="22" cy="19" r="1.5" fill="#764ABC"/>
  </svg>
);

const IcoGraphQL = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="6" r="2.2" fill="#E10098"/>
    <circle cx="26" cy="11.5" r="2.2" fill="#E10098"/>
    <circle cx="26" cy="20.5" r="2.2" fill="#E10098"/>
    <circle cx="16" cy="26" r="2.2" fill="#E10098"/>
    <circle cx="6" cy="20.5" r="2.2" fill="#E10098"/>
    <circle cx="6" cy="11.5" r="2.2" fill="#E10098"/>
    <circle cx="16" cy="16" r="2.5" fill="#E10098"/>
    <path d="M16 6L26 11.5M26 11.5V20.5M26 20.5L16 26M16 26L6 20.5M6 20.5V11.5M6 11.5L16 6" stroke="#E10098" strokeWidth="1.3" fill="none"/>
    <path d="M16 6L6 20.5M16 6L26 20.5M6 11.5L26 11.5M6 20.5L26 11.5M16 26L6 11.5M16 26L26 11.5" stroke="#E10098" strokeWidth="0.6" fill="none" opacity="0.35"/>
  </svg>
);

const IcoDocker = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 16h3v3H7zM11 16h3v3h-3zM15 16h3v3h-3zM19 16h3v3h-3zM11 12h3v3h-3zM15 12h3v3h-3zM19 12h3v3h-3zM15 8h3v3h-3z" fill="#2496ED"/>
    <path d="M28 16.5c-.4-.3-1.2-.4-1.8-.3-.1-.8-.6-1.5-1.2-1.9l-.4-.2-.3.4c-.4.7-.5 1.7-.3 2.5-.4.2-.9.3-1.4.3H4.5c-.3 1.2 0 2.5.7 3.5.7 1 1.8 1.7 3.1 2 1.4.3 2.9.4 4.3.2.8 0 1.7-.2 2.4-.4 1-.3 1.9-.9 2.7-1.6.6.4 1.2.6 1.8.6h2l.1-.3c.4-.9.5-2 .3-2.9l-.4-1.2c.5.4 1.1.7 1.7.7.6 0 1.2-.3 1.7-.7.1-.1.3-.3.4-.6l.1-.4-.4-.2z" fill="#2496ED"/>
  </svg>
);

const IcoVercel = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 5L29 27H3L16 5z" fill="#000"/>
  </svg>
);

const IcoVue = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5h5l9 15 9-15h5L16 28 2 5z" fill="#41B883"/>
    <path d="M7 5h5l4 7 4-7h5L16 20 7 5z" fill="#35495E"/>
    <path d="M12 5h8L16 12l-4-7z" fill="#41B883"/>
  </svg>
);

/* ── Orbit ring data ─────────────────────────────────────────────── */
interface OrbitRing {
  size: number;      // diameter in px
  duration: number;  // seconds for one full rotation
  icons: Array<{ id: string; Component: () => JSX.Element; bg: string }>;
}

const RINGS: OrbitRing[] = [
  {
    size: 160,
    duration: 12,
    icons: [
      { id:'react',   Component: IcoReact,   bg: '#E8F9FF' },
      { id:'next',    Component: IcoNextJS,  bg: '#F0F0F0' },
      { id:'ts',      Component: IcoTS,      bg: '#EBF4FF' },
    ],
  },
  {
    size: 270,
    duration: 22,
    icons: [
      { id:'vite',    Component: IcoVite,    bg: '#F3E8FF' },
      { id:'tailwind',Component: IcoTailwind,bg: '#E0FAFA' },
      { id:'redux',   Component: IcoRedux,   bg: '#F0E8FF' },
      { id:'graphql', Component: IcoGraphQL, bg: '#FFE8F5' },
      { id:'node',    Component: IcoNode,    bg: '#E8F5E8' },
    ],
  },
  {
    size: 390,
    duration: 36,
    icons: [
      { id:'docker',  Component: IcoDocker,  bg: '#E5F3FF' },
      { id:'prisma',  Component: IcoPrisma,  bg: '#E8EEF2' },
      { id:'vercel',  Component: IcoVercel,  bg: '#F0F0F0' },
      { id:'vue',     Component: IcoVue,     bg: '#E8F5EE' },
      { id:'docker2', Component: IcoDocker,  bg: '#E5F3FF' },
      { id:'ts2',     Component: IcoTS,      bg: '#EBF4FF' },
      { id:'vite2',   Component: IcoVite,    bg: '#F3E8FF' },
    ],
  },
];

/* ── Orbit ring component (CSS animation, icons counter-rotate) ─── */
function OrbitRing({ ring }: { ring: OrbitRing }) {
  const n = ring.icons.length;
  const r = ring.size / 2; // radius

  return (
    <div
      style={{
        position: 'absolute',
        width:  ring.size,
        height: ring.size,
        borderRadius: '50%',
        border: '2px dashed rgba(23,23,23,0.20)',
        top:  '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: `orbit-spin-${ring.size} ${ring.duration}s linear infinite`,
      }}
    >
      {ring.icons.map((icon, i) => {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
        const x = r + r * Math.cos(angle) - 20; // 20 = half icon size
        const y = r + r * Math.sin(angle) - 20;

        return (
          <div
            key={icon.id}
            style={{
              position: 'absolute',
              left: x,
              top:  y,
              width: 36,
              height: 36,
              borderRadius: 10,
              background: icon.bg,
              padding: 6,
              boxShadow: '0 4px 14px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)',
              /* Counter-rotate so icons always stay upright */
              animation: `orbit-counter-${ring.size} ${ring.duration}s linear infinite`,
            }}
          >
            <icon.Component />
          </div>
        );
      })}
    </div>
  );
}

/* ── Main exported component ────────────────────────────────────── */
export default function OrbitAnimation() {
  const wrapSize = RINGS[RINGS.length - 1].size + 40; // a bit larger than outermost ring

  /* Inject @keyframes once into the document */
  useEffect(() => {
    const id = 'orbit-keyframes';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = RINGS.map(ring => `
      @keyframes orbit-spin-${ring.size} {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to   { transform: translate(-50%, -50%) rotate(360deg); }
      }
      @keyframes orbit-counter-${ring.size} {
        from { transform: rotate(0deg); }
        to   { transform: rotate(-360deg); }
      }
    `).join('');
    document.head.appendChild(style);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width:  wrapSize,
        height: wrapSize,
        flexShrink: 0,
      }}
    >
      {/* Center React logo */}
      <div style={{
        position: 'absolute',
        top:  '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: '#E8F9FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        boxShadow: '0 8px 24px rgba(97,218,251,0.30), 0 2px 8px rgba(0,0,0,0.08)',
        zIndex: 1,
      }}>
        <IcoReact />
      </div>

      {/* Orbit rings */}
      {RINGS.map(ring => (
        <OrbitRing key={ring.size} ring={ring} />
      ))}
    </div>
  );
}
