/**
 * Site Configuration
 * Sumber utama: src/content/singletons/site.json (diedit lewat /keystatic).
 * File ini hanya menyiapkan fallback & bentuk akhir yang dipakai komponen.
 */
import siteData from '../content/singletons/site.json';

const resumeFile = siteData.resumeFile || '';
const resumeUrl = resumeFile || siteData.resumeUrl || '/cv.pdf';

export const siteConfig = {
  ...siteData,
  resumeFile,
  resumeUrl,
  music: {
    ...siteData.music,
    src: siteData.music.src || '',
  },
};

export type SiteConfig = typeof siteConfig;
