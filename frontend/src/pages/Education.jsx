import React from "react";
import PageHero from "../components/PageHero";
import { FadeIn, SectionEyebrow } from "../components/Reveal";

export default function Education() {
  return (
    <main data-testid="education-page">
      <PageHero
        eyebrow="§ Education & Training"
        title={["Training the", "next generation of", <em key="e" className="not-italic text-aggie-gold">bioengineers.</em>]}
        lead="From undergraduate research to standalone doctoral training in bioengineering — a first at any HBCU."
      />
      <section className="bg-editorial-cream section-pad">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <SectionEyebrow n="§ 01">PhD Program</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-aggie-navy">First standalone bioengineering doctorate at an HBCU.</h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <FadeIn>
              <p className="text-base leading-relaxed text-editorial-text/85">
                Doctoral training areas include neurotechnology, neural engineering, and molecular /
                cellular / systems engineering. Students work at the interface of iPSC organoid biology,
                microfluidic engineering, quantitative imaging, and machine learning.
              </p>
              <a href="https://www.ncat.edu" target="_blank" rel="noreferrer"
                data-testid="phd-program-link"
                className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-aggie-blue link-underline">↗ NC A&amp;T bioengineering Ph.D. program</a>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-white section-pad border-t border-black/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionEyebrow n="§ 02">Workforce Development</SectionEyebrow>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { t: "Undergraduate", d: "Semester and summer research placements across the NERVE / FIT BEST labs." },
              { t: "Master's", d: "Thesis-track MS training in bioengineering with translational emphasis." },
              { t: "Doctoral", d: "Fully-funded PhD training in bioengineering, neurotechnology, and neural engineering." },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="border-t border-aggie-navy/30 pt-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-aggie-blue mb-3">Level · 0{i+1}</div>
                  <h3 className="font-serif text-2xl text-aggie-navy">{c.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-editorial-text/80">{c.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
