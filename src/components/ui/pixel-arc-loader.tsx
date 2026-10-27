/**
 * pixel-arc-loader.tsx
 * Adaptasi komponen PixelArcLoader dari 21st.dev untuk portofolio Paper Graph.
 *
 * Perilaku:
 *  - Layar hitam penuh + pixel stars berkelip + shooting star
 *  - Teks pixel arc berlapis (Press Start 2P) dengan gelombang berjalan
 *  - Tampil minimal beberapa saat, lalu slide-up halus
 *  - Menghormati prefers-reduced-motion (lewat CSS global)
 *
 * Dipasang sekali di BaseLayout.astro sebagai <PixelArcLoader client:load />.
 */
'use client';

import * as React from 'react';
import { BackgroundPixelStars } from './background-pixel-stars';

const DEPTH = 11;
const WAVE_STAGGER = 0.11;

export interface PixelArcLoaderProps {
  /** Teks yang ditampilkan, default "LOADING". */
  title?: string;
  /** Minimal berapa lama layar terlihat sebelum slide-up (ms). */
  minDuration?: number;
  /** Durasi slide-up, samakan dengan transition di global.css (ms). */
  exitDuration?: number;
  className?: string;
}

function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function splitTitle(title: string) {
  const chars = Array.from(title.toUpperCase());
  const mid = Math.max(chars.length - 1, 1) / 2;

  return chars.map((char, index) => ({
    key: `${index}-${char === ' ' ? 'space' : char}`,
    char: char === ' ' ? '\u00A0' : char,
    index,
    fromCenter: index - mid,
  }));
}

function PixelLetter({
  char,
  fromCenter,
  index,
}: {
  char: string;
  fromCenter: number;
  index: number;
}) {
  const rotate = fromCenter * 7.2;
  const drop = fromCenter * fromCenter * 4.1;

  return (
    <span
      className="boot-screen__letter"
      style={{ '--wave-delay': `${index * WAVE_STAGGER}s` } as React.CSSProperties}
    >
      <span
        className="boot-screen__glyph"
        style={{ transform: `rotate(${rotate}deg) translateY(${drop}px)` }}
      >
        {Array.from({ length: DEPTH }, (_, layer) => (
          <span
            key={layer}
            aria-hidden="true"
            className="boot-screen__depth"
            style={{
              transform: `translate(${layer}px, ${layer}px)`,
              color: layer > DEPTH - 3 ? '#070707' : '#161616',
            }}
          >
            {char}
          </span>
        ))}
        <span className="boot-screen__face">{char}</span>
      </span>
    </span>
  );
}

export function PixelArcLoader({
  title = 'LOADING',
  minDuration = 1100,
  exitDuration = 1450,
  className,
}: PixelArcLoaderProps) {
  const [phase, setPhase] = React.useState<'loading' | 'leaving' | 'done'>('loading');
  const letters = React.useMemo(() => splitTitle(title), [title]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.add('is-booting');

    let leaveTimer: number | undefined;
    let doneTimer: number | undefined;

    // Hitung dari waktu navigasi (performance.now), bukan dari hydration:
    // layar pembuka sudah terlihat sejak HTML pertama kali dicat.
    const wait = Math.max(240, minDuration - performance.now());

    leaveTimer = window.setTimeout(() => {
      setPhase('leaving');

      doneTimer = window.setTimeout(() => {
        setPhase('done');
        root.classList.remove('is-booting');
      }, exitDuration);
    }, wait);

    return () => {
      if (leaveTimer) window.clearTimeout(leaveTimer);
      if (doneTimer) window.clearTimeout(doneTimer);
      root.classList.remove('is-booting');
    };
  }, [minDuration, exitDuration]);

  if (phase === 'done') return null;

  return (
    <div
      className={cn('boot-screen', phase === 'leaving' && 'is-leaving', className)}
      role="status"
      aria-live="polite"
      aria-busy={phase === 'loading'}
    >
      <div className="boot-screen__stars" aria-hidden="true">
        <BackgroundPixelStars />
      </div>
      <span className="sr-only">{title}</span>

      <div className="boot-screen__stage" aria-hidden="true">
        <p className="boot-screen__word">
          {letters.map((letter) => (
            <PixelLetter
              key={letter.key}
              char={letter.char}
              fromCenter={letter.fromCenter}
              index={letter.index}
            />
          ))}
        </p>
      </div>
    </div>
  );
}

export default PixelArcLoader;
