# 🎨 DESIGN SYSTEM — Web Portfolio
## "Paper Graph / Sketchbook" Aesthetic

> Referensi visual: desain dengan latar belakang kertas grid / graph paper,
> tipografi campuran pixel + handwriting + monospace, elemen UI bergaya sketsa/stiker.

---

## 1. FILOSOFI DESAIN

Desain ini mengadopsi estetika **"Analog-Digital Fusion"** — menggabungkan nuansa kertas fisik
(graph paper, sticky notes, sketsa tangan) dengan elemen digital modern. Kesan yang ingin diciptakan:
- **Warm & Personal** — terasa seperti portofolio buatan sendiri, bukan template korporat
- **Playful but Professional** — warna kuning mencolok + detail piksel memberikan karakter
- **Organized Chaos** — layout terstruktur di atas grid, tapi elemen-elemennya terasa "ditempel"

---

## 2. BACKGROUND — PAPER GRAPH GRID

### CSS Implementation

```css
/* Base background */
body, .paper-bg {
  background-color: #F5F5EE;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Variant: Large grid + small subdivision */
.paper-bg-fine {
  background-color: #FAFAF5;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
    linear-gradient(rgba(0, 0, 0, 0.09) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.09) 1px, transparent 1px);
  background-size: 8px 8px, 8px 8px, 40px 40px, 40px 40px;
}

/* Footer / dark section */
.paper-bg-dark {
  background-color: #1A1A2E;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### Nilai Grid
| Property | Value |
|---|---|
| Grid size (utama) | `24px x 24px` |
| Grid size (sub-divisi) | `8px x 8px` |
| Warna garis (light) | `rgba(0,0,0,0.06)` |
| Warna garis (subdivision) | `rgba(0,0,0,0.04)` |
| Major grid line | `rgba(0,0,0,0.10)` setiap 5 grid |

---

## 3. COLOR PALETTE

### Warna Utama
| Token | Hex | Penggunaan |
|---|---|---|
| `--color-bg` | `#F5F5EE` | Background utama (warm off-white) |
| `--color-paper` | `#FEFEFE` | Card / panel putih |
| `--color-carbon` | `#1A1A1A` | Teks utama, heading |
| `--color-slate` | `#5A5A6A` | Teks sekunder, label |
| `--color-yellow` | `#FFD60A` | Aksen utama — sticky note, highlight, CTA |
| `--color-yellow-dark` | `#E6C000` | Hover state kuning |
| `--color-yellow-pale` | `#FFF9D6` | Background soft kuning |
| `--color-border` | `#E2E2D8` | Border card, divider |
| `--color-grid` | `rgba(0,0,0,0.06)` | Garis grid |

### Warna Aksen Sekunder
| Token | Hex | Penggunaan |
|---|---|---|
| `--color-red-accent` | `#FF4D4D` | Error state, tag danger |
| `--color-green-accent` | `#22C55E` | Status "available", success |
| `--color-blue-accent` | `#3B82F6` | Link, info tag |
| `--color-pink-sticker` | `#FFB3C6` | Stiker dekoratif |

### Dark Section (Footer / CTA besar)
| Token | Hex | Penggunaan |
|---|---|---|
| `--color-dark-bg` | `#0F0F1A` | Footer background |
| `--color-dark-surface` | `#1A1A2E` | Card di dark section |
| `--color-dark-text` | `#F0F0E8` | Teks di dark mode |
| `--color-dark-muted` | `rgba(240,240,232,0.5)` | Teks muted di dark |

---

## 4. TIPOGRAFI

### Google Fonts yang digunakan

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?
  family=Pixelify+Sans:wght@400;500;600;700&
  family=Silkscreen:wght@400;700&
  family=Caveat:wght@400;500;600;700&
  family=Kalam:wght@300;400;700&
  family=Space+Mono:ital,wght@0,400;0,700;1,400&
  family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&
  display=swap" rel="stylesheet">
