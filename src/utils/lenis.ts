/**
 * Lenis Smooth Scroll Initialization
 * Lenis memberikan scrolling yang lebih halus dan natural (momentum-based).
 *
 * Aturan (dari Moodboard §01):
 *  ✅ Smooth, natural, momentum
 *  ❌ Scroll snapping
 *
 * Docs: https://lenis.darkroom.engineering/
 *
 * Dipanggil 1x di BaseLayout.astro via <script>
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initLenis() {
  if (typeof window === 'undefined') return;

  try {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    (window as Window & { lenis?: any }).lenis = lenis;
  } catch (err) {
    console.error('Gagal memuat Lenis smooth scroll:', err);
  }
}

