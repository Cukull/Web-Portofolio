# Paper Graph Portfolio

Portfolio pribadi Mochamad Syukur dengan gaya **Paper Graph / Retro Digital Notebook**.
Dibangun dengan Astro, React islands, Tailwind CSS, dan Keystatic sebagai CMS.

## Menjalankan project

```sh
npm install
npm run dev
```

Dev server berjalan di `http://127.0.0.1:4321` (atau gunakan `astro dev --background`).

```sh
npm run build
npm run preview
```

## CMS (Keystatic)

Buka `http://127.0.0.1:4321/keystatic` saat dev.

Semua konten yang terlihat di halaman utama bisa diedit dari sana:

- **Site Settings** — nama, SEO, sosial, navigasi, upload CV, audio musik, dan teks loading.
- **Hero Section** — headline, lede, masthead, CTA, foto, statistik, marquee.
- **About Section** — paragraf, catatan tangan, dan kartu skill.
- **Experience Section** + collection **Experience** — heading, timeline, bullet points.
- **Projects Section** + collection **Projects** — heading, filter, project, cover, live/GitHub URL, dan halaman detail.
- **Toolkit Section** — daftar tools beserta deskripsinya.
- **Education Section** + collection **Education** — gelar, institusi, catatan, dan awards.
- **Certificates Section** + collection **Certificates** — cover, PDF/credential URL, deskripsi.
- **Off the Clock Section** — hobi, reading list, dan marquee biru.
- **Contact Section** — heading, catatan, label form, dan fine print.

### Upload media

| Field | Folder tujuan | Public path |
| --- | --- | --- |
| Foto hero / OG image | `public/images/` | `/images/...` |
| Cover project | `public/images/projects/` | `/images/projects/...` |
| Cover & PDF sertifikat | `public/images/certificates/`, `public/files/certificates/` | `/images/...`, `/files/...` |
| CV | `public/files/` | `/files/...` |
| Audio | `public/audio/` | `/audio/...` |

Menghapus entry di CMS tidak otomatis menghapus file media dari `public/`. Hapus file lama secara manual jika perlu.

### Production (GitHub storage)

Di dev, Keystatic memakai penyimpanan lokal. Di production, perubahan disimpan sebagai commit ke repo GitHub `Cukull/Web-Portofolio`.

Isi environment variable berikut di Vercel:

```sh
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=
```

Buat GitHub App dengan akses ke repo tersebut, lalu hubungkan ke project Vercel. Setelah env terpasang, `/keystatic` bisa dipakai untuk mengedit konten production. Setiap commit dari CMS akan memicu deploy baru.

Lihat `.env.example` untuk daftar variabelnya.