```

### Type Scale & Penggunaan

| Role | Font Family | Weight | Size | Penggunaan |
|---|---|---|---|---|
| **Pixel Display** | `Pixelify Sans` | 700 | `clamp(40px, 6vw, 80px)` | Nama di Hero, heading besar |
| **Pixel Label** | `Silkscreen` | 400/700 | `11px-14px` | Section label, badge pixel |
| **Handwriting Body** | `Caveat` | 400-600 | `16px-22px` | Deskripsi, bio, notes |
| **Handwriting Accent** | `Kalam` | 400/700 | `14px-18px` | Sticky notes, annotations |
| **Mono Code** | `Space Mono` | 400/700 | `12px-15px` | Tech tags, code snippets |
| **Mono UI** | `JetBrains Mono` | 400/500 | `12px-14px` | Timestamps, file paths |

### CSS Variables

```css
:root {
  --font-pixel: 'Pixelify Sans', 'Silkscreen', monospace;
  --font-pixel-label: 'Silkscreen', monospace;
  --font-hand: 'Caveat', 'Kalam', cursive;
  --font-hand-alt: 'Kalam', cursive;
  --font-mono: 'Space Mono', 'JetBrains Mono', monospace;
  --font-mono-ui: 'JetBrains Mono', monospace;
}
```

---

## 5. KOMPONEN UI

### 5.1 NAVBAR

**Tampilan:** Bar tipis di atas dengan background transparan / semi-transparan ketika di-scroll.
Berisi logo pixel di kiri, nav links di tengah, dan tombol CTA di kanan.

```
+------------------------------------------------------------+
|  [DR]  About  Projects  Skills  Experience  Contact  [Hire] |
+------------------------------------------------------------+
```

**Spesifikasi:**
- Background: `transparent` lalu `rgba(245,245,238,0.90)` + `backdrop-filter: blur(12px)` saat scroll
- Border bawah: `1px solid rgba(0,0,0,0.08)`
- Logo: font `Pixelify Sans` bold, warna `#1A1A1A`, dot aksen kuning
- Nav links: font `Space Mono`, size `13px`, warna `#5A5A6A` hover `#1A1A1A`
- CTA button: background `#FFD60A`, padding `8px 18px`, border-radius `6px`, font `Silkscreen`

```css
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: background 0.3s, backdrop-filter 0.3s;
  padding: 0 40px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav.scrolled {
  background: rgba(245, 245, 238, 0.90);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.nav-logo {
  font-family: 'Pixelify Sans', monospace;
  font-size: 20px;
  font-weight: 700;
  color: #1A1A1A;
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-logo-dot {
  width: 6px;
  height: 6px;
  background: #FFD60A;
  /* pixel style - no border-radius */
  margin-left: 3px;
  margin-bottom: 8px;
}

.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
}

.nav-link {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: #5A5A6A;
  text-decoration: none;
  text-transform: lowercase;
  transition: color 0.15s;
}

.nav-link:hover { color: #1A1A1A; }

.nav-cta {
  font-family: 'Silkscreen', monospace;
  font-size: 11px;
  padding: 8px 16px;
  background: #FFD60A;
  color: #1A1A1A;
  border: 2px solid #1A1A1A;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 3px 3px 0 #1A1A1A;
  transition: transform 0.1s, box-shadow 0.1s;
  text-decoration: none;
}

.nav-cta:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 #1A1A1A;
}
```

---

### 5.2 HERO SECTION

**Konsep:** Layout asimetris — teks besar di kiri, avatar/foto dalam "frame stiker" di kanan.
Background adalah paper grid dengan beberapa elemen dekoratif mengambang.

```
+------------------------------------------------------------+
|  [*] [*] [*]  [pixel toolbar]                             |
|                                                            |
|  (O) Open to work                                          |
|                                                            |
|  OURRAIS              +----------------+                   |
|  RAHMATULLAH          |   [  foto  ]   | <- border stiker  |
|  ------------         |                |                   |
|  [Frontend Dev]       |   avatar       |                   |
|                       +----------------+                   |
|  Deskripsi handwriting..  [sticky note kecil]             |
|                                                            |
|  [> View Work]  [v CV]    [stat] [stat] [stat]           |
+------------------------------------------------------------+
```

#### Pixel Toolbar (pojok kiri atas)
```css
.pixel-toolbar {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #1A1A1A;
  border-radius: 4px;
  font-family: var(--font-pixel-label);
}

.toolbar-dot {
  width: 8px;
  height: 8px;
  border-radius: 0; /* pixel style - no rounding */
}
.toolbar-dot.red    { background: #FF5F57; }
.toolbar-dot.yellow { background: #FFBD2E; }
.toolbar-dot.green  { background: #28CA41; }
```

