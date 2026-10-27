import * as React from 'react';
import {
  FloatingIconsHero,
  type FloatingIconsHeroProps,
} from '@/components/ui/floating-icons-hero-section';

// --- Tech Stack & Brand SVG Icons (matching your previous Hero screenshot) ---

export const IconJS = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#F7DF1E" rx="4"/>
    <path d="M20.8 22.4c.4.7.9 1.2 1.8 1.2.8 0 1.3-.4 1.3-1 0-.7-.5-1-1.4-1.4l-.5-.2c-1.4-.6-2.3-1.3-2.3-2.9 0-1.4 1.1-2.5 2.8-2.5 1.2 0 2.1.4 2.7 1.5l-1.5.9c-.3-.6-.6-.8-1.2-.8s-.9.4-.9.8c0 .6.3.8 1.2 1.2l.5.2c1.6.7 2.5 1.4 2.5 3 0 1.7-1.4 2.6-3.2 2.6-1.8 0-2.9-.9-3.5-2l1.7-1zM12.4 22.6c.3.5.6.9 1.2.9.6 0 1-.2 1-1.2v-6.6h2v6.6c0 2-1.2 2.9-3 2.9-1.6 0-2.5-.8-3-1.8l1.8-1z" fill="#000"/>
  </svg>
);

export const IconTS = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#3178C6" rx="4"/>
    <path d="M18 18.4v1.5c.2.1.5.2.8.3.3.1.7.1 1 .1.3 0 .7 0 1-.1.3-.1.6-.2.8-.4.2-.2.4-.4.5-.7.1-.3.2-.6.2-1 0-.3 0-.6-.1-.8-.1-.2-.2-.4-.4-.6-.2-.2-.4-.3-.6-.4-.2-.1-.5-.3-.8-.4-.2-.1-.4-.2-.5-.3-.1-.1-.2-.2-.3-.3-.1-.1-.1-.2-.1-.4 0-.1 0-.2.1-.3.1-.1.1-.2.2-.2.1-.1.2-.1.3-.2.1 0 .3-.1.4-.1.1 0 .3 0 .4 0 .1 0 .3 0 .4.1.1 0 .3.1.4.1.1.1.3.1.4.2v-1.4c-.2-.1-.5-.1-.7-.2-.3 0-.5-.1-.8-.1-.3 0-.6 0-.9.1-.3.1-.6.2-.8.4-.2.2-.4.4-.6.7-.1.3-.2.6-.2.9 0 .5.1.9.4 1.2.3.3.7.6 1.3.9.2.1.4.2.6.3.2.1.3.2.4.3.1.1.2.2.2.3.1.1.1.2.1.3 0 .1 0 .2-.1.3-.1.1-.1.2-.2.3-.1.1-.2.1-.4.2-.1 0-.3.1-.4.1-.3 0-.6-.1-.9-.2-.3-.1-.5-.3-.7-.5zm-5.5-4.5H14v-1.5H9v1.5h2.5V25H12.5V13.9z" fill="#fff"/>
  </svg>
);

export const IconReact = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#20232A" rx="4"/>
    <circle cx="16" cy="16" r="2.5" fill="#61DAFB"/>
    <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
    <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 16 16)"/>
    <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 16 16)"/>
  </svg>
);

export const IconVue = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#35495E" rx="4"/>
    <polygon points="16,24 6,9 10,9 16,19 22,9 26,9" fill="#41B883"/>
    <polygon points="16,22 11,10 13,10 16,16.5 19,10 21,10" fill="#41B883"/>
  </svg>
);

export const IconNextJS = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#000" rx="4"/>
    <path d="M13 11h-4v10h1.8v-3.6l2.2 3.6h2l-2.5-4c1.3-.4 2.2-1.4 2.2-3s-1-3-1.7-3zm-2.2 5V12.4h.5c.8 0 1.4.6 1.4 1.8S12 15.9 11.3 16H10.8zM22 11l-3.5 5.5V21H17v-4.5L13.5 11H15.5l2 3.3 2-3.3H22z" fill="#fff"/>
  </svg>
);

export const IconNodeJS = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#339933" rx="4"/>
    <path d="M16 7L7 12v10l9 5 9-5V12L16 7z" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M16 10.5v11M10.5 13.5L16 16.5 21.5 13.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

