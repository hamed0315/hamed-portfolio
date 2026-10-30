
"use client";
import { useEffect, useRef } from "react";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";
const rand = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];
export default function ScrambleText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string; }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id: ReturnType<typeof setInterval> | undefined;
    el.textContent = " ";
    const start = setTimeout(() => {
      let pos = 0;
      id = setInterval(() => {
        pos += 0.5; 
        const shown = Math.floor(pos);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (i >= shown + 3) break; 
          out += text[i] === " " ? " " : i < shown ? text[i] : rand();
        }
        el.textContent = out || " ";
        if (shown >= text.length) { clearInterval(id); el.textContent = text; }
      }, 25);
    }, delay);
    return () => { clearTimeout(start); if (id) clearInterval(id); el.textContent = text; };
  }, [text, delay]);
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="invisible whitespace-pre">{text}</span>
      <span ref={ref} aria-hidden className="absolute inset-0 whitespace-pre">{text}</span>
    </span>
  );
}
