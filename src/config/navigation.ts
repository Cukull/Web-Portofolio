/**
 * Navigation Configuration
 * Daftar item di navbar.
 * Setiap item: label tampilan + href anchor ke section.
 */
export const navItems = [
  { label: 'About',      href: '#about'      },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
] as const;

export type NavItem = typeof navItems[number];
