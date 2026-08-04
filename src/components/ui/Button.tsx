import React from 'react';

/**
 * Button.tsx — React Component
 * Tombol utama sesuai Creative Direction:
 *  - Rounded (16px)
 *  - Medium size
 *  - Carbon bg atau Lime accent
 *  - Hover: lift sedikit, shadow lembut, transition halus
 *
 * Variants:
 *  - primary: Carbon background, white text (CTA utama)
 *  - accent:  Lime background, dark text (CTA sekunder)
 *  - outline: Border carbon, transparent bg
 *  - ghost:   Transparent, underline on hover
 */

type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;       // Jika diisi, render sebagai <a>
  external?: boolean;  // Tambahkan target="_blank" jika href eksternal
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-text-primary text-white border border-text-primary',
    'hover:bg-text-secondary hover:border-text-secondary',
    'shadow-button hover:shadow-button-hover',
  ].join(' '),

  accent: [
    'bg-accent text-text-primary border border-accent',
    'hover:bg-accent-hover hover:border-accent-hover',
    'shadow-button hover:shadow-button-hover',
  ].join(' '),

  outline: [
    'bg-transparent text-text-primary border border-border',
    'hover:border-text-primary hover:bg-bg-secondary',
  ].join(' '),

  ghost: [
    'bg-transparent text-text-primary border border-transparent',
    'hover:text-text-secondary',
    'underline-offset-4 hover:underline',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-body font-medium
    rounded-button
    transition-all duration-300
    cursor-pointer
    select-none
    focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
    active:scale-[0.98]
    hover:-translate-y-0.5
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `;

  // Render sebagai link jika ada href
  if (href) {
    return (
      <a
        href={href}
        className={baseStyles}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={baseStyles} {...props}>
      {children}
    </button>
  );
}

export default Button;