#### Heading Utama
```css
.hero-name {
  font-family: 'Pixelify Sans', monospace;
  font-size: clamp(48px, 6vw, 88px);
  font-weight: 700;
  line-height: 0.95;
  color: #1A1A1A;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}
```

#### Label Role (pixel badge)
```css
.hero-role-badge {
  display: inline-block;
  font-family: 'Silkscreen', monospace;
  font-size: 11px;
  padding: 4px 10px;
  background: #FFD60A;
  color: #1A1A1A;
  border-radius: 0; /* pixel style */
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: 2px solid #1A1A1A;
}
```

#### Avatar Frame (stiker style)
```css
.hero-avatar-frame {
  position: relative;
  width: clamp(180px, 22vw, 280px);
  aspect-ratio: 3/4;
  border-radius: 12px;
  overflow: hidden;
  border: 3px solid #1A1A1A;
  box-shadow: 5px 5px 0px #FFD60A; /* pixel shadow offset */
  transform: rotate(2deg); /* slight tilt, stiker effect */
}

.hero-avatar-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.05) saturate(0.95);
}
```

#### Status Badge (mengambang di dekat foto)
```css
.status-badge {
  position: absolute;
  font-family: 'Silkscreen', monospace;
  font-size: 10px;
  padding: 6px 10px;
  background: #22C55E;
  color: #fff;
  border-radius: 0;
  border: 2px solid #1A1A1A;
  box-shadow: 2px 2px 0 #1A1A1A;
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

#### CTA Buttons
```css
.btn-primary {
  font-family: 'Pixelify Sans', monospace;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 24px;
  background: #FFD60A;
  color: #1A1A1A;
  border: 2px solid #1A1A1A;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 4px 4px 0 #1A1A1A;
  transition: transform 0.1s, box-shadow 0.1s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #1A1A1A;
}

.btn-primary:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #1A1A1A;
}

.btn-secondary {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  padding: 12px 24px;
  background: transparent;
  color: #1A1A1A;
  border: 2px solid #1A1A1A;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary:hover {
  background: rgba(0,0,0,0.06);
}
```

#### Stats Row
```css
.hero-stats {
  display: flex;
  gap: 32px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px dashed #E2E2D8;
}

.stat-item .value {
  font-family: 'Pixelify Sans', monospace;
  font-size: 28px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1;
}

.stat-item .label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #5A5A6A;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 4px;
}
```

---

### 5.3 ABOUT / BIO SECTION

**Konsep:** Layout 2 kolom. Kiri: deskripsi panjang dengan font handwriting + highlight kuning.
Kanan: "fact cards" atau list bergaya sticky note.

#### Section Label (pixel style — dipakai di semua section)
```css
.section-label {
  font-family: 'Silkscreen', monospace;
  font-size: 11px;
  color: #5A5A6A;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 48px;
}

/* Icon pixel di depan */
.section-label-icon {
  color: #FFD60A;
  font-size: 14px;
}

/* Garis dekoratif setelah label */
.section-label-line {
  flex: 1;
  max-width: 60px;
  height: 1px;
  background: #E2E2D8;
}
```

#### Bio Text
```css
.bio-text {
  font-family: 'Caveat', cursive;
  font-size: 20px;
  line-height: 1.7;
  color: #2A2A2A;
}

.bio-text mark {
  background: #FFD60A;
  color: #1A1A1A;
  padding: 0 4px;
  border-radius: 2px;
}

.bio-heading {
  font-family: 'Pixelify Sans', monospace;
  font-size: clamp(28px, 3vw, 44px);
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.1;
  margin-bottom: 20px;
}
```

#### Quick Facts Card (sticky note style)
```css
.sticky-note {
  background: #FFF9D6;
  border: 1px solid #E6C000;
  border-radius: 4px;
  padding: 24px 20px 20px;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.12);
  position: relative;
}

/* Tape/selotip di atas */
.sticky-note::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 14px;
  background: rgba(255, 214, 10, 0.7);
  border-radius: 2px;
}

.sticky-note-title {
  font-family: 'Silkscreen', monospace;
  font-size: 10px;
  color: #5A5A6A;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px dashed rgba(0,0,0,0.15);
}

.fact-item {
  font-family: 'Kalam', cursive;
  font-size: 16px;
  color: #3A3A2A;
  padding: 8px 0;
  border-bottom: 1px dashed rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  gap: 10px;
}

