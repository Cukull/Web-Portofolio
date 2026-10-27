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
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, []);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = music.volume;

    let cancelled = false;
    let autoplayTimer: number | undefined;
    let lastScrollAttempt = 0;

    const tryPlay = () => {
      if (cancelled || !audio.paused) return;
      // Browser bisa memblokir autoplay bersuara. Kalau ditolak, pemutaran
      // akan dicoba lagi pada interaksi pertama pengunjung.
      void audio.play().catch(() => {});
    };

    const interactionEvents = ['pointerdown', 'touchstart', 'keydown', 'scroll'] as const;

    function removeUnlock() {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, unlock);
      });
    }

    function unlock(event: Event) {
      // Klik pada widget sendiri diserahkan ke tombol play/pause supaya tidak
      // terjadi play lalu langsung pause pada klik pertama.
      if (event.target instanceof Element && event.target.closest('.music')) {
        removeUnlock();
        return;
      }

      // Scroll belum tentu dihitung sebagai user activation oleh browser.
      // Jangan lepas listener lain sebelum play benar-benar berhasil, dan
      // jangan memanggil play() puluhan kali selama pengunjung menggulir.
      if (event.type === 'scroll') {
        const now = Date.now();
        if (now - lastScrollAttempt < 800) return;
        lastScrollAttempt = now;
      } else {
        removeUnlock();
      }
      tryPlay();
    }

    const onPlay = () => removeUnlock();
    audio.addEventListener('play', onPlay);

    if (music.autoplay) {
      // Coba langsung, lalu sekali lagi setelah layar pembuka selesai.
      tryPlay();
      autoplayTimer = window.setTimeout(tryPlay, 1800);

      interactionEvents.forEach((eventName) => {
        window.addEventListener(eventName, unlock, { passive: true });
      });
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
  );
}
