/**
 * Motion Animation Presets
 * Semua animasi menggunakan Motion (motion.dev) — sebelumnya Framer Motion.
 *
 * Prinsip animasi (dari Brand Guidelines & Creative Direction):
 *  ✅ Fade, Slide, Opacity, Blur, Scale kecil, Stagger, Hover Lift
 *  ❌ Bounce, Flash, Rotate/Spin terus-menerus, Elastic berlebihan
 *
 * Timing tokens (dari Moodboard §01):
 *  - Fast:            150ms
 *  - Default:         300ms
 *  - Hero:            700ms
 *  - Page Transition: 600ms
 */

// ─── EASING ──────────────────────────────────────────────────────────────────
export const ease = {
  default: [0.4, 0, 0.2, 1] as const,
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  out: [0.0, 0, 0.2, 1] as const,
  in: [0.4, 0, 1, 1] as const,
};

// ─── VARIANTS — untuk <motion.X variants={...}> ───────────────────────────────

/** Fade dari bawah ke atas — paling umum dipakai */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.smooth },
  },
};

/** Fade biasa — untuk teks / elemen ringan */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: ease.default },
  },
};

/** Fade dari kanan — untuk sidebar atau panel */
export const fadeRight = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: ease.smooth },
  },
};

/** Hero reveal — lebih lambat, lebih impactful */
export const heroReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.smooth },
  },
};

/**
 * Container stagger — bungkus list items dalam ini
 * anak-anak akan muncul berurutan dengan delay
 */
export const staggerContainer = (staggerDelay = 0.1, delayChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/** Item dalam stagger container */
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.smooth },
  },
};

// ─── INLINE STYLES — untuk motion props langsung ─────────────────────────────

/** Hover lift effect untuk Card */
export const cardHover = {
  whileHover: {
    y: -4,
    scale: 1.01,
    transition: { duration: 0.2, ease: ease.out },
  },
  whileTap: { scale: 0.99 },
};

/** Hover effect untuk Button */
export const buttonHover = {
  whileHover: {
    y: -2,
    transition: { duration: 0.15, ease: ease.out },
  },
  whileTap: { y: 0, scale: 0.98 },
};

// ─── VIEWPORT CONFIG ──────────────────────────────────────────────────────────
/** Default viewport config untuk scroll-triggered animations */
export const defaultViewport = {
  once: true,   // animasi hanya sekali saat masuk viewport
  amount: 0.15, // 15% elemen harus terlihat
};