.fact-item:last-child {
  border-bottom: none;
}
```

---

### 5.4 SKILLS / WHAT I DO SECTION

**Konsep:** Grid kartu skill dengan header pixel. Setiap kartu punya border hitam bold
dan shadow offset (pixel style). Layout 2-3 kolom.

#### Skill Card
```css
.skill-card {
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 4px 4px 0 #1A1A1A;
  transition: transform 0.15s, box-shadow 0.15s;
}

.skill-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #1A1A1A;
}

.skill-card-header {
  font-family: 'Pixelify Sans', monospace;
  font-size: 14px;
  font-weight: 700;
  color: #1A1A1A;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #E2E2D8;
}

.skill-card-icon {
  width: 28px;
  height: 28px;
  background: #FFD60A;
  border: 1px solid #1A1A1A;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.skill-list-item {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #5A5A6A;
  padding: 5px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px dotted rgba(0,0,0,0.06);
}

.skill-list-item:last-child { border-bottom: none; }

.skill-list-item::before {
  content: '>';
  color: #FFD60A;
  font-size: 10px;
  font-weight: 700;
}
```

---

### 5.5 PROJECTS / MADE THINGS SECTION

**Konsep:** Grid 3 kolom untuk kartu kecil, plus beberapa card full-width featured.
Kartu bergaya "polaroid" dengan thumbnail, judul pixel, deskripsi handwriting, dan tech tags mono.

#### Project Card (Polaroid / Stamp Style)
```css
.project-card {
  background: #FFFFFF;
  border: 1px solid #E2E2D8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  position: relative;
}

.project-card:hover {
  transform: translate(-2px, -4px) rotate(-0.5deg);
  box-shadow: 6px 8px 0 rgba(0,0,0,0.12);
}

.project-card-thumb {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
  border-bottom: 1px solid #E2E2D8;
  display: block;
  transition: filter 0.25s;
}

.project-card:hover .project-card-thumb {
  filter: contrast(1.08) saturate(1.05);
}

.project-card-body {
  padding: 14px 16px 16px;
}

.project-card-title {
  font-family: 'Pixelify Sans', monospace;
  font-size: 14px;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 6px;
  line-height: 1.2;
}

.project-card-desc {
  font-family: 'Caveat', cursive;
  font-size: 15px;
  color: #5A5A6A;
  line-height: 1.5;
  margin-bottom: 12px;
}

.project-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tech-tag {
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  padding: 3px 8px;
  background: #F0F0E8;
  border: 1px solid #E2E2D8;
  border-radius: 2px;
  color: #5A5A6A;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.tech-tag.yellow {
  background: #FFD60A;
  border-color: #E6C000;
  color: #1A1A1A;
}

/* Arrow link di pojok */
.project-card-link {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  background: #FFD60A;
  border: 1px solid #1A1A1A;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Silkscreen', monospace;
  font-size: 12px;
  color: #1A1A1A;
  text-decoration: none;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.2s, transform 0.2s;
}

.project-card:hover .project-card-link {
  opacity: 1;
  transform: scale(1);
}
```

#### Project Card Featured (Wide)
```css
.project-featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  border-radius: 12px;
  box-shadow: 6px 6px 0 #1A1A1A;
  overflow: hidden;
  min-height: 300px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-featured:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 #1A1A1A;
}

.project-featured-text {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-number {
  font-family: 'Silkscreen', monospace;
  font-size: 10px;
  color: #FFD60A;
  letter-spacing: 0.12em;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.project-featured-title {
  font-family: 'Pixelify Sans', monospace;
  font-size: clamp(22px, 2.5vw, 32px);
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 12px;
}

.project-featured-desc {
  font-family: 'Caveat', cursive;
  font-size: 18px;
  color: #5A5A6A;
  line-height: 1.6;
  margin-bottom: 20px;
}
```

---

### 5.6 EXPERIENCE & EDUCATION / TIMELINE

**Konsep:** Timeline vertikal dengan garis putus-putus kuning. Dot berbentuk kotak (pixel).
Entry card bergaya "catatan di buku agenda".

#### Timeline
```css
.timeline-wrapper {
  position: relative;
  padding-left: 36px;
}

.timeline-line {
  position: absolute;
  left: 10px;
  top: 12px;
  bottom: 0;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    #FFD60A 0px,
    #FFD60A 8px,
    transparent 8px,
    transparent 16px
  );
}

.timeline-item {
  position: relative;
  margin-bottom: 36px;
}

.timeline-dot {
  position: absolute;
  left: -30px;
  top: 16px;
  width: 14px;
  height: 14px;
  background: #FFD60A;
  border: 2px solid #1A1A1A;
  border-radius: 0; /* pixel square */
  box-shadow: 2px 2px 0 #1A1A1A;
}

.timeline-content {
  background: #FFFFFF;
  border: 1px solid #E2E2D8;
  border-radius: 8px;
  padding: 20px 24px;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.05);
  transition: box-shadow 0.15s;
}

