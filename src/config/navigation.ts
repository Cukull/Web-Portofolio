/**
 * Navigation Configuration
 * Daftar item navbar sekarang berasal dari Site Settings di Keystatic.
 */
import siteData from '../content/singletons/site.json';

export const navItems = siteData.navigation;

export type NavItem = (typeof navItems)[number];
