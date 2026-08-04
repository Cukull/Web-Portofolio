# 📄 RINGKASAN PROJECT — Personal Portfolio Website

**Owner:** Mochamad Syukur
**Status:** Ready to Build
**Sumber:** Brand Guidelines · Creative Direction · Moodboard · ADR · PRD
**Terakhir diperbarui:** 2026-08-03

---

## 1. Ringkasan Satu Paragraf

Portfolio pribadi ini dibangun sebagai **CV online + personal branding** untuk developer modern, bukan sekadar galeri project. Website harus terasa seperti majalah digital premium — tenang, editorial, whitespace besar — dengan target utama membuat recruiter/client bisa **mengenal, percaya, dan menghubungi** pemiliknya dalam waktu singkat, sambil membuktikan lewat kualitas website itu sendiri bahwa pemiliknya memahami UI/UX dan performa, bukan cuma bisa coding.

---

## 2. Vision, Objectives & Non-Goals

**Vision:** Representasi profesional yang bisa dipercaya recruiter, client, dan komunitas — menunjukkan cara berpikir & cara kerja, bukan cuma daftar skill.

**Objectives:**
- Identitas pribadi profesional
- Project ditampilkan sebagai studi kasus (problem → solution → tech → result)
- CV online
- Mudah dihubungi recruiter
- Media personal branding
- Tempat eksperimen UI/animasi modern

**Non-Goals (sengaja TIDAK dibuat):** blog kompleks, dashboard, CMS, marketplace, social media, admin panel — fokus tetap sempit dan dalam, bukan melebar.

**Target Audience:**
| Primary | Secondary |
|---|---|
| Recruiter, HR, Hiring Manager | Client, Dosen, Teman, Komunitas Developer |

---

## 3. Success Metrics (Definisi "Berhasil")

- Lighthouse Performance / SEO / Accessibility / Best Practices ≥ 95
- Pengunjung paham isi website < 2 menit
- Project ditemukan maksimal 2 klik
- Nyaman di mobile
- CLS < 0.1

---

## 4. Sitemap & Navigasi

```
Home
├── Hero
├── About
├── Skills
├── Featured Projects
├── Experience
├── Education
├── Certificates
├── Contact
└── Footer

Future (bukan v1): Blog · Playground · Lab · Writing
```

**Navbar:** Logo · About · Projects · Experience · Contact · Resume Button · Theme Toggle
**Style navbar:** Floating, transparent, blur saat scroll, transisi halus.

---

## 5. Fitur per Section (dengan Prioritas)

| Section | Requirement Konten | Priority |
|---|---|---|
| **Hero** | Nama, tagline, CTA, social links, hero animation | High |
| **About** | Story, philosophy, passion, foto besar | High |
| **Skills** | Frontend/Backend/UI/Database/Tools — pakai tag/badge, **bukan progress bar** | Medium |
| **Featured Projects** | Cover image besar, deskripsi, tech, live demo, GitHub, case study | High |
| **Experience** | Timeline vertikal | High |
| **Education** | Timeline | Medium |
| **Certificates** | Grid layout | Medium |
| **Contact** | Form + Email + LinkedIn + GitHub + Instagram | High |

> Catatan konten: tulisan singkat, fokus visual, **project lebih penting daripada biodata**.

---

## 6. Design System

### Warna
| Peran | Nama | HEX |
|---|---|---|
| Background utama | Warm White | `#FAFAF7` |
| Background sekunder | Soft Cream | `#F5F5F0` |
| Surface | Pure White | `#FFFFFF` |
| Teks utama | Carbon | `#171717` |
| Teks sekunder | Slate Gray | `#707070` |
| Border | Soft Gray | `#EAEAEA` |
| Accent | Lime | `#C6FF34` |
| Hover accent | Fresh Green | `#B7F12C` |
| Success / Warning / Error | — | `#56C271` / `#FFCC66` / `#F15B5B` |

Aturan: Lime **hanya** untuk CTA, active state, badge, hover — jangan jadi background utama.

### Tipografi
- **Heading:** Bricolage Grotesque (Bold/ExtraBold/Black) — besar, percaya diri
- **Body:** Inter (400/500/600) — sangat readable
- Prinsip: heading besar, body kecil, kontras hierarchy tinggi

### Radius & Shadow
| Elemen | Radius |
|---|---|
| Button | 12–16px |
| Card | 20–24px |
| Hero Card | 32–36px |
| Image | 28px |

Shadow: soft, blur besar, opacity rendah — tidak pernah hitam pekat.

### Grid & Spacing
- 12 kolom (desktop) / 8 (tablet) / 4 (mobile)
- Content width 1200px, max-width 1440px
- Section spacing 120–160px, card padding 32px

### Icon
Lucide, outline, 2px, rounded.

---

## 7. Motion & Animation

**Dipakai:** Fade, Slide, Blur, Scale kecil, Mask Reveal, Stagger, Hover Lift, Magnetic Button, Parallax ringan, Scroll Reveal, Navbar Blur, Page Transition.

**Dihindari:** Bounce, Flash, Spin/Rotate terus-menerus, Elastic berlebihan, animasi tanpa tujuan.

**Timing:** Fast 150ms · Default 300ms · Hero 700ms · Page Transition 600ms

**Prinsip:** Motion membantu pemahaman, bukan hiasan. Kalau harus pilih antara animasi vs performa → **selalu performa**. Semua animasi wajib menghormati `prefers-reduced-motion`.