.timeline-content:hover {
  box-shadow: 4px 4px 0 rgba(0,0,0,0.08);
}

.timeline-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.timeline-company {
  font-family: 'Pixelify Sans', monospace;
  font-size: 16px;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.2;
}

.timeline-role {
  font-family: 'Caveat', cursive;
  font-size: 16px;
  color: #5A5A6A;
  margin-top: 2px;
}

.timeline-period {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #5A5A6A;
  background: #F0F0E8;
  border: 1px solid #E2E2D8;
  padding: 3px 10px;
  border-radius: 2px;
  white-space: nowrap;
  flex-shrink: 0;
}

.timeline-desc {
  font-family: 'Caveat', cursive;
  font-size: 17px;
  line-height: 1.65;
  color: #3A3A3A;
  margin-top: 10px;
  margin-bottom: 12px;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
```

---

### 5.7 CERTIFICATES SECTION

#### Certificate Card
```css
.cert-card {
  background: #FFFFFF;
  border: 1px solid #E2E2D8;
  border-radius: 10px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cert-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.10);
}

/* Seal/checkmark di pojok kanan atas */
.cert-seal {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 26px;
  height: 26px;
  background: #FFD60A;
  border: 2px solid #1A1A1A;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Silkscreen', monospace;
  font-size: 12px;
  color: #1A1A1A;
}

.cert-issuer-logo {
  height: 32px;
  width: auto;
  object-fit: contain;
  margin-bottom: 12px;
}

.cert-title {
  font-family: 'Pixelify Sans', monospace;
  font-size: 13px;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 6px;
  line-height: 1.3;
  padding-right: 32px; /* space for seal */
}

.cert-issuer-name {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #5A5A6A;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.cert-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px dashed #E2E2D8;
}

.cert-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: #5A5A6A;
}

.cert-verify-btn {
  font-family: 'Silkscreen', monospace;
  font-size: 9px;
  padding: 3px 8px;
  background: transparent;
  border: 1px solid #E2E2D8;
  border-radius: 2px;
  color: #5A5A6A;
  cursor: pointer;
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s;
}

.cert-verify-btn:hover {
  border-color: #FFD60A;
  color: #1A1A1A;
}
```

---

### 5.8 CONTACT SECTION

**Konsep:** Background kuning pucat, centered card dengan form bergaya pixel.
Input field dengan focus state kuning dan box-shadow offset.

#### Layout
```css
#contact {
  background-color: #FFF9D6;
  background-image:
    linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 24px 24px;
  padding: 100px 0;
}

.contact-card {
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  border-radius: 16px;
  padding: 56px 64px;
  max-width: 720px;
  margin: 0 auto;
  box-shadow: 8px 8px 0 #1A1A1A;
  position: relative;
}

.contact-heading {
  font-family: 'Pixelify Sans', monospace;
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 700;
  color: #1A1A1A;
  text-align: center;
  line-height: 1.1;
  margin-bottom: 12px;
}

.contact-subtext {
  font-family: 'Caveat', cursive;
  font-size: 20px;
  color: #5A5A6A;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 36px;
}
```

#### Form Elements
```css
.form-group { margin-bottom: 16px; }

.form-label {
  font-family: 'Silkscreen', monospace;
  font-size: 10px;
  color: #5A5A6A;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  background: #FAFAF5;
  border: 2px solid #E2E2D8;
  border-radius: 6px;
  padding: 12px 16px;
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  color: #1A1A1A;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #FFD60A;
  box-shadow: 3px 3px 0 #FFD60A;
}

.form-input::placeholder {
  font-family: 'Caveat', cursive;
  font-size: 17px;
  color: #BCBCB0;
}

