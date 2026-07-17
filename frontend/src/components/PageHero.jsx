import React from "react";
import { MaskedLines, FadeIn, SectionEyebrow, Overline } from "../components/Reveal";

export const PageHero = ({ eyebrow, title, lead, tone = "light" }) => {
  const dark = tone === "dark";
  return (
    <section className={`${dark ? "bg-aggie-void text-editorial-cream" : "bg-editorial-cream text-aggie-navy"} pt-40 pb-24 relative overflow-hidden`}>
      {dark && <div className="vascular-watermark opacity-40" />}
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Overline className={dark ? "text-aggie-gold" : "text-aggie-blue"}>{eyebrow}</Overline>
        <div className="mt-8 max-w-5xl">
          <MaskedLines className="font-serif text-6xl md:text-8xl font-light leading-[0.98] tracking-tighter" lines={title} />
        </div>
        {lead && (
          <FadeIn delay={0.4}>
            <p className={`mt-10 max-w-2xl text-base md:text-lg leading-relaxed ${dark ? "text-white/70" : "text-editorial-text/85"}`}>{lead}</p>
          </FadeIn>
        )}
      </div>
    </section>
  );
};

export default PageHero;
