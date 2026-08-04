/**
 * Site Configuration
 * Semua metadata & konten global website ada di sini.
 * Ganti nilai di bawah dengan data asli Anda.
 *
 * Dipakai oleh: BaseLayout.astro, Navbar, Footer, SEO meta tags
 */
export const siteConfig = {
  // ─── IDENTITAS ──────────────────────────────────────────────────────────
  name: 'Mochamad Syukur',
  shortName: 'M. Syukur',
  title: 'Mochamad Syukur — Web Developer',
  tagline: 'Membangun produk digital yang bermakna.',
  description:
    'Portfolio pribadi Mochamad Syukur — Web Developer yang fokus pada kualitas, performa, dan pengalaman pengguna.',
  url: 'https://mochamad-syukur.dev', // Ganti dengan URL asli setelah deploy

  // ─── SOCIAL LINKS ───────────────────────────────────────────────────────
  social: {
    github: 'https://github.com/',       // TODO: isi username GitHub
    linkedin: 'https://linkedin.com/in/', // TODO: isi username LinkedIn
    instagram: 'https://instagram.com/',  // TODO: isi username Instagram
    email: 'mailto:email@example.com',    // TODO: isi email
  },

  // ─── RESUME ─────────────────────────────────────────────────────────────
  resumeUrl: '/resume/resume.pdf', // Letakkan file CV di public/resume/resume.pdf

  // ─── OPEN GRAPH ─────────────────────────────────────────────────────────
  ogImage: '/images/og-image.png', // TODO: buat OG image (1200×630px)

  // ─── AUTHOR INFO (untuk JSON-LD) ─────────────────────────────────────────
  author: {
    name: 'Mochamad Syukur',
    jobTitle: 'Web Developer',
    location: 'Indonesia',
  },
} as const;

export type SiteConfig = typeof siteConfig;
