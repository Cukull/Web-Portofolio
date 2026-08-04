/**
 * FloatingIcons.tsx
 * Tech icon chips yang mengambang di background Hero.
 * Fitur: icon SVG original & tajam, animasi floating independen,
 * cursor repulsion — icon menjauh saat cursor mendekat (< 160px).
 *
 * Digunakan di Hero.tsx sebagai overlay background.
 */

import { useEffect, useRef, useState, useCallback } from 'react';

/* ── Sharp & Original Tech Icon SVGs ──────────────────────────── */

const SvgJS = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#F7DF1E" rx="2"/>
    <path d="M20.8 22.4c.4.7.9 1.2 1.8 1.2.8 0 1.3-.4 1.3-1 0-.7-.5-1-1.4-1.4l-.5-.2c-1.4-.6-2.3-1.3-2.3-2.9 0-1.4 1.1-2.5 2.8-2.5 1.2 0 2.1.4 2.7 1.5l-1.5.9c-.3-.6-.6-.8-1.2-.8s-.9.4-.9.8c0 .6.3.8 1.2 1.2l.5.2c1.6.7 2.5 1.4 2.5 3 0 1.7-1.4 2.6-3.2 2.6-1.8 0-2.9-.9-3.5-2l1.7-1zM12.4 22.6c.3.5.6.9 1.2.9.6 0 1-.2 1-1.2v-6.6h2v6.6c0 2-1.2 2.9-3 2.9-1.6 0-2.5-.8-3-1.8l1.8-1z" fill="#000"/>
  </svg>
);

const SvgTS = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#3178C6" rx="2"/>
    <path d="M18 18.4v1.5c.2.1.5.2.8.3.3.1.7.1 1 .1.3 0 .7 0 1-.1.3-.1.6-.2.8-.4.2-.2.4-.4.5-.7.1-.3.2-.6.2-1 0-.3 0-.6-.1-.8-.1-.2-.2-.4-.4-.6-.2-.2-.4-.3-.6-.4-.2-.1-.5-.3-.8-.4-.2-.1-.4-.2-.5-.3-.1-.1-.2-.2-.3-.3-.1-.1-.1-.2-.1-.4 0-.1 0-.2.1-.3.1-.1.1-.2.2-.2.1-.1.2-.1.3-.2.1 0 .3-.1.4-.1.1 0 .3 0 .4 0 .1 0 .3 0 .4.1.1 0 .3.1.4.1.1.1.3.1.4.2v-1.4c-.2-.1-.5-.1-.7-.2-.3 0-.5-.1-.8-.1-.3 0-.6 0-.9.1-.3.1-.6.2-.8.4-.2.2-.4.4-.6.7-.1.3-.2.6-.2.9 0 .5.1.9.4 1.2.3.3.7.6 1.3.9.2.1.4.2.6.3.2.1.3.2.4.3.1.1.2.2.2.3.1.1.1.2.1.3 0 .1 0 .2-.1.3-.1.1-.1.2-.2.3-.1.1-.2.1-.4.2-.1 0-.3.1-.4.1-.3 0-.6-.1-.9-.2-.3-.1-.5-.3-.7-.5zm-5.5-4.5H14v-1.5H9v1.5h2.5V25H12.5V13.9z" fill="#fff"/>
  </svg>
);

const SvgReact = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#20232A" rx="2"/>
    <circle cx="16" cy="16" r="2.5" fill="#61DAFB"/>
    <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
    <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 16 16)"/>
    <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 16 16)"/>
  </svg>
);

const SvgVue = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#35495E" rx="2"/>
    <polygon points="16,24 6,9 10,9 16,19 22,9 26,9" fill="#41B883"/>
    <polygon points="16,19 12,12 14,12 16,16 18,12 20,12" fill="#35495E"/>
    <polygon points="16,19 12,12 14,12 16,16 18,12 20,12" fill="#41B883" opacity="0.7"/>
    <polygon points="16,24 10,9 12,9 16,17 20,9 22,9" fill="#35495E"/>
    <polygon points="16,22 11,10 13,10 16,16.5 19,10 21,10" fill="#41B883"/>
  </svg>
);

const SvgNextJS = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#000" rx="2"/>
    <path d="M13 11h-4v10h1.8v-3.6l2.2 3.6h2l-2.5-4c1.3-.4 2.2-1.4 2.2-3s-1-3-1.7-3zm-2.2 5V12.4h.5c.8 0 1.4.6 1.4 1.8S12 15.9 11.3 16H10.8zM22 11l-3.5 5.5V21H17v-4.5L13.5 11H15.5l2 3.3 2-3.3H22z" fill="#fff"/>
  </svg>
);

