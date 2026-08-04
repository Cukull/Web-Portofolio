# Architecture Decision Record (ADR)

**Project:** Personal Portfolio Website
**Owner:** Mochamad Syukur
**Status:** Accepted
**Date:** 2026-08-03

---

# 1. Context

Website ini bertujuan menjadi **portofolio pribadi profesional** yang digunakan untuk:

* Menampilkan project dan kemampuan teknis.
* Mendukung personal branding sebagai developer.
* Menjadi CV online yang mudah dibagikan.
* Memberikan pengalaman visual modern dengan animasi halus.
* Tetap memiliki performa dan SEO yang sangat baik.

Kebutuhan utama:

* Performa tinggi (Lighthouse > 95).
* SEO baik.
* Responsive.
* Mudah dipelihara dan dikembangkan.
* Mendukung animasi modern.
* Struktur project tidak terlalu kompleks.

---

# 2. Decision Summary

| Area               | Technology                    |
| ------------------ | ----------------------------- |
| Main Framework     | **Astro**                     |
| Interactive UI     | **React**                     |
| Language           | **TypeScript**                |
| Styling            | **Tailwind CSS**              |
| UI Animation       | **Motion**                    |
| Advanced Animation | **GSAP** (optional)           |
| Smooth Scrolling   | **Lenis**                     |
| Icons              | **Lucide React**              |
| Content Management | **Astro Content Collections** |
| Code Quality       | **ESLint + Prettier**         |
| Deployment         | **Vercel / Cloudflare Pages** |

---

# 3. Main Framework

## Decision

Use **Astro** as the primary framework.

## Rationale

* Static-first architecture menghasilkan performa sangat baik.
* Routing dan layout sederhana dibanding framework fullstack seperti Next.js.
* SEO dan optimasi image sudah terintegrasi.
* Mendukung integrasi React hanya pada bagian yang membutuhkan interaktivitas (**islands architecture**).
* Cocok untuk website konten seperti portofolio, blog, dokumentasi, dan landing page.

## Consequences

### Positive

* Bundle JavaScript lebih kecil.
* Loading lebih cepat.
* Struktur project lebih mudah dipahami.
* Hosting lebih murah dan sederhana.

### Negative

* Tidak sefleksibel Next.js untuk fitur fullstack kompleks.
* Perlu memahami konsep islands architecture.

---

# 4. Interactive UI Framework

## Decision

Use **React** only for interactive components.

## Rationale

Komponen yang membutuhkan state, event, atau animasi kompleks akan dibuat dengan React, misalnya:

* Navbar interaktif
* Theme toggle
* Custom cursor
* Modal
* Carousel
* Timeline
* Contact form
* Animated project card

## Consequences

* Tidak semua halaman dirender oleh React.
* JavaScript yang dikirim ke browser tetap minimal.

---

# 5. Programming Language

## Decision

Use **TypeScript**.

## Rationale

* Type safety.
* Autocomplete lebih baik.
* Refactoring lebih aman.
* Mengurangi bug saat project bertambah besar.

## Consequences

* Sedikit tambahan penulisan tipe.
* Learning curve kecil dibanding JavaScript murni.

---

# 6. Styling System

## Decision

Use **Tailwind CSS**.

## Rationale

* Utility-first approach mempercepat development.
* Konsisten dalam spacing, typography, dan color system.
* Responsive design sangat mudah diterapkan.
* Dark mode support bawaan.
* Cocok dipadukan dengan Astro dan React.

## Example

```html
<div class="bg-zinc-900 text-white p-6 rounded-2xl shadow-lg">
  Project Card
</div>
```

## Consequences

### Positive

* Sangat cepat untuk prototyping.
* Sedikit penulisan CSS manual.
* Desain lebih konsisten.

### Negative

* Class HTML menjadi lebih panjang.
* Perlu disiplin dalam mengelola utility class.

---

# 7. Animation Strategy

## Decision

Use **Motion** for UI animations and **GSAP** optionally for advanced cinematic effects.

## Motion Use Cases

* Fade in / out
* Slide transition
* Hover effect
* Stagger animation
* Scroll reveal
* Layout transition

## GSAP Use Cases

* Parallax
* Complex scroll timeline
* Text reveal
* SVG animation
* Cinematic hero section

## Consequences

