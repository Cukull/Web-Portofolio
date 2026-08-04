import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS Configuration
 * Design tokens dari:
 *   - 00_BRAND_GUIDELINES.md
 *   - 01_MOODBOARD.md
 *   - 00.5_CREATIVE_DIRECTION.md
 */
const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // ─── WARNA ────────────────────────────────────────────────────────────
      colors: {
        // Background palette
        bg: {
          primary: '#FAFAF7',   // Warm White — background utama
          secondary: '#F5F5F0', // Soft Cream — background sekunder / alternating section
          surface: '#FFFFFF',   // Pure White — card, modal, form
        },
        // Text palette
        text: {
          primary: '#171717',   // Carbon — teks utama, kontras tinggi
          secondary: '#707070', // Slate Gray — teks sekunder, caption, label
        },
        // Border
        border: {
          DEFAULT: '#EAEAEA',   // Soft Gray — border halus
        },
        // Accent — Lime (digunakan sparingly: CTA, active state, badge, hover)
        accent: {
          DEFAULT: '#C6FF34',   // Lime
          hover: '#B7F12C',     // Fresh Green — hover state
        },
        // Status colors
        success: '#56C271',
        warning: '#FFCC66',
        error: '#F15B5B',
      },

      // ─── TIPOGRAFI ────────────────────────────────────────────────────────
      fontFamily: {
        heading: ['"Bricolage Grotesque"', 'sans-serif'], // Heading — Bold, Confident, Friendly
        body: ['Inter', 'sans-serif'],                    // Body — Readable, Neutral, Modern
      },

      // ─── FONT SIZE ────────────────────────────────────────────────────────
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }], // 72px — Hero heading
        'display-lg': ['3.75rem', { lineHeight: '1.1',  letterSpacing: '-0.02em' }], // 60px
        'display-md': ['3rem',    { lineHeight: '1.1',  letterSpacing: '-0.02em' }], // 48px
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }], // 36px
        'display-xs': ['1.875rem',{ lineHeight: '1.2',  letterSpacing: '-0.01em' }], // 30px
      },

      // ─── BORDER RADIUS ────────────────────────────────────────────────────
      // Dari Creative Direction §00.5 dan Moodboard §01
      borderRadius: {
        button: '16px',  // Tombol
        card: '24px',    // Card standard
        hero: '32px',    // Hero card / image besar
        image: '28px',   // Gambar
        // Alternative tokens dari Moodboard
        sm: '12px',
        md: '20px',
        lg: '28px',
        xl: '36px',
      },

      // ─── SHADOW ───────────────────────────────────────────────────────────
      // Soft, blur besar, opacity rendah — tidak pernah hitam pekat
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.10)',
        button: '0 2px 8px rgba(0, 0, 0, 0.08)',
        'button-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        navbar: '0 1px 0 rgba(0, 0, 0, 0.06)',
      },

      // ─── SPACING ─────────────────────────────────────────────────────────
      // Section spacing 120–160px, card padding 32px (dari Moodboard)
      spacing: {
        section: '9rem',      // 144px — section spacing standar
        'section-lg': '10rem', // 160px — section spacing besar
        'card-pad': '2rem',   // 32px — card padding
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
      },

      // ─── MAX WIDTH ────────────────────────────────────────────────────────
      maxWidth: {
        content: '1200px',  // Content width standar (dari Creative Direction)
        site: '1440px',     // Max width keseluruhan (dari Creative Direction)
      },

      // ─── ANIMASI ─────────────────────────────────────────────────────────
      // Timing tokens dari Moodboard §01
      transitionDuration: {
        fast: '150ms',    // Micro-interaction cepat
        DEFAULT: '300ms', // Transisi default
        hero: '700ms',    // Hero reveal
        page: '600ms',    // Page transition
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};

export default config;