.form-textarea {
  resize: none;
  min-height: 140px;
  line-height: 1.6;
}
```

#### Submit Button
```css
.btn-submit {
  width: 100%;
  background: #FFD60A;
  color: #1A1A1A;
  border: 2px solid #1A1A1A;
  border-radius: 6px;
  padding: 16px 24px;
  font-family: 'Pixelify Sans', monospace;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 4px 4px 0 #1A1A1A;
  transition: transform 0.1s, box-shadow 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
}

.btn-submit:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #1A1A1A;
}

.btn-submit:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #1A1A1A;
}
```

#### Contact Info Row
```css
.contact-info-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 32px;
}

.contact-info-item {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: #5A5A6A;
  display: flex;
  align-items: center;
  gap: 6px;
}

.contact-divider {
  width: 1px;
  height: 16px;
  background: #E2E2D8;
}
```

---

### 5.9 FOOTER

```css
footer {
  background-color: #0F0F1A;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 24px 24px;
  padding: 60px 0 32px;
  color: rgba(240, 240, 232, 0.6);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.footer-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 48px;
  gap: 40px;
}

.footer-logo {
  font-family: 'Pixelify Sans', monospace;
  font-size: 22px;
  font-weight: 700;
  color: #F0F0E8;
  display: flex;
  align-items: flex-start;
  gap: 2px;
  margin-bottom: 10px;
}

.footer-logo-dot {
  width: 5px;
  height: 5px;
  background: #FFD60A;
  margin-top: 4px;
  margin-left: 2px;
}

.footer-tagline {
  font-family: 'Caveat', cursive;
  font-size: 16px;
  color: rgba(240,240,232,0.4);
  max-width: 260px;
  line-height: 1.5;
}

.footer-nav-section-title {
  font-family: 'Silkscreen', monospace;
  font-size: 9px;
  color: rgba(240,240,232,0.3);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 16px;
}

.footer-nav-link {
  display: block;
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: rgba(240,240,232,0.5);
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.15s;
}

.footer-nav-link:hover { color: #FFD60A; }

.footer-divider {
  height: 1px;
  background: rgba(255,255,255,0.06);
  margin: 32px 0;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-copy {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: rgba(240,240,232,0.3);
}

.footer-made-with {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: rgba(240,240,232,0.25);
  display: flex;
  align-items: center;
  gap: 4px;
}

.footer-made-with span { color: #FFD60A; }
```

---

## 6. DEKORATIF ELEMEN

### 6.1 Elemen Floating / Dekoratif

```css
/* Arrow annotation handwriting */
.deco-arrow {
  font-family: 'Caveat', cursive;
  font-size: 14px;
  color: #5A5A6A;
  position: absolute;
  pointer-events: none;
  transform: rotate(-8deg);
  user-select: none;
}

/* Pixel star/sparkle */
.deco-star {
  font-family: 'Silkscreen', monospace;
  font-size: 16px;
  color: #FFD60A;
  position: absolute;
  pointer-events: none;
}

/* Tape (selotip kuning menempel di atas kartu) */
.tape {
  position: absolute;
  top: -8px;
  left: 20px;
  width: 56px;
  height: 16px;
  background: rgba(255, 214, 10, 0.65);
  border-radius: 2px;
  transform: rotate(-1.5deg);
  z-index: 1;
}

/* Wavy underline annotation */
.wavy-mark {
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-color: #FFD60A;
  text-underline-offset: 4px;
}

/* Highlighted text (marker pen style) */
.marker-highlight {
  background: linear-gradient(transparent 50%, #FFD60A 50%);
  padding: 0 2px;
}
```

### 6.2 Floating Tech Icons (Hero Background)

```css
.floating-icons-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.floating-icon {
  position: absolute;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.10);
  box-shadow: 2px 2px 0 rgba(0,0,0,0.10);
  animation: float-icon var(--float-duration, 4s) ease-in-out infinite;
  animation-delay: var(--float-delay, 0s);
  opacity: var(--float-opacity, 0.7);
}

@keyframes float-icon {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
```

### 6.3 Callout / Sticky Note Box

```css
.callout {
  background: #FFF9D6;
  border-left: 4px solid #FFD60A;
  border-radius: 0 6px 6px 0;
  padding: 14px 18px;
  font-family: 'Kalam', cursive;
  font-size: 16px;
  color: #3A3A2A;
  position: relative;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.06);
  margin: 24px 0;
}

.callout-label {
  font-family: 'Silkscreen', monospace;
  font-size: 9px;
  color: #E6C000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 6px;
}
```

---

## 7. ANIMASI & MICRO-INTERACTIONS

### 7.1 Scroll Reveal (IntersectionObserver)

```javascript
// Tambahkan class 'reveal' ke elemen
// JS untuk trigger:
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
```

### 7.2 Pixel Press Button Effect

```css
.btn-pixel-press {
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  box-shadow: 4px 4px 0 #1A1A1A;
}

.btn-pixel-press:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #1A1A1A;
}

.btn-pixel-press:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #1A1A1A;
}
```

### 7.3 Card Pixel Lift

```css
.card-pixel-lift {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.12);
}