* Motion cukup untuk mayoritas kebutuhan UI.
* GSAP hanya ditambahkan jika benar-benar diperlukan agar bundle tetap ringan.

---

# 8. Smooth Scrolling

## Decision

Use **Lenis**.

## Rationale

* Memberikan pengalaman scrolling yang lebih halus dan modern.
* Integrasi mudah dengan Motion maupun GSAP.

---

# 9. Icon System

## Decision

Use **Lucide React**.

## Rationale

* SVG-based.
* Ringan.
* Konsisten.
* Mudah dikustomisasi dengan Tailwind.

---

# 10. Content Management

## Decision

Use **Astro Content Collections**.

## Rationale

Project, blog, sertifikat, dan pengalaman akan disimpan sebagai file Markdown/MDX dengan schema validation.

## Example Structure

```text
src/content/
├── projects/
├── blog/
├── certificates/
└── experience/
```

## Consequences

* Mudah menambah konten tanpa mengubah banyak kode.
* Tidak memerlukan CMS eksternal.

---

# 11. Code Quality

## Decision

Use **ESLint** and **Prettier**.

## Rationale

* Menjaga konsistensi format kode.
* Mengurangi kesalahan umum.
* Memudahkan kolaborasi di masa depan.

---

# 12. Deployment Platform

## Decision

Primary target: **Vercel**.
Alternative: **Cloudflare Pages**.

## Rationale

* Integrasi GitHub sangat mudah.
* Mendukung Astro secara native.
* Automatic preview deployment.
* CDN global.

---

# 13. High-Level Architecture

```text
User
  │
  ▼
Browser
  │
  ▼
Astro Application
  ├── Routing
  ├── Layouts
  ├── SEO
  ├── Image Optimization
  └── Static Build
        │
        ├──────────────┐
        ▼              ▼
  Tailwind CSS     React Islands
                        │
                        ├── Motion
                        └── GSAP (optional)
        │
        ▼
     Lenis
        │
        ▼
  Contact Service
  (EmailJS / Resend)
        │
        ▼
  Vercel / Cloudflare CDN
```

---

# 14. Proposed Project Structure

```text
portfolio/
├── public/
│   ├── favicon/
│   ├── images/
│   └── resume/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── sections/
│   │
│   ├── content/
│   │   ├── projects/
│   │   ├── blog/
│   │   ├── certificates/
│   │   └── experience/
│   │
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── hooks/
│   ├── lib/
│   └── config/
│
├── docs/
│   └── Architecture Decision Record.md
│
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

# 15. Performance Targets

| Metric                   | Target  |
| ------------------------ | ------- |
| Lighthouse Performance   | ≥ 95    |
| SEO                      | 100     |
| Accessibility            | ≥ 95    |
| Best Practices           | 100     |
| First Contentful Paint   | < 1.5s  |
| Largest Contentful Paint | < 2.5s  |
| Total Blocking Time      | < 150ms |

---

# 16. Accessibility Targets

* Semantic HTML.
* Keyboard navigation.
* Visible focus state.
* Alt text untuk semua gambar penting.
* Color contrast memenuhi WCAG AA.
* Reduced motion support jika memungkinkan.

---

# 17. Security Considerations

* Tidak menyimpan secret di frontend.
* Environment variable digunakan untuk API key.
* Form submission menggunakan layanan terpercaya (EmailJS/Resend).
* CSP dan security headers dapat ditambahkan saat deployment.

---

# 18. Future Expansion

Arsitektur ini dirancang agar mudah diperluas untuk:

* Blog pribadi.
* CMS headless.
* Multi-language.
* Dark/Light theme advanced.
* Search.
* Analytics dashboard.
* Progressive Web App (PWA).

---

# 19. Final Recommendation

Stack akhir yang disetujui:

* **Astro** sebagai fondasi utama.
* **React** untuk komponen interaktif.
* **TypeScript** untuk type safety.
* **Tailwind CSS** untuk styling.
* **Motion** untuk animasi UI.
* **Lenis** untuk smooth scrolling.
* **Lucide React** untuk icon.
* **Astro Content Collections** untuk pengelolaan konten.
* **Vercel** sebagai platform deployment utama.

Arsitektur ini memberikan kombinasi terbaik antara **performa, SEO, kemudahan pengembangan, dan kualitas visual modern** untuk website portofolio pribadi.
