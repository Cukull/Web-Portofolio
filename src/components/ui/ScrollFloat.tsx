import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

import './ScrollFloat.css';

export interface ScrollFloatProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  containerStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'p';
  highlightWords?: string[];
  highlightColor?: string;
  scrub?: boolean | number;
}

const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node) && (node.props as any)?.children) {
    return extractText((node.props as any).children);
  }
  return '';
};

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  containerClassName = '',
  textClassName = '',
  containerStyle,
  textStyle,
  animationDuration = 0.9,
  ease = 'back.out(1.7)',
  stagger = 0.03,
  as: Tag = 'h2',
  highlightWords = [],
  highlightColor = '#84CC16',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  const splitText = useMemo(() => {
    const rawText = extractText(children);
    // Replace multiple spaces/newlines with single space
    const text = rawText.replace(/\s+/g, ' ').trim();
    if (!text) return null;

    const highlightRanges: { start: number; end: number }[] = [];
    if (highlightWords && highlightWords.length > 0) {
      highlightWords.forEach((word) => {
        const idx = text.toLowerCase().indexOf(word.toLowerCase());
        if (idx !== -1) {
          highlightRanges.push({ start: idx, end: idx + word.length });
        }
      });
    }

    return text.split('').map((char, index) => {
      const isHighlighted = highlightRanges.some(
        (r) => index >= r.start && index < r.end
      );
      return (
        <span
          className="sf-char"
          key={index}
          data-highlighted={isHighlighted ? 'true' : undefined}
          style={isHighlighted ? { color: highlightColor } : undefined}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  }, [children, highlightWords, highlightColor]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = Array.from(el.querySelectorAll<HTMLElement>('.sf-char'));
    if (!chars.length) return;

    let animated = false;

    const triggerAnimation = () => {
      if (animated) return;
      animated = true;

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 35,
          scaleY: 1.3,
          scaleX: 0.95,
          transformOrigin: '50% 100%',
        },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          scaleX: 1,
          duration: animationDuration,
          ease: ease,
          stagger: stagger,
          onComplete: () => {
            gsap.set(chars, { clearProps: 'willChange' });
          },
        }
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [children, animationDuration, ease, stagger]);

  return (
    <Tag
      ref={containerRef as any}
      className={`scroll-float ${containerClassName}`}
      style={containerStyle}
    >
      <span className={`scroll-float-text ${textClassName}`} style={textStyle}>
        {splitText}
      </span>
    </Tag>
  );
};

export default ScrollFloat;
