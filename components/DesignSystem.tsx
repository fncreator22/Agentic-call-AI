'use client';
import { useEffect, useRef, useState } from 'react';

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null); const [inView, setInView] = useState(false);
  useEffect(() => { const element = ref.current; if (!element) return; const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: .12 }); observer.observe(element); return () => observer.disconnect(); }, []);
  return <div ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`}>{children}</div>;
}
const tones = { Anaya: 'from-[#f5b47b] to-[#ef7657]', Tara: 'from-[#a3d6c7] to-[#5e9c89]', Rohan: 'from-[#b7a7ed] to-[#7664b6]' };
export function Avatar({ name, size = 'md' }: { name: keyof typeof tones; size?: 'sm' | 'md' }) { const initials = name.slice(0, 1); return <span aria-label={`${name} AI employee`} className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[name]} font-black text-white shadow-sm ${size === 'sm' ? 'h-9 w-9 text-xs' : 'h-12 w-12 text-sm'}`}>{initials}</span> }
export function CountUp({ value, prefix = '' }: { value: number; prefix?: string }) { const [shown, setShown] = useState(0); const ref = useRef<HTMLSpanElement>(null); useEffect(() => { const node = ref.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; const start = performance.now(); const run = (time: number) => { const ratio = Math.min((time - start) / 700, 1); setShown(Math.round(value * (1 - Math.pow(1 - ratio, 3)))); if (ratio < 1) requestAnimationFrame(run); }; requestAnimationFrame(run); observer.disconnect(); }); observer.observe(node); return () => observer.disconnect(); }, [value]); return <span ref={ref}>{prefix}{shown.toLocaleString('en-IN')}</span> }
