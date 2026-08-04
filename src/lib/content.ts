import { getCollection } from 'astro:content';

/**
 * Content Collection Helpers
 * Fungsi utility untuk mengambil & memfilter konten dari Astro Content Collections.
 *
 * Dipakai oleh section components: * Semua konten (project, experience, education, certificate) disimpan sebagai Markdown.
 * Schema defined di src/content.config.ts (Astro v5 API).
 */

// ─── PROJECTS ────────────────────────────────────────────────────────────────

/** Ambil semua project, sorted by order */
export async function getAllProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** Ambil hanya project yang featured (untuk homepage) */
export async function getFeaturedProjects() {
  const projects = await getCollection('projects', ({ data }) => data.featured);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

/** Ambil semua experience, sorted by order (terbaru dulu) */
export async function getAllExperience() {
  const experience = await getCollection('experience');
  return experience.sort((a, b) => a.data.order - b.data.order);
}

// ─── EDUCATION ────────────────────────────────────────────────────────────────

/** Ambil semua education, sorted by order */
export async function getAllEducation() {
  const education = await getCollection('education');
  return education.sort((a, b) => a.data.order - b.data.order);
}

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────

/** Ambil semua certificates, sorted by order */
export async function getAllCertificates() {
  const certificates = await getCollection('certificates');
  return certificates.sort((a, b) => a.data.order - b.data.order);
}
