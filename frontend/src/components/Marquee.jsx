import React from "react";

const KEYWORDS = [
  "NEUROVASCULAR", "ORGANOIDS", "MICROFLUIDICS", "MACHINE LEARNING",
  "TRANSLATIONAL", "IPSC", "BRAIN-ON-CHIP", "IMAGING", "TISSUE ENGINEERING",
  "DRUG DELIVERY", "BIOSENSORS", "R1 RESEARCH",
];

export default function Marquee() {
  const items = [...KEYWORDS, ...KEYWORDS];
  return (
    <div data-testid="editorial-marquee" className="relative bg-aggie-blue text-editorial-cream py-6 overflow-hidden border-y border-white/10">
      <div className="marquee-track animate-marquee gap-16 pl-16">
        {items.map((k, i) => (
          <div key={i} className="flex items-center gap-16 whitespace-nowrap font-serif text-3xl md:text-5xl tracking-tight font-light">
            <span>{k}</span>
            <span className="text-aggie-gold text-2xl md:text-3xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
