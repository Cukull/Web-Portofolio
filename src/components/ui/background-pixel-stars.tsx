'use client';

/**
 * background-pixel-stars.tsx
 * Adaptasi BackgroundPixelStars dari 21st.dev untuk loader portofolio.
 *
 * Perubahan dari versi asli:
 *  - Kanvas memakai posisi absolute supaya ikut terangkat saat loader slide-up.
 *  - Timeout shooting star dibersihkan saat unmount.
 *  - Mode prefers-reduced-motion menggambar bintang statis tanpa animasi.
 *  - Menerima className opsional.
 */
import { memo, useCallback, useEffect, useRef } from 'react';

const STAR_COLORS = [
  '#FFFFFF', // White
  '#FFFFAA', // Light yellow
  '#AAAAFF', // Light blue
  '#FFAAAA', // Light red
  '#AAFFAA', // Light green
  '#FFAAFF', // Light purple
  '#AAFFFF', // Light cyan
] as const;

const starDensity = 0.00006;
const twinkleProbability = 0.7;
const minTwinkleSpeed = 2;
const maxTwinkleSpeed = 4;
const pixelSize = 5;
const starRegenerationInterval = 5000;
const percentToRegenerate = 0.15;

const shootingStarPixelSize = 2;
const targetFps = 16;

type BackgroundStar = {
  x: number;
  y: number;
  color: string;
  baseOpacity: number;
  currentOpacity: number;
  twinkle: boolean;
  twinkleSpeed: number;
  twinkleDirection: number;
  twinkleTimer: number;
};

type TrailPoint = {
  x: number;
  y: number;
  opacity: number;
};

type ShootingStar = {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  trail: TrailPoint[];
};

type StartPoint = {
  x: number;
  y: number;
  angle: number;
};

export interface BackgroundPixelStarsProps {
  className?: string;
}

