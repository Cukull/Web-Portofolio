/**
 * Lenis Smooth Scroll + GSAP ScrollTrigger
 * ----------------------------------------
 * Lenis memberi scrolling momentum-based yang halus, GSAP jadi penggerak
 * ticker-nya sekaligus memasang efek parallax berbasis scroll.
 *
 * Aturan (dari Moodboard §01):
 *  ✅ Smooth, natural, momentum
 *  ❌ Scroll snapping
 *
 * Dipanggil 1x di BaseLayout.astro via <script>initLenis()</script>.
 * Docs: https://lenis.darkroom.engineering/
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type LenisWindow = Window & { lenis?: Lenis };

let instance: Lenis | null = null;
let booted = false;
let anchorsBound = false;

export function getLenis(): Lenis | null {
  return instance;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Jarak aman di bawah sticky navbar saat melompat ke sebuah section. */
function navOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h');
  const height = Number.parseFloat(raw);
  return (Number.isFinite(height) ? height : 68) + 14;
}

function scrollToTarget(target: HTMLElement, hash: string, smooth: boolean) {
  const offset = -navOffset();

  if (instance) {
    instance.scrollTo(target, {
      offset,
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      onComplete: () => history.pushState(null, '', hash),
    });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  history.pushState(null, '', hash);
}

/** Semua anchor internal (#section) ikut Lenis, bukan lompatan native. */
function bindAnchors(smooth: boolean) {
  if (anchorsBound) return;
  anchorsBound = true;

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = (event.target as Element | null)?.closest?.('a[href^="#"]');
    if (!(anchor instanceof HTMLAnchorElement)) return;
    if (anchor.hasAttribute('download') || anchor.target === '_blank') return;

    const hash = anchor.getAttribute('href') || '';
    if (!hash || hash === '#') return;

    const target = document.querySelector<HTMLElement>(hash);
    if (!target) return;

    event.preventDefault();
    scrollToTarget(target, hash, smooth);
  });
}

function tick(time: number) {
  instance?.raf(time * 1000);
}

export function initLenis(): Lenis | null {
  if (typeof window === 'undefined' || booted) return instance;
  booted = true;

  // Hormati preferensi sistem: tanpa Lenis, cukup scroll native.
  if (prefersReducedMotion()) {
    bindAnchors(false);
    return null;
  }

  try {
    instance = new Lenis({
      autoRaf: false,
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.6,
      syncTouch: false,
      anchors: false,
    });

    (window as unknown as LenisWindow).lenis = instance;

    // Sinkronkan Lenis dengan GSAP ticker + ScrollTrigger.
    instance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    bindAnchors(true);
    ScrollTrigger.refresh();

    // Font & gambar mengubah tinggi halaman: hitung ulang trigger.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  } catch (error) {
    console.error('Gagal memuat Lenis smooth scroll:', error);
    bindAnchors(false);
  }

  return instance;
}
