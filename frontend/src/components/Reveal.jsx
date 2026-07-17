import React from "react";
import { motion } from "framer-motion";

// Line-by-line masked reveal for headlines. Pass an array of lines.
export const MaskedLines = ({ lines = [], className = "", delay = 0, duration = 0.9 }) => (
  <div className={className}>
    {lines.map((line, i) => (
      <div key={i} className="reveal-mask block">
        <motion.span
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.08 }}
        >{line}</motion.span>
      </div>
    ))}
  </div>
);

export const FadeIn = ({ children, y = 24, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >{children}</motion.div>
);

export const Overline = ({ children, className = "" }) => (
  <div className={`font-mono text-[11px] tracking-[0.28em] uppercase ${className}`}>{children}</div>
);

export const Chapter = ({ n, label, title, children, image, reverse = false }) => (
  <div className="section-pad">
    <div className="mx-auto max-w-[1400px] px-6 md:px-10">
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="md:col-span-5">
          <FadeIn>
            <div className="flex items-baseline gap-6">
              <div className="font-serif text-[100px] md:text-[160px] leading-none text-aggie-gold font-light">{n}</div>
              <Overline className="text-aggie-navy/70">{label}</Overline>
            </div>
          </FadeIn>
        </div>
        <div className="md:col-span-7">
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-aggie-navy">{title}</h2>
            <div className="mt-6 text-[15px] md:text-base leading-relaxed text-editorial-text max-w-xl">{children}</div>
            {image && (
              <div className="mt-10 aspect-[4/3] w-full overflow-hidden">
                <img src={image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

export const SectionEyebrow = ({ n, children }) => (
  <div className="flex items-center gap-4 mb-8">
    <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-aggie-gold">{n}</span>
    <span className="h-px flex-1 bg-black/15" />
    <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-aggie-navy/70">{children}</span>
  </div>
);