export const IconPython = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#3776AB" rx="4"/>
    <path d="M16 7c-3.5 0-5 1.2-5 3v2h5v.5h-7c-1.7 0-3 1.3-3 3v4c0 1.7 1.3 3 3 3h1.5v-2.5c0-1.7 1.3-3 3-3h5c1.5 0 2.5-1 2.5-2.5v-5C21 8.2 19.5 7 16 7zm-1.5 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#FFD43B"/>
    <path d="M16 25c3.5 0 5-1.2 5-3v-2h-5v-.5h7c1.7 0 3-1.3 3-3v-4c0-1.7-1.3-3-3-3h-1.5v2.5c0 1.7-1.3 3-3 3h-5c-1.5 0-2.5 1-2.5 2.5v5C11 23.8 12.5 25 16 25zm1.5-2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#fff"/>
  </svg>
);

export const IconGit = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#F05032" rx="4"/>
    <path d="M28.2 14.8L17.2 3.8c-.9-.9-2.4-.9-3.3 0l-2.3 2.3 2.9 2.9c.7-.2 1.5 0 2.1.5.6.6.8 1.4.5 2.1l2.8 2.8c.7-.2 1.5 0 2.1.5.9.9.9 2.4 0 3.3-.9.9-2.4.9-3.3 0-.6-.6-.8-1.5-.5-2.2l-2.6-2.6v6.9c.2.1.4.2.6.4.9.9.9 2.4 0 3.3-.9.9-2.4.9-3.3 0-.9-.9-.9-2.4 0-3.3.2-.2.5-.4.8-.5V13.5c-.3-.1-.6-.3-.8-.5-.6-.6-.8-1.5-.5-2.2L10.4 8l-6.6 6.6c-.9.9-.9 2.4 0 3.3l11 11c.9.9 2.4.9 3.3 0l10-10c.9-.8.9-2.3.1-3.1z" fill="#fff"/>
  </svg>
);

export const IconFigma = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#1E1E1E" rx="4"/>
    <rect x="10" y="7" width="6" height="6" rx="3" fill="#F24E1E"/>
    <rect x="16" y="7" width="6" height="6" rx="3" fill="#FF7262"/>
    <rect x="10" y="13" width="6" height="6" rx="3" fill="#A259FF"/>
    <rect x="16" y="13" width="6" height="6" rx="3" fill="#1ABCFE"/>
    <rect x="10" y="19" width="6" height="6" rx="3" fill="#0ACF83"/>
  </svg>
);

export const IconDocker = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#2496ED" rx="4"/>
    <path d="M8 16h2v2H8zM11 16h2v2h-2zM14 16h2v2h-2zM17 16h2v2h-2zM11 13h2v2h-2zM14 13h2v2h-2zM17 13h2v2h-2zM14 10h2v2h-2z" fill="#fff"/>
    <path d="M25 16.8c-.3-.2-.9-.3-1.4-.2-.1-.6-.5-1.2-1-1.5l-.3-.2-.2.3c-.3.5-.4 1.3-.2 1.9-.3.1-.7.3-1.1.3H5.3c-.2.9 0 1.9.5 2.7.5.8 1.4 1.3 2.4 1.6 1.1.2 2.3.3 3.4.2.6 0 1.3-.1 1.9-.3.8-.2 1.5-.7 2.1-1.2.4.3.9.4 1.4.4h1.5l.1-.2c.3-.7.4-1.5.2-2.2l-.3-.9c.4.3.8.5 1.3.5.5 0 1-.2 1.3-.5.1-.1.2-.3.3-.5l.1-.3-.3-.2z" fill="#fff"/>
  </svg>
);

export const IconTailwind = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#06B6D4" rx="4"/>
    <path d="M9 13c1-4 3.5-6 7-6 5 0 5.5 4 9 4.5-1 4-3.5 6-7 6-5 0-5.5-4-9-4.5zm-2 7.5c1-4 3.5-6 7-6 5 0 5.5 4 9 4.5-1 4-3.5 6-7 6-5 0-5.5-4-9-4.5z" fill="#fff" fillOpacity="0.9"/>
  </svg>
);

export const IconGraphQL = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#E10098" rx="4"/>
    <circle cx="16" cy="7.5" r="2" fill="#fff"/>
    <circle cx="25" cy="12.5" r="2" fill="#fff"/>
    <circle cx="25" cy="19.5" r="2" fill="#fff"/>
    <circle cx="16" cy="24.5" r="2" fill="#fff"/>
    <circle cx="7" cy="19.5" r="2" fill="#fff"/>
    <circle cx="7" cy="12.5" r="2" fill="#fff"/>
    <circle cx="16" cy="16" r="2.5" fill="#fff"/>
    <path d="M16 7.5L25 12.5M25 12.5V19.5M25 19.5L16 24.5M16 24.5L7 19.5M7 19.5V12.5M7 12.5L16 7.5" stroke="#fff" strokeWidth="1.2" fill="none"/>
  </svg>
);