**Animation flow per section:** Hero (reveal pertama) → About (fade) → Projects (stagger) → Experience (timeline reveal) → Contact (soft fade).

---

## 8. Tech Stack (dari ADR)

| Layer | Pilihan |
|---|---|
| Framework | **Astro** (islands architecture) |
| Interactive UI | **React** (hanya komponen yang butuh state/event) |
| Bahasa | **TypeScript** |
| Styling | **Tailwind CSS** |
| Animasi UI | **Motion**, opsional **GSAP** untuk efek sinematik |
| Smooth scroll | **Lenis** |
| Icon | **Lucide React** |
| Konten | **Astro Content Collections** (Markdown/MDX: projects, blog, certificates, experience) |
| Code quality | ESLint + Prettier |
| Deployment | **Vercel** (utama, sesuai ADR) — PRD menyebut **Cloudflare Pages**; perlu diputuskan salah satu (lihat §12 Open Questions) |
| Contact form | EmailJS / Resend |

### Struktur folder
```
portfolio/
├── public/{favicon,images,resume}/
├── src/
│   ├── assets/
│   ├── components/{ui,layout,sections}/
│   ├── content/{projects,blog,certificates,experience}/
│   ├── layouts/ pages/ styles/ utils/ hooks/ lib/ config/
├── docs/
├── astro.config.mjs · tailwind.config.ts · tsconfig.json
```

---

## 9. Non-Functional Requirements

| Aspek | Target |
|---|---|
| Performance | Lighthouse ≥ 95, FCP < 1.5s, LCP < 2.5s, TBT < 150ms |
| SEO | Meta title/desc, Open Graph, Twitter Card, sitemap, structured data, canonical URL, favicon, manifest |
| Accessibility | Keyboard nav, screen reader friendly, alt text, ARIA label, focus indicator, reduced motion, WCAG AA contrast |
| Security | Tidak ada secret di frontend, env var untuk API key, CSP di deployment |
| Responsive | Mobile, Tablet, Laptop, Desktop, Large Desktop |

---

## 10. Risks

- Animasi berlebihan → mengorbankan performa
- Terlalu banyak warna → keluar dari brand (harusnya minimal + lime secukupnya)
- Informasi terlalu padat → melanggar prinsip "less but better"

**Mitigasi:** selalu kembali ke Creative North Star — *"Apakah keputusan ini membuat website terasa lebih tenang, lebih jelas, dan lebih premium?"* Kalau tidak, dipertimbangkan ulang.

---

## 11. Definition of Done

- [ ] Semua section selesai (Hero → Footer)
- [ ] Fully responsive
- [ ] Lighthouse memenuhi target (≥95 semua kategori)
- [ ] Tidak ada broken link
- [ ] SEO lengkap
- [ ] Semua animasi berjalan & reduced-motion aman
- [ ] Semua project punya detail lengkap (problem/solution/tech/result)
- [ ] Contact form berfungsi
- [ ] Deploy berhasil

---

## 12. Open Questions (perlu diputuskan sebelum/selagi development)

1. **Deployment:** ADR pilih Vercel, PRD sebut Cloudflare Pages — pilih salah satu sebagai primary.
2. **Konten aktual:** nama tampilan, tagline, foto, isi About, daftar project (minimal berapa untuk v1?), riwayat pengalaman & pendidikan, sertifikat — belum ada di dokumen manapun.
3. **Resume/CV file:** format PDF untuk tombol "Resume" di navbar perlu disiapkan.
4. **Contact form backend:** EmailJS atau Resend — pilih satu.
5. **Dark/Light theme:** navbar menyebut "Theme Toggle" tapi tidak ada detail dark mode di design system — perlu palet dark mode jika mau digarap di v1, atau didorong ke roadmap berikutnya.

---

## 13. Roadmap

| Versi | Fokus |
|---|---|
| v1 | Portfolio (scope dokumen ini) |
| v2 | Blog |
| v3 | Playground |
| v4 | CMS |
| v5 | Multilanguage |

---

## 14. Rencana Eksekusi — Fase Development

| Fase | Isi |
|---|---|
| **0. Fondasi** | Init Astro + TS + Tailwind, struktur folder, design tokens (warna/radius/font), ESLint+Prettier |
| **1. Design System** | Komponen dasar: Button, Card, Badge/Tag, Typography — jadi kamus visual konsisten |
| **2. Layout & Navigasi** | Floating navbar (transparent→blur), footer minimal, base layout grid |
| **3. Hero + About** | Hero full viewport + reveal animation; About editorial dengan foto & story besar |
| **4. Skills + Certificates** | Tag/badge grid untuk skills, grid layout untuk certificates |
| **5. Projects** | Content Collection schema (problem/solution/tech/result), project card + hover reveal + stagger |
| **6. Experience + Education** | Timeline vertikal untuk keduanya |
| **7. Contact + Motion Polish** | Form (EmailJS/Resend), Lenis smooth scroll, scroll-reveal, magnetic cursor (cek performa), accessibility pass |
| **8. SEO + Optimasi + Deploy** | Meta tags, OG, sitemap, structured data, image/font optimization, Lighthouse check, deploy |

---

*Dokumen ini adalah rangkuman kerja dari 00_BRAND_GUIDELINES, 00.5_CREATIVE_DIRECTION, 01_MOODBOARD, 02_ADR, dan 03_PRD — dipakai sebagai satu referensi cepat saat development, bukan pengganti dokumen aslinya.*
