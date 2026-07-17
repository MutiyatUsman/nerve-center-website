import React from "react";
import PageHero from "../components/PageHero";
import { FadeIn, SectionEyebrow } from "../components/Reveal";

export default function Facilities() {
  return (
    <main data-testid="facilities-page">
      <PageHero
        eyebrow="§ Facilities"
        title={["Instrumentation &", <em key="e" className="not-italic text-aggie-gold">lab space.</em>]}
        lead="The NERVE Center operates within NC A&T's Interdisciplinary Bioengineering Center (IBEC) alongside the FIT BEST Laboratory."
      />
      <section className="bg-editorial-cream section-pad">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <SectionEyebrow n="§ 01">FIT BEST Lab</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl text-aggie-navy leading-tight">Multi-scale bioengineering under one roof.</h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <FadeIn>
              <p className="text-base leading-relaxed text-editorial-text/85">
                Shared access to microfluidic fabrication, iPSC culture suites, quantitative
                microscopy, and computational workstations for machine-learning pipelines.
                Detailed instrumentation list and facility photography will populate here.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
      <section className="bg-white section-pad border-t border-black/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionEyebrow n="§ 02">Access</SectionEyebrow>
          <p className="max-w-3xl font-serif text-2xl md:text-3xl text-aggie-navy leading-snug">
            Facility access for collaborators and industry partners is coordinated through the
            Interdisciplinary Bioengineering Center (IBEC) at North Carolina A&amp;T.
          </p>
        </div>
      </section>
    </main>
  );
}