const SvgNodeJS = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#339933" rx="2"/>
    <path d="M16 7L7 12v10l9 5 9-5V12L16 7z" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M16 10.5v11M10.5 13.5L16 16.5 21.5 13.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const SvgPython = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#3776AB" rx="2"/>
    <path d="M16 7c-3.5 0-5 1.2-5 3v2h5v.5h-7c-1.7 0-3 1.3-3 3v4c0 1.7 1.3 3 3 3h1.5v-2.5c0-1.7 1.3-3 3-3h5c1.5 0 2.5-1 2.5-2.5v-5C21 8.2 19.5 7 16 7zm-1.5 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#FFD43B"/>
    <path d="M16 25c3.5 0 5-1.2 5-3v-2h-5v-.5h7c1.7 0 3-1.3 3-3v-4c0-1.7-1.3-3-3-3h-1.5v2.5c0 1.7-1.3 3-3 3h-5c-1.5 0-2.5 1-2.5 2.5v5C11 23.8 12.5 25 16 25zm1.5-2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#fff"/>
  </svg>
);

const SvgGit = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#F05032" rx="2"/>
    <path d="M28.2 14.8L17.2 3.8c-.9-.9-2.4-.9-3.3 0l-2.3 2.3 2.9 2.9c.7-.2 1.5 0 2.1.5.6.6.8 1.4.5 2.1l2.8 2.8c.7-.2 1.5 0 2.1.5.9.9.9 2.4 0 3.3-.9.9-2.4.9-3.3 0-.6-.6-.8-1.5-.5-2.2l-2.6-2.6v6.9c.2.1.4.2.6.4.9.9.9 2.4 0 3.3-.9.9-2.4.9-3.3 0-.9-.9-.9-2.4 0-3.3.2-.2.5-.4.8-.5V13.5c-.3-.1-.6-.3-.8-.5-.6-.6-.8-1.5-.5-2.2L10.4 8l-6.6 6.6c-.9.9-.9 2.4 0 3.3l11 11c.9.9 2.4.9 3.3 0l10-10c.9-.8.9-2.3.1-3.1z" fill="#fff"/>
  </svg>
);

const SvgFigma = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#1E1E1E" rx="2"/>
    <rect x="10" y="7" width="6" height="6" rx="3" fill="#F24E1E"/>
    <rect x="16" y="7" width="6" height="6" rx="3" fill="#FF7262"/>
    <rect x="10" y="13" width="6" height="6" rx="3" fill="#A259FF"/>
    <rect x="16" y="13" width="6" height="6" rx="3" fill="#1ABCFE"/>
    <rect x="10" y="19" width="6" height="6" rx="3" fill="#0ACF83"/>
  </svg>
);

const SvgDocker = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#2496ED" rx="2"/>
    <path d="M8 16h2v2H8zM11 16h2v2h-2zM14 16h2v2h-2zM17 16h2v2h-2zM11 13h2v2h-2zM14 13h2v2h-2zM17 13h2v2h-2zM14 10h2v2h-2z" fill="#fff"/>
    <path d="M25 16.8c-.3-.2-.9-.3-1.4-.2-.1-.6-.5-1.2-1-1.5l-.3-.2-.2.3c-.3.5-.4 1.3-.2 1.9-.3.1-.7.3-1.1.3H5.3c-.2.9 0 1.9.5 2.7.5.8 1.4 1.3 2.4 1.6 1.1.2 2.3.3 3.4.2.6 0 1.3-.1 1.9-.3.8-.2 1.5-.7 2.1-1.2.4.3.9.4 1.4.4h1.5l.1-.2c.3-.7.4-1.5.2-2.2l-.3-.9c.4.3.8.5 1.3.5.5 0 1-.2 1.3-.5.1-.1.2-.3.3-.5l.1-.3-.3-.2z" fill="#fff"/>
  </svg>
);

const SvgTailwind = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#06B6D4" rx="2"/>
    <path d="M9 13c1-4 3.5-6 7-6 5 0 5.5 4 9 4.5-1 4-3.5 6-7 6-5 0-5.5-4-9-4.5zm-2 7.5c1-4 3.5-6 7-6 5 0 5.5 4 9 4.5-1 4-3.5 6-7 6-5 0-5.5-4-9-4.5z" fill="#fff" fillOpacity="0.9"/>
  </svg>
);

