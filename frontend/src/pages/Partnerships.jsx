import React from "react";
import PageHero from "../components/PageHero";
import { FadeIn, SectionEyebrow } from "../components/Reveal";

export default function Partnerships() {
  const partners = [
    { name: "National Institutes of Health", role: "Primary funding source", url: "https://www.nih.gov" },
    { name: "NC A&T State University", role: "Home institution", url: "https://www.ncat.edu" },
    { name: "University of Pittsburgh", role: "Collaborating institution", url: "https://www.pitt.edu" },
    { name: "Washington University in St. Louis", role: "Collaborating institution", url: "https://wustl.edu" },
  ];
  return (
    <main data-testid="partnerships-page">
      <PageHero
        eyebrow="§ Partnerships"
        title={["Collaborators &", <em key="e" className="not-italic text-aggie-gold">funders.</em>]}
        lead="The NERVE Center is a collaboratively funded and executed research enterprise."
      />
      <section className="bg-editorial-cream section-pad">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionEyebrow n="§ 01">Institutions</SectionEyebrow>
          <div className="divide-y divide-black/15">
            {partners.map((p, i) => (
              <FadeIn key={p.name}>
                <a href={p.url} target="_blank" rel="noreferrer"
                  className="group py-8 grid md:grid-cols-12 gap-6 items-baseline hover:bg-white transition-colors px-2">
                  <div className="md:col-span-1 font-mono text-xs uppercase tracking-widest text-aggie-blue">0{i+1}</div>
                  <div className="md:col-span-7 font-serif text-3xl md:text-4xl text-aggie-navy leading-tight">{p.name}</div>
                  <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-widest text-editorial-text/70">{p.role}</div>
                  <div className="md:col-span-1 md:text-right text-aggie-blue group-hover:text-aggie-gold transition-colors">↗</div>
                </a>
              </FadeIn>
            ))}
          </div>
          <p className="mt-16 max-w-2xl text-sm text-editorial-text/80 leading-relaxed">
            The NERVE Center is supported in part by the National Institutes of Health.
            Additional funding partners and detailed grant information will be listed here
            as they are confirmed.
          </p>
        </div>
      </section>
    </main>
  );
}
