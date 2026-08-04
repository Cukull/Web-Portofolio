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

// Tipe minimal untuk Lenis (tanpa import penuh di sisi Astro static)
export function initLenis() {
  // Guard: hanya jalan di browser
  if (typeof window === 'undefined') return;

  // Dynamically import Lenis agar tidak masuk ke SSR bundle
  import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({
      duration: 1.2,           // kecepatan scroll (semakin tinggi = semakin lambat/smooth)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // eksponensial
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // RAF loop — Lenis butuh requestAnimationFrame untuk update setiap frame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Expose ke window untuk digunakan komponen lain jika perlu
    (window as Window & { lenis?: typeof lenis }).lenis = lenis;
  });
}