const SvgGraphQL = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#E10098" rx="2"/>
    <circle cx="16" cy="7.5" r="2" fill="#fff"/>
    <circle cx="25" cy="12.5" r="2" fill="#fff"/>
    <circle cx="25" cy="19.5" r="2" fill="#fff"/>
    <circle cx="16" cy="24.5" r="2" fill="#fff"/>
    <circle cx="7" cy="19.5" r="2" fill="#fff"/>
    <circle cx="7" cy="12.5" r="2" fill="#fff"/>
    <circle cx="16" cy="16" r="2.5" fill="#fff"/>
    <path d="M16 7.5L25 12.5M25 12.5V19.5M25 19.5L16 24.5M16 24.5L7 19.5M7 19.5V12.5M7 12.5L16 7.5" stroke="#fff" strokeWidth="1.2" fill="none"/>
    <path d="M16 7.5L16 24.5M7 12.5L25 19.5M7 19.5L25 12.5" stroke="#fff" strokeWidth="0.7" fill="none" opacity="0.4"/>
  </svg>
);

const SvgPostgres = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#336791" rx="2"/>
    <path d="M22.5 12c0-3-2.9-5.5-6.5-5.5S9.5 9 9.5 12c0 2 1.1 3.8 2.8 4.9-.1.3-.2.6-.2.9 0 1 .6 1.9 1.5 2.4l-.1.3c-.3 1.5-.7 3.7 1 5h.2l.3-.1c.8-.6 1.1-2 1.2-3.2h.6c.1 1.2.4 2.6 1.2 3.2l.3.1h.2c1.7-1.3 1.3-3.5 1-5l-.1-.3c.9-.5 1.5-1.4 1.5-2.4 0-.3-.1-.6-.2-.9 1.7-1.1 2.8-2.9 2.8-4.9z" fill="#fff" opacity="0.9"/>
    <ellipse cx="14.5" cy="12.5" rx="1" ry="1.2" fill="#336791"/>
    <ellipse cx="17.5" cy="12.5" rx="1" ry="1.2" fill="#336791"/>
  </svg>
);

const SvgVercel = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#000" rx="2"/>
    <path d="M16 8L27 24H5L16 8z" fill="#fff"/>
  </svg>
);

const SvgGitHub = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#24292E" rx="2"/>
    <path d="M16 8C11.6 8 8 11.7 8 16.1c0 3.6 2.3 6.6 5.5 7.7.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.8.9 2.3.7.1-.5.3-.9.5-1.1-1.7-.2-3.5-.9-3.5-3.9 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3-1.8 3.7-3.5 3.9.3.2.5.7.5 1.4v2.1c0 .2.1.5.5.4 3.2-1.1 5.5-4.1 5.5-7.7C24 11.7 20.4 8 16 8z" fill="#fff"/>
  </svg>
);

const SvgGoogle = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#fff" rx="2"/>
    <path d="M16.5 15v2.5h4.7c-.4 2.1-2.3 3.5-4.7 3.5-2.8 0-5-2.2-5-5s2.2-5 5-5c1.3 0 2.4.5 3.2 1.2l1.8-1.8C20.2 9.1 18.4 8.5 16.5 8.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5c4.3 0 7.2-3 7.2-7.3 0-.5 0-.9-.1-1.2H16.5z" fill="#4285F4"/>
  </svg>
);

/* ── Icon registry ──────────────────────────────────────────────── */
interface IconEntry {
  id: string;
  Component: () => JSX.Element;
  bg: string;
  /** absolute CSS position */
  top?: string; left?: string; right?: string; bottom?: string;
  size: number;   // px
  opacity: number;
  floatDelay: number; // stagger for float anim
  floatDuration: number;
}