.card-pixel-lift:hover {
  transform: translate(-2px, -3px);
  box-shadow: 5px 5px 0 rgba(0,0,0,0.15);
}
```

### 7.4 Pixel Cursor Blink

```css
.pixel-cursor::after {
  content: '_';
  font-family: 'Silkscreen', monospace;
  color: #FFD60A;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

### 7.5 Typewriter Effect (untuk heading hero)

```javascript
// Astro/JSX usage pattern
function typeWriter(element, text, speed = 80) {
  let i = 0;
  element.textContent = '';
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i++);
    } else {
      clearInterval(timer);
    }
  }, speed);
}
```

---

## 8. LAYOUT GRID SYSTEM

### Container
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (min-width: 768px)  { .container { padding: 0 40px; } }
@media (min-width: 1280px) { .container { padding: 0 64px; } }
```

### Section Padding
```css
.section-padding {
  padding: 80px 0;
}

@media (min-width: 768px)  { .section-padding { padding: 100px 0; } }
@media (min-width: 1280px) { .section-padding { padding: 120px 0; } }
```

### Grid Helpers
```css
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}

@media (max-width: 1024px) {
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}
```

---

## 9. IMPLEMENTASI CSS GLOBAL LENGKAP

Ganti/update `src/styles/global.css` dengan blok berikut:

```css
/* === PAPER GRAPH PORTFOLIO THEME === */

/* 1. Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Silkscreen:wght@400;700&family=Caveat:wght@400;500;600;700&family=Kalam:wght@300;400;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap');

/* 2. Design Tokens */
:root {
  /* Colors */
  --color-bg:          #F5F5EE;
  --color-paper:       #FEFEFE;
  --color-carbon:      #1A1A1A;
  --color-slate:       #5A5A6A;
  --color-yellow:      #FFD60A;
  --color-yellow-dark: #E6C000;
  --color-yellow-pale: #FFF9D6;
  --color-border:      #E2E2D8;
  --color-grid:        rgba(0, 0, 0, 0.06);
  --color-dark-bg:     #0F0F1A;
  --color-green:       #22C55E;

  /* Typography */
  --font-pixel:       'Pixelify Sans', monospace;
  --font-pixel-label: 'Silkscreen', monospace;
  --font-hand:        'Caveat', cursive;
  --font-hand-alt:    'Kalam', cursive;
  --font-mono:        'Space Mono', monospace;
  --font-mono-ui:     'JetBrains Mono', monospace;

  /* Shadows (pixel offset style) */
  --shadow-pixel-sm: 2px 2px 0 var(--color-carbon);
  --shadow-pixel:    4px 4px 0 var(--color-carbon);
  --shadow-pixel-lg: 6px 6px 0 var(--color-carbon);
  --shadow-yellow:   4px 4px 0 var(--color-yellow);

  /* Spacing */
  --section-pad: 100px;
}

/* 3. Reset & Base */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; font-size: 16px; }

