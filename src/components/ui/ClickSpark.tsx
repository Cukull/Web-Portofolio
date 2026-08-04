import React, { useRef, useEffect, useCallback } from 'react';

export interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-in-out' | 'ease-out' | string;
  extraScale?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Jika true, ClickSpark akan aktif di seluruh layar (viewport fixed canvas)
   * dan mendeteksi semua klik di manapun pada halaman web.
   */
  global?: boolean;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
  color: string;
}

/**
 * Mendeteksi warna spark yang kontras berdasarkan elemen yang diklik.
 * Jika yang diklik adalah tombol hijau (#C6FF34), spark otomatis berwarna hitam (#171717).
 */
const getContrastSparkColor = (target: HTMLElement | null, defaultColor: string): string => {
  if (!target) return defaultColor;

  // 1. Cek atribut kustom data-spark-color jika ada
  const explicitElem = target.closest('[data-spark-color]');
  if (explicitElem) {
    const attr = explicitElem.getAttribute('data-spark-color');
    if (attr) return attr;
  }

  // 2. Cek apakah elemen atau parent-nya adalah tombol hijau / background hijau terang
  let curr: HTMLElement | null = target;
  let depth = 0;
  while (curr && curr !== document.body && depth < 5) {
    const styleAttr = curr.getAttribute('style')?.toLowerCase() || '';
    if (
      curr.id === 'hero-view-work' ||
      curr.classList.contains('bg-accent') ||
      curr.classList.contains('bg-lime') ||
      styleAttr.includes('#c6ff34') ||
      styleAttr.includes('background: #c6ff34') ||
      styleAttr.includes('background:#c6ff34') ||
      styleAttr.includes('#b8f020')
    ) {
      return '#171717'; // Hitam (Carbon) agar tidak samar
    }

    try {
      const computedBg = window.getComputedStyle(curr).backgroundColor;
      // rgb(198, 255, 52) untuk #C6FF34, rgb(184, 240, 32) untuk hover lime
      if (
        computedBg === 'rgb(198, 255, 52)' ||
        computedBg === 'rgb(184, 240, 32)' ||
        computedBg === 'rgba(198, 255, 52, 1)' ||
        computedBg === 'rgba(184, 240, 32, 1)'
      ) {
        return '#171717'; // Hitam (Carbon)
      }
    } catch {
      // Abaikan jika getComputedStyle gagal
    }

    curr = curr.parentElement;
    depth++;
  }

  return defaultColor;
};

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children,
  className = '',
  style = {},
  global = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const resizeCanvas = () => {
      if (global) {
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      } else {
        const parent = canvas.parentElement;
        if (!parent) return;
        const { width, height } = parent.getBoundingClientRect();
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    if (global) {
      window.addEventListener('resize', handleResize);
      resizeCanvas();
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
      };
    } else {
      const parent = canvas.parentElement;
      if (!parent) return;
      const ro = new ResizeObserver(handleResize);
      ro.observe(parent);
      resizeCanvas();
      return () => {
        ro.disconnect();
        clearTimeout(resizeTimeout);
      };
    }
  }, [global]);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = spark.color || sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  // Global click listener untuk seluruh layar
  useEffect(() => {
    if (!global) return;

    const handleGlobalClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const x = e.clientX;
      const y = e.clientY;

      const activeColor = getContrastSparkColor(e.target as HTMLElement, sparkColor);

      const now = performance.now();
      const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
        color: activeColor,
      }));

      sparksRef.current.push(...newSparks);
    };

    window.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      window.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, [global, sparkCount, sparkColor]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (global) return; // mode global ditangani oleh window listener di atas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const activeColor = getContrastSparkColor(e.target as HTMLElement, sparkColor);

    const now = performance.now();
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
      color: activeColor,
    }));

    sparksRef.current.push(...newSparks);
  };

  if (global) {
    return (
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
          userSelect: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          ...style,
        }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 999,
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
