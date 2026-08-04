import React from 'react';

/**
 * Badge.tsx — React Component
 * Skill tag / technology badge.
 * Menggunakan Tag/Badge (BUKAN progress bar) — sesuai Creative Direction & PRD.
 *
 * Variants:
 *  - default: background abu-abu halus
 *  - accent: background Lime (digunakan sparingly)
 *  - outline: hanya border
 */

type BadgeVariant = 'default' | 'accent' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-bg-secondary text-text-secondary border border-border',
  accent:  'bg-accent text-text-primary border border-accent font-medium',
  outline: 'bg-transparent text-text-secondary border border-border hover:border-text-secondary',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        text-sm font-body
        rounded-full
        transition-colors duration-150
        whitespace-nowrap
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;