export const BackgroundPixelStars = memo(
  ({ className }: BackgroundPixelStarsProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const shootingStarTimerRef = useRef<number | null>(null);

    const backgroundStarsRef = useRef<BackgroundStar[]>([]);
    const shootingStarsRef = useRef<ShootingStar[]>([]);
    const lastRenderTimeRef = useRef<number>(0);
    const frameInterval: number = 1000 / targetFps;

    const getRandomStartPoint = useCallback((): StartPoint => {
      const x = Math.random() * window.innerWidth;
      const angle = 45 + Math.random() * 90;
      return { x, y: 0, angle };
    }, []);

    const createNewShootingStar = useCallback((): ShootingStar => {
      const { x, y, angle } = getRandomStartPoint();
      return {
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * 5 + 8,
        distance: 0,
        trail: [],
      };
    }, [getRandomStartPoint]);

    const initBackgroundStars = useCallback((): void => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      backgroundStarsRef.current = [];

      const area = canvas.width * canvas.height;
      const numStars = Math.floor(area * starDensity);

      for (let i = 0; i < numStars; i++) {
        const shouldTwinkle = Math.random() < twinkleProbability;
        const gridX = Math.floor(Math.random() * (canvas.width / pixelSize)) * pixelSize;
        const gridY = Math.floor(Math.random() * (canvas.height / pixelSize)) * pixelSize;
        const colorIndex = Math.floor(Math.random() * STAR_COLORS.length);
        const baseOpacity = Math.random() * 0.5 + 0.5;

        backgroundStarsRef.current.push({
          x: gridX,
          y: gridY,
          color: STAR_COLORS[colorIndex]!,
          baseOpacity,
          currentOpacity: baseOpacity,
          twinkle: shouldTwinkle,
          twinkleSpeed: minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed),
          twinkleDirection: -1,
          twinkleTimer: 0,
        });
      }
    }, []);

    const regenerateBackgroundStars = useCallback((): void => {
      if (!canvasRef.current || backgroundStarsRef.current.length === 0) return;

      const canvas = canvasRef.current;
      const numToRegenerate = Math.max(
        1,
        Math.floor(backgroundStarsRef.current.length * percentToRegenerate),
      );

      for (let i = 0; i < numToRegenerate; i++) {
        const randomIndex = Math.floor(Math.random() * backgroundStarsRef.current.length);

        const shouldTwinkle = Math.random() < twinkleProbability;
        const gridX = Math.floor(Math.random() * (canvas.width / pixelSize)) * pixelSize;
        const gridY = Math.floor(Math.random() * (canvas.height / pixelSize)) * pixelSize;
        const colorIndex = Math.floor(Math.random() * STAR_COLORS.length);
        const baseOpacity = Math.random() * 0.5 + 0.5;

        backgroundStarsRef.current[randomIndex] = {
          x: gridX,
          y: gridY,
          color: STAR_COLORS[colorIndex]!,
          baseOpacity,
          currentOpacity: baseOpacity,
          twinkle: shouldTwinkle,
          twinkleSpeed: minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed),
          twinkleDirection: -1,
          twinkleTimer: 0,
        };
      }
    }, []);

    const animateCanvas = useCallback(
      (timestamp: number): void => {
        if (timestamp - lastRenderTimeRef.current < frameInterval) {
          animationFrameRef.current = requestAnimationFrame(animateCanvas);
          return;
        }

        lastRenderTimeRef.current = timestamp;

        if (!canvasRef.current) {
          animationFrameRef.current = requestAnimationFrame(animateCanvas);
          return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          animationFrameRef.current = requestAnimationFrame(animateCanvas);
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Draw and update background stars
        backgroundStarsRef.current.forEach((star) => {
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.currentOpacity;
          ctx.fillRect(star.x, star.y, pixelSize, pixelSize);

          if (star.twinkle) {
            star.twinkleTimer += 1 / targetFps;

            if (star.twinkleTimer >= star.twinkleSpeed) {
              star.twinkleTimer = 0;
              star.twinkleDirection *= -1;
            }

            const progress = star.twinkleTimer / star.twinkleSpeed;
            if (progress < 0.5) {
              star.currentOpacity =
                star.twinkleDirection < 0 ? star.baseOpacity : star.baseOpacity * 0.3;
            } else {
              star.currentOpacity =
                star.twinkleDirection < 0 ? star.baseOpacity * 0.3 : star.baseOpacity;
            }
          }
        });

        // 2. Update shooting stars
        if (shootingStarsRef.current.length) {
          shootingStarsRef.current = shootingStarsRef.current
            .map((star) => {
              const newX = star.x + star.speed * Math.cos((star.angle * Math.PI) / 180);
              const newY = star.y + star.speed * Math.sin((star.angle * Math.PI) / 180);
              const newDistance = star.distance + star.speed;

              const newTrail = [...star.trail];

              if (newDistance % 8 < star.speed) {
                newTrail.push({ x: star.x, y: star.y, opacity: 1.0 });
              }

              const updatedTrail = newTrail
                .map((point) => ({ ...point, opacity: point.opacity - 0.1 }))
                .filter((point) => point.opacity > 0);

              return { ...star, x: newX, y: newY, distance: newDistance, trail: updatedTrail };
            })
            .filter(
              (star) =>
                star.x >= -30 &&
                star.x <= window.innerWidth + 30 &&
                star.y >= -30 &&
                star.y <= window.innerHeight + 30,
            );

          // 3. Draw shooting stars
          shootingStarsRef.current.forEach((star) => {
            star.trail.forEach((point) => {
              ctx.save();
              ctx.translate(point.x, point.y);
              ctx.rotate((star.angle * Math.PI) / 180);
              ctx.translate(-point.x, -point.y);
              ctx.fillStyle = `rgba(180, 242, 255, ${point.opacity})`;
              ctx.fillRect(point.x, point.y, shootingStarPixelSize, shootingStarPixelSize);
              ctx.restore();
            });

            const starWidth = 4;
            const starHeight = 2;

            ctx.save();
            ctx.translate(star.x, star.y);
            ctx.rotate((star.angle * Math.PI) / 180);
            ctx.translate(-star.x, -star.y);
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 1.0;

            for (let y = 0; y < starHeight; y++) {
              for (let x = 0; x < starWidth; x++) {
                if ((x === 0 && y === 1) || (x === 3 && y === 0)) continue;
                ctx.fillRect(
                  star.x + x * shootingStarPixelSize,
                  star.y + y * shootingStarPixelSize,
                  shootingStarPixelSize,
                  shootingStarPixelSize,
                );
              }
            }

            ctx.restore();
          });
        }

        animationFrameRef.current = requestAnimationFrame(animateCanvas);
      },
      [frameInterval],
    );

    useEffect(() => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      initBackgroundStars();

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          backgroundStarsRef.current.forEach((star) => {
            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.baseOpacity;
            ctx.fillRect(star.x, star.y, pixelSize, pixelSize);
          });
        }
        return;
      }

      animationFrameRef.current = requestAnimationFrame(animateCanvas);

      const createShootingStar = (): void => {
        shootingStarsRef.current = [...shootingStarsRef.current, createNewShootingStar()];
        const randomDelay = Math.random() * 4000 + 2000;
        shootingStarTimerRef.current = window.setTimeout(createShootingStar, randomDelay);
      };

      createShootingStar();

      const regenerationInterval = window.setInterval(
        regenerateBackgroundStars,
        starRegenerationInterval,
      );

      const handleResize = (): void => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initBackgroundStars();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (shootingStarTimerRef.current) clearTimeout(shootingStarTimerRef.current);
        clearInterval(regenerationInterval);
        window.removeEventListener('resize', handleResize);
      };
    }, [animateCanvas, createNewShootingStar, initBackgroundStars, regenerateBackgroundStars]);

    return (
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={className ?? 'pointer-events-none absolute inset-0 h-full w-full'}
      />
    );
  },
  () => true,
);

BackgroundPixelStars.displayName = 'BackgroundPixelStars';

export default BackgroundPixelStars;
