/**
 * MusicPlayer.tsx
 * Widget musik kecil di kiri bawah, bergaya kartu kertas + kaset.
 *
 * Catatan:
 *  - Browser modern memblokir autoplay bersuara. Kita tetap mencoba memutar
 *    otomatis; kalau ditolak, lagu mulai pada interaksi pertama pengunjung.
 *  - Preferensi pause disimpan di localStorage supaya tidak autoplay lagi
 *    setelah pengunjung sengaja mematikannya.
 *  - Sumber audio & judul diatur dari src/config/site.ts.
 */
import React from 'react';
import { siteConfig } from '../../config/site';

const STORAGE_KEY = 'syukur-music';

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
  const { music } = siteConfig;
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = React.useState(false);

  const toggle = React.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* private mode */
      }
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
      try {
        localStorage.setItem(STORAGE_KEY, 'off');
      } catch {
        /* private mode */
      }
    }
  }, []);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = music.volume;

    let cancelled = false;
    let rememberOff = false;
    try {
      rememberOff = localStorage.getItem(STORAGE_KEY) === 'off';
    } catch {
      /* private mode */
    }

    function removeUnlock() {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    }

    // Jika autoplay ditolak browser, mulai pada interaksi pertama.
    // Klik pada widget sendiri diserahkan ke tombol play/pause supaya tidak
    // terjadi play lalu langsung pause pada klik pertama.
    function unlock(event: Event) {
      removeUnlock();
      if (event.target instanceof Element && event.target.closest('.music')) return;
      const player = audioRef.current;
      if (!cancelled && player?.paused) {
        void player.play().catch(() => {});
      }
    }

    const onPlay = () => removeUnlock();
    audio.addEventListener('play', onPlay);

    let autoplayTimer: number | undefined;

    if (music.autoplay && !rememberOff) {
      window.addEventListener('pointerdown', unlock, { passive: true });
      window.addEventListener('keydown', unlock);

      // Beri jeda supaya musik mulai berbarengan dengan reveal halaman.
      autoplayTimer = window.setTimeout(() => {
        if (!cancelled && audio.paused) {
          void audio.play().catch(() => {});
        }
      }, 1500);
    }

    return () => {
      cancelled = true;
      if (autoplayTimer) window.clearTimeout(autoplayTimer);
      removeUnlock();
      audio.removeEventListener('play', onPlay);
    };
  }, [music.autoplay, music.volume]);

  if (!music.src) return null;

  return (
    <aside
      className={`music${playing ? ' is-playing' : ''}`}
      aria-label="Pemutar musik"
    >
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="metadata"
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
  );
}