export const IconPostgres = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#336791" rx="4"/>
    <path d="M22.5 12c0-3-2.9-5.5-6.5-5.5S9.5 9 9.5 12c0 2 1.1 3.8 2.8 4.9-.1.3-.2.6-.2.9 0 1 .6 1.9 1.5 2.4l-.1.3c-.3 1.5-.7 3.7 1 5h.2l.3-.1c.8-.6 1.1-2 1.2-3.2h.6c.1 1.2.4 2.6 1.2 3.2l.3.1h.2c1.7-1.3 1.3-3.5 1-5l-.1-.3c.9-.5 1.5-1.4 1.5-2.4 0-.3-.1-.6-.2-.9 1.7-1.1 2.8-2.9 2.8-4.9z" fill="#fff" opacity="0.9"/>
    <ellipse cx="14.5" cy="12.5" rx="1" ry="1.2" fill="#336791"/>
    <ellipse cx="17.5" cy="12.5" rx="1" ry="1.2" fill="#336791"/>
  </svg>
);

export const IconVercel = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#000" rx="4"/>
    <path d="M16 8L27 24H5L16 8z" fill="#fff"/>
  </svg>
);

export const IconGitHub = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#24292E" rx="4"/>
    <path d="M16 8C11.6 8 8 11.7 8 16.1c0 3.6 2.3 6.6 5.5 7.7.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.8.9 2.3.7.1-.5.3-.9.5-1.1-1.7-.2-3.5-.9-3.5-3.9 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3-1.8 3.7-3.5 3.9.3.2.5.7.5 1.4v2.1c0 .2.1.5.5.4 3.2-1.1 5.5-4.1 5.5-7.7C24 11.7 20.4 8 16 8z" fill="#fff"/>
  </svg>
);

export const IconGoogle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#fff" rx="4"/>
    <path d="M16.5 15v2.5h4.7c-.4 2.1-2.3 3.5-4.7 3.5-2.8 0-5-2.2-5-5s2.2-5 5-5c1.3 0 2.4.5 3.2 1.2l1.8-1.8C20.2 9.1 18.4 8.5 16.5 8.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5c4.3 0 7.2-3 7.2-7.3 0-.5 0-.9-.1-1.2H16.5z" fill="#4285F4"/>
  </svg>
);

// Define the 16 tech stack icons with their positions matching your screenshot
export const techStackIcons: FloatingIconsHeroProps['icons'] = [
  { id: 1,  icon: IconJS,       bg: '#F7DF1E', className: 'top-[18%] left-[2%]' },
  { id: 2,  icon: IconTS,       bg: '#3178C6', className: 'top-[38%] left-[4.5%]' },
  { id: 3,  icon: IconReact,    bg: '#20232A', className: 'top-[4%] left-[42%]' },
  { id: 4,  icon: IconVue,      bg: '#35495E', className: 'top-[64%] left-[2.5%]' },
  { id: 5,  icon: IconNextJS,   bg: '#000000', className: 'top-[80%] left-[6%]' },
  { id: 6,  icon: IconNodeJS,   bg: '#339933', className: 'top-[6%] right-[14%]' },
  { id: 7,  icon: IconPython,   bg: '#3776AB', className: 'top-[22%] right-[3%]' },
  { id: 8,  icon: IconGit,      bg: '#F05032', className: 'top-[42%] right-[4.5%]' },
  { id: 9,  icon: IconFigma,    bg: '#1E1E1E', className: 'top-[60%] right-[3%]' },
  { id: 10, icon: IconDocker,   bg: '#2496ED', className: 'top-[77%] right-[5.5%]' },
  { id: 11, icon: IconTailwind, bg: '#06B6D4', className: 'bottom-[6%] left-[30%]' },
  { id: 12, icon: IconGraphQL,  bg: '#E10098', className: 'top-[3%] left-[25%]' },
  { id: 13, icon: IconPostgres, bg: '#336791', className: 'bottom-[5%] right-[13%]' },
  { id: 14, icon: IconVercel,   bg: '#000000', className: 'bottom-[5%] left-[46%]' },
  { id: 15, icon: IconGitHub,   bg: '#24292E', className: 'top-[3%] right-[29%]' },
  { id: 16, icon: IconGoogle,   bg: '#FFFFFF', className: 'top-[53%] left-[4%]' },
];

export default function FloatingIconsHeroDemo() {
  return (
    <FloatingIconsHero
      title="A World of Innovation"
      subtitle="Explore a universe of possibilities with our platform, connecting you to the tools and technologies that shape the future."
      ctaText="Join the Revolution"
      ctaHref="#projects"
      icons={techStackIcons}
    />
  );
}
