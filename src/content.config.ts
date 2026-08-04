import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Astro Content Collections (v5 API)
 * Konten disimpan sebagai file Markdown di src/content/
 *
 * Docs: https://docs.astro.build/en/guides/content-collections/
 * Note: Astro v5 menggunakan loader API (glob/file) — berbeda dari v4
 */

// ─── PROJECTS ────────────────────────────────────────────────────────────────
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    result: z.string().optional(),
    technology: z.array(z.string()),
    liveUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    cover: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    publishDate: z.date().optional(),
  }),
});

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string().optional(),
    type: z.enum(['full-time', 'part-time', 'internship', 'freelance']).default('full-time'),
    order: z.number().default(99),
  }),
});

// ─── EDUCATION ────────────────────────────────────────────────────────────────
const education = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    gpa: z.string().optional(),
    order: z.number().default(99),
  }),
});

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────
const certificates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/certificates' }),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    issueDate: z.string(),
    expiryDate: z.string().optional(),
    credentialUrl: z.string().url().optional(),
    cover: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { projects, experience, education, certificates };
