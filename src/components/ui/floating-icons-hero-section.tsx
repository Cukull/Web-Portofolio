import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

// Interface for the props of each individual icon.
export interface IconProps {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string; // Used for custom positioning of the icon.
  bg?: string;
}

// Interface for the main hero component's props.
export interface FloatingIconsHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  icons: IconProps[];
  children?: React.ReactNode;
}

// A single icon component with its own motion logic
const Icon = ({
  mouseX,
  mouseY,
  iconData,
  index,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: IconProps;
  index: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Motion values for the icon's position, with spring physics for smooth movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        );

        // If the cursor is close enough, repel the icon
        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          );
          // The closer the cursor, the stronger the repulsion
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          // Return to original position when cursor is away
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  // Ikon sengaja tidak pakai animasi opacity saat mount. Dengan begini ikon tetap
  // terlihat walau hidrasi React tertunda/gagal (dulu tertinggal di opacity: 0).
  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={{
        x: springX,
        y: springY,
      }}
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('absolute pointer-events-none select-none', iconData.className)}
    >
      {/* Inner wrapper for the continuous floating animation */}
      <motion.div
        style={iconData.bg ? { backgroundColor: iconData.bg } : undefined}
        className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 p-2 rounded-2xl shadow-lg bg-white/90 backdrop-blur-md border border-black/10"
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5 + (index % 5),
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <iconData.icon className="w-full h-full" />
      </motion.div>
    </motion.div>
  );
};

/**
 * FloatingIconsBackground — Background layer of floating tech icons with Framer Motion spring repulsion
 */
export const FloatingIconsBackground = ({
  icons,
  className,
}: {
  icons: IconProps[];
  className?: string;
}) => {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  React.useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      data-hero-float
      className={cn('absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0', className)}
    >
      {icons.map((iconData, index) => (
        <Icon
          key={iconData.id}
          mouseX={mouseX}
          mouseY={mouseY}
          iconData={iconData}
          index={index}
        />
      ))}
    </div>
  );
};

const FloatingIconsHero = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FloatingIconsHeroProps
>(({ className, title, subtitle, ctaText, ctaHref, icons, children, ...props }, ref) => {
  // Refs to track the raw mouse position
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative w-full min-h-[700px] overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Container for the background floating icons */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
        {icons.map((iconData, index) => (
          <Icon
            key={iconData.id}
            mouseX={mouseX}
            mouseY={mouseY}
            iconData={iconData}
            index={index}
          />
        ))}
      </div>

      {/* Container for the foreground content */}
      {children ? (
        <div className="relative z-10 w-full">{children}</div>
      ) : (
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text">
            {title}
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">
            {subtitle}
          </p>
          {ctaText && ctaHref && (
            <div className="mt-10">
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-md px-8 py-4 text-base font-semibold bg-[var(--marker)] text-[var(--on-marker)] border-2 border-[var(--ink)] shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>
      )}
    </section>
  );
});

FloatingIconsHero.displayName = 'FloatingIconsHero';

export { FloatingIconsHero };