body {
  background-color: var(--color-bg);
  background-image:
    linear-gradient(var(--color-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-grid) 1px, transparent 1px);
  background-size: 24px 24px;
  color: var(--color-carbon);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

img { max-width: 100%; height: auto; display: block; }
a { color: inherit; }
button { cursor: pointer; }

/* 4. Custom Scrollbar */
::-webkit-scrollbar        { width: 8px; }
::-webkit-scrollbar-track  { background: var(--color-bg); }
::-webkit-scrollbar-thumb  { background: var(--color-yellow); }
::-webkit-scrollbar-thumb:hover { background: var(--color-yellow-dark); }
```

---

## 10. CHECKLIST ELEMEN DARI GAMBAR REFERENSI

### Navbar
- [ ] Logo pixel (inisial) dengan dot kuning pixel
- [ ] Nav links dalam Space Mono lowercase
- [ ] CTA "Hire Me" button kuning dengan border hitam + shadow

### Hero
- [ ] Pixel toolbar (3 dot merah/kuning/hijau) di pojok atas
- [ ] Status badge "Open to work" dengan dot hijau berkedip
- [ ] Nama dalam Pixelify Sans uppercase, heading sangat besar
- [ ] Role badge kuning pixel "[Frontend Dev]"
- [ ] Bio singkat dalam font Caveat
- [ ] Avatar foto dalam frame dengan border hitam + shadow offset kuning + slight tilt
- [ ] Floating tech icons (JS, TS, React, etc.) di background
- [ ] Stats: tahun pengalaman, jumlah proyek, klien
- [ ] CTA buttons: "View Work" (kuning) + "Download CV" (outline)

### About
- [ ] Section label "about me" dengan icon pixel + garis dekoratif
- [ ] Teks bio dalam Caveat dengan highlight kuning pada kata penting
- [ ] Sticky note "Quick Facts" dengan tape selotip di atas

### Skills
- [ ] Section label "what i do"
- [ ] Grid skill cards dengan border hitam bold + shadow pixel offset
- [ ] Icon category dalam kotak kuning
- [ ] Skill list dengan ">" bullet pixel

### Projects
- [ ] Section label "made things"
- [ ] Grid 3 kolom project cards bergaya polaroid
- [ ] Thumbnail 16:10 dengan hover zoom subtle
- [ ] Judul pixel, deskripsi Caveat, tags Space Mono
- [ ] Arrow link muncul saat hover
- [ ] Featured projects dengan border bold + shadow besar

### Experience & Education
- [ ] Section label "experience & education"
- [ ] Timeline vertikal dengan garis putus-putus kuning
- [ ] Dot kotak (pixel) kuning dengan border hitam
- [ ] Entry cards: company pixel, role Caveat, period badge mono
- [ ] Tags skill di setiap entry

### Certificates
- [ ] Grid certificate cards
- [ ] Seal/checkmark di pojok kuning
- [ ] Logo issuer, judul pixel, issuer mono
- [ ] Tombol "Verify" kecil

### Contact
- [ ] Background kuning pucat dengan grid
- [ ] Card centered dengan border hitam bold + shadow besar
- [ ] Heading pixel, sub-teks Caveat
- [ ] Info kontak (email + lokasi)
- [ ] Form dengan input pixel-style (focus = border kuning + shadow kuning)
- [ ] Submit button kuning full-width dengan pixel press effect

### Footer
- [ ] Background dark (#0F0F1A) dengan grid putih tipis
- [ ] Logo pixel + dot kuning
- [ ] Tagline Caveat
- [ ] Nav columns: Navigation + Social
- [ ] Divider tipis
- [ ] Copyright + "Made with ♥" dalam JetBrains Mono

---

## 11. FILE YANG PERLU DIMODIFIKASI

```
src/
├── styles/
│   └── global.css              <- GANTI: CSS Variables, paper grid, base styles
├── layouts/
│   └── Layout.astro            <- UPDATE: tambah Google Fonts link
├── components/
│   ├── layout/
│   │   ├── Navbar.astro        <- REDESIGN: pixel style navbar
│   │   └── Footer.astro        <- REDESIGN: dark paper grid footer
│   └── sections/
│       ├── Hero.tsx            <- REDESIGN: pixel + handwriting hybrid
│       ├── About.astro         <- REDESIGN: sticky note + Caveat
│       ├── Skills.astro        <- REDESIGN: pixel border skill cards
│       ├── FeaturedProjects.astro  <- REDESIGN: polaroid + featured cards
│       ├── Experience.astro    <- REDESIGN: pixel timeline
│       ├── Certificates.astro  <- REDESIGN: cert cards dengan seal
│       └── Contact.astro       <- REDESIGN: pixel form + centered card
```

---

*Design System v1.0 — Paper Graph Portfolio*
*Dibuat: Oktober 2026 | Font: Pixelify Sans + Silkscreen + Caveat + Kalam + Space Mono + JetBrains Mono*
