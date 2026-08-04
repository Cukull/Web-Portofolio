import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

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
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  containerStyle,
  textStyle,
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'top bottom+=10%',
  scrollEnd = 'bottom center',
  stagger = 0.03,
  as: Tag = 'h2',
  highlightWords = [],
  highlightColor = '#84CC16',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
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
          className="char"
          key={index}
          style={
            isHighlighted
              ? { color: highlightColor, display: 'inline-block' }
              : undefined
          }
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  }, [children, highlightWords, highlightColor]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const charElements = el.querySelectorAll('.char');

    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%',
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

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