const ICONS: IconEntry[] = [
  { id:'js',      Component: SvgJS,      bg:'#F7DF1E', top:'18%',  left:'3%',   size:56, opacity:1,    floatDelay:0,    floatDuration:4.2 },
  { id:'ts',      Component: SvgTS,      bg:'#3178C6', top:'36%',  left:'6%',   size:48, opacity:0.88, floatDelay:0.9,  floatDuration:5.1 },
  { id:'react',   Component: SvgReact,   bg:'#20232A', top:'4%',   left:'42%',  size:60, opacity:0.95, floatDelay:0.5,  floatDuration:3.8 },
  { id:'vue',     Component: SvgVue,     bg:'#35495E', top:'62%',  left:'3%',   size:50, opacity:0.82, floatDelay:1.1,  floatDuration:4.7 },
  { id:'next',    Component: SvgNextJS,  bg:'#000',    top:'78%',  left:'7%',   size:52, opacity:0.9,  floatDelay:0.3,  floatDuration:5.3 },
  { id:'node',    Component: SvgNodeJS,  bg:'#339933', top:'8%',   right:'13%', size:54, opacity:1,    floatDelay:0.2,  floatDuration:4.0 },
  { id:'python',  Component: SvgPython,  bg:'#3776AB', top:'22%',  right:'3%',  size:50, opacity:0.78, floatDelay:0.8,  floatDuration:4.9 },
  { id:'git',     Component: SvgGit,     bg:'#F05032', top:'40%',  right:'5%',  size:52, opacity:0.85, floatDelay:0.4,  floatDuration:3.6 },
  { id:'figma',   Component: SvgFigma,   bg:'#1E1E1E', top:'58%',  right:'3%',  size:54, opacity:0.88, floatDelay:1.3,  floatDuration:5.5 },
  { id:'docker',  Component: SvgDocker,  bg:'#2496ED', top:'75%',  right:'6%',  size:48, opacity:0.75, floatDelay:0.6,  floatDuration:4.4 },
  { id:'tailwind',Component: SvgTailwind,bg:'#06B6D4', bottom:'9%',left:'30%',  size:46, opacity:0.72, floatDelay:1.0,  floatDuration:5.0 },
  { id:'graphql', Component: SvgGraphQL, bg:'#E10098', top:'3%',   left:'25%',  size:44, opacity:0.7,  floatDelay:0.7,  floatDuration:3.9 },
  { id:'postgres',Component: SvgPostgres,bg:'#336791', bottom:'7%',right:'12%', size:50, opacity:0.8,  floatDelay:1.4,  floatDuration:4.6 },
  { id:'vercel',  Component: SvgVercel,  bg:'#000',    top:'88%',  left:'46%',  size:44, opacity:0.65, floatDelay:0.15, floatDuration:4.8 },
  { id:'github',  Component: SvgGitHub,  bg:'#24292E', top:'3%',   right:'28%', size:48, opacity:0.8,  floatDelay:1.2,  floatDuration:5.2 },
  { id:'google',  Component: SvgGoogle,  bg:'#fff',    top:'52%',  left:'5%',   size:46, opacity:0.7,  floatDelay:0.55, floatDuration:4.3 },
];

/* ── Single floating icon with cursor repulsion ─────────────────── */
function FloatingIcon({ entry, mouseX, mouseY }: {
  entry: IconEntry;
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [floatY, setFloatY] = useState(0);
  const [floatX, setFloatX] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Float animation
  useEffect(() => {
    setMounted(true);
    let startTime = Date.now() + entry.floatDelay * 1000;
    let raf: number;
    const amp = 9; const ampX = 5;

    const tick = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const t = (elapsed / entry.floatDuration) * Math.PI * 2;
      setFloatY(Math.sin(t) * amp);
      setFloatX(Math.cos(t * 0.7) * ampX);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [entry.floatDelay, entry.floatDuration]);

  // Cursor repulsion
  useEffect(() => {
    let raf: number;
    let curX = 0; let curY = 0;
    const RADIUS = 160;
    const FORCE  = 55;
    const SPRING = 0.12; // easing speed

    const tick = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = mouseX.current - cx;
        const dy = mouseY.current - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = 0; let targetY = 0;
        if (dist > 0 && dist < RADIUS) {
          const factor = (1 - dist / RADIUS) * FORCE;
          targetX = -(dx / dist) * factor;
          targetY = -(dy / dist) * factor;
        }
        curX += (targetX - curX) * SPRING;
        curY += (targetY - curY) * SPRING;
        setOffset({ x: curX, y: curY });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mouseX, mouseY]);

  const { Component } = entry;

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top:    entry.top,
        left:   entry.left,
        right:  entry.right,
        bottom: entry.bottom,
        zIndex: 0,
        opacity: mounted ? entry.opacity : 0,
        transform: `translate(${offset.x + floatX}px, ${offset.y + floatY}px)`,
        transition: 'opacity 0.6s ease',
        willChange: 'transform',
      }}
    >
      <div style={{
        width:  entry.size,
        height: entry.size,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 8px 28px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.08)',
        background: entry.bg,
        padding: 6,
      }}>
        <Component />
      </div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────────── */
export default function FloatingIcons() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {ICONS.map(entry => (
        <FloatingIcon
          key={entry.id}
          entry={entry}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </div>
  );
}
