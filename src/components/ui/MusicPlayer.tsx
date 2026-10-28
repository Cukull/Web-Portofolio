/**
 * MusicPlayer.tsx
 * Widget musik kecil di kiri bawah, bergaya kartu kertas + kaset.
 *
 * Catatan:
 *  - Browser modern memblokir autoplay bersuara. Kita tetap mencoba memutar
 *    otomatis; kalau ditolak, lagu mulai pada interaksi pertama pengunjung
 *    (klik, sentuh, scroll, atau keyboard).
 *  - Selama opsi Autoplay aktif di CMS, setiap kunjungan akan mencoba memutar
 *    lagi. Tombol pause tetap berfungsi untuk sesi yang sedang berjalan.
 *  - Sumber audio & judul diatur dari src/config/site.ts.
 */
import React from 'react';
import { siteConfig } from '../../config/site';
import Lanyard from './Lanyard';

function makeStrapSvg(shortName: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="120" viewBox="0 0 600 120">
    <rect width="600" height="120" fill="#141414"/>
    <rect y="10" width="600" height="8" fill="#FDBA12"/>
    <rect y="102" width="600" height="8" fill="#FDBA12"/>
    <text x="300" y="72" text-anchor="middle" font-family="monospace" font-size="34" font-weight="800" fill="#FDFDFB" letter-spacing="6">${shortName} ★ </text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8.4 5.4 18.8 12 8.4 18.6Z" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="7.4" y="5.6" width="3.4" height="12.8" rx="1.1" fill="currentColor" />
      <rect x="13.2" y="5.6" width="3.4" height="12.8" rx="1.1" fill="currentColor" />
    </svg>
  );
}

function CassetteIcon() {
  return (
    <svg
      viewBox="0 0 40 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="2" width="36" height="24" rx="3.5" />
      <g className="music__reel">
        <circle cx="13.6" cy="11.6" r="4" />
        <circle cx="15.4" cy="11.6" r="1" fill="currentColor" stroke="none" />
      </g>
      <g className="music__reel music__reel--b">
        <circle cx="26.4" cy="11.6" r="4" />
        <circle cx="28.2" cy="11.6" r="1" fill="currentColor" stroke="none" />
      </g>
      <path d="M10 26 12.6 19.4h14.8L30 26" />
    </svg>
  );
}

export default function MusicPlayer() {
  const { music, shortName } = siteConfig;
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [needsUnlock, setNeedsUnlock] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const pressStartRef = React.useRef<number>(0);

  const strapImage = React.useMemo(() => makeStrapSvg(shortName), [shortName]);

  const dismissPrompt = React.useCallback((delay = 0) => {
    window.setTimeout(() => {
      setIsClosing(true);
      window.setTimeout(() => {
        setNeedsUnlock(false);
        setIsClosing(false);
      }, 480);
    }, delay);
  }, []);

  const startAudio = React.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = music.volume;
    if (audio.paused) {
      void audio.play().catch(() => {});
    }
  }, [music.volume]);

  const toggle = React.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      dismissPrompt();
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [dismissPrompt]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = music.volume;

    let cancelled = false;
    let readyTimer: number | undefined;

    const tryPlay = () => {
      if (cancelled || !audio.paused) return;
      audio
        .play()
        .then(() => {
          if (!cancelled) setNeedsUnlock(false);
        })
        .catch(() => {
          // Mount Lanyard lebih awal di balik layar loading agar kompilasi WebGL & tekstur
          // selesai sebelum tirai terangkat, lalu picu animasi ayunan saat tirai naik.
          if (!cancelled && audio.paused) setNeedsUnlock(true);
        });
    };

    const interactionEvents = ['click', 'pointerdown', 'keydown'] as const;

    function removeUnlock() {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, unlock);
      });
    }

    function unlock(event: Event) {
      if (event.target instanceof Element && event.target.closest('.music')) {
        removeUnlock();
        dismissPrompt();
        return;
      }
      void audio.play().catch(() => {});
      if (event.type === 'keydown') {
        dismissPrompt();
      }
    }

    const onPlay = () => {
      removeUnlock();
    };
    audio.addEventListener('play', onPlay);

    if (music.autoplay) {
      tryPlay();
      readyTimer = window.setTimeout(() => {
        if (!cancelled) {
          setIsReady(true);
          tryPlay();
        }
      }, 1100);

      interactionEvents.forEach((eventName) => {
        window.addEventListener(eventName, unlock, { passive: true });
      });
    }

    return () => {
      cancelled = true;
      if (readyTimer) window.clearTimeout(readyTimer);
      removeUnlock();
      audio.removeEventListener('play', onPlay);
    };
  }, [music.autoplay, music.volume, dismissPrompt]);

  if (!music.src) return null;

  return (
    <>
      {needsUnlock && (
        <div
          className={`music-prompt${isReady ? ' is-ready' : ''}${isClosing ? ' is-closing' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Selamat datang — klik layar atau tarik lanyard untuk memutar musik"
          onPointerDown={() => {
            pressStartRef.current = performance.now();
            startAudio();
          }}
          onPointerUp={() => {
            const elapsed = performance.now() - pressStartRef.current;
            dismissPrompt(elapsed < 280 ? 220 : 650);
          }}
        >
          <div className="music-prompt__lanyard">
            <Lanyard
              frontImage="/card-front.png"
              backImage="/card-back.png"
              strapImage={strapImage}
              finish="matte"
              metal="graphite"
              size={0.62}
              strapLength={0.48}
              intro={isReady}
            />
          </div>

          <div className="music-prompt__pill" aria-hidden="true">
            <span className="music-prompt__dot" />
            <span>Tarik kartu atau klik layar untuk masuk</span>
          </div>
        </div>
      )}

      <aside
        className={`music${playing ? ' is-playing' : ''}`}
        aria-label="Pemutar musik"
      >
      <audio
        ref={audioRef}
        src={music.src}
        loop
        autoPlay={music.autoplay}
        preload="auto"
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <span className="music__deck">
        <CassetteIcon />
      </span>

      <div className="music__meta">
        <span className="music__status">
          {playing ? music.playingLabel || 'playing' : music.pausedLabel || 'paused'}
        </span>
        <span className="music__song">
          <span className="music__title">{music.title}</span>
          <span className="music__artist">{music.artist}</span>
        </span>
      </div>

      <button
        type="button"
        className="music__btn"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={`${playing ? 'Jeda' : 'Putar'} ${music.title} — ${music.artist}`}
        title={`${playing ? 'Pause' : 'Play'} · ${music.title}`}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </aside>
    </>
  );
}
