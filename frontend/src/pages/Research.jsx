import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageHero from "../components/PageHero";
import { FadeIn, SectionEyebrow } from "../components/Reveal";

const AREAS = [
  { id: "organoid", n: "01", title: "Mini-Brain / Organoid Development",
    body: "iPSC-derived brain organoid platforms for disease modeling, with a focus on Alzheimer's and other neurodegenerative diseases. We study how neurovascular units emerge, mature, and fail — at the tissue scale.",
    img: "https://images.unsplash.com/photo-1679639539537-0d2e452890f7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHw0fHxuZXVyb3NjaWVuY2UlMjByZXNlYXJjaHxlbnwwfHx8fDE3ODM1NzIwNTZ8MA&ixlib=rb-4.1.0&q=85" },
  { id: "drug-delivery", n: "02", title: "Drug Delivery & Tissue Construct Platforms",
    body: "Engineered 3D neurovascular tissue constructs and delivery systems that let us test therapeutic hypotheses against organized human-relevant tissue — not simplified 2D cultures.",
    img: "https://images.unsplash.com/photo-1647083701183-6f66d6b48174" },
  { id: "imaging", n: "03", title: "Advanced Imaging & Machine Learning",
    body: "Quantitative imaging pipelines augmented with machine learning models trained to detect vascular remodeling, cell-state transitions, and early neurodegenerative signatures.",
    img: "https://images.unsplash.com/photo-1518152006812-edab29b069ac" },
  { id: "neurotech", n: "04", title: "Neurotechnology · Organ-on-Chip & Microfluidics",
    body: "Neurovascular brain-on-chip platforms and microfluidic reactors enabling controlled perfusion, mechanotransduction studies, and nerve-agent / neuroactive-compound screening.",
    img: "https://images.pexels.com/photos/8442027/pexels-photo-8442027.jpeg" },
  { id: "translational", n: "05", title: "Translational Research",
    body: "Bridging bench discovery to clinical application through partnerships with academic medical centers, industry, and the NIH-supported translational research ecosystem.",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYW5kJTIwZW5naW5lZXJpbmclMjBzdHVkZW50c3xlbnwwfHx8fDE3ODI2NDg4Nzd8MA&ixlib=rb-4.1.0&q=85" },
];

export default function Research() {
  const loc = useLocation();
  useEffect(() => {
    if (loc.hash) {
      const el = document.getElementById(loc.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loc.hash]);

  return (
    <main data-testid="research-page">
      <PageHero
        eyebrow="§ Research"
        title={["Five focus areas.", "One neurovascular", <em key="e" className="not-italic text-aggie-gold">system.</em>]}
        lead="Complementary lines of work covering everything from iPSC organoids to organ-on-chip, imaging, and translation into the clinic."
      />

      {AREAS.map((a, i) => (
        <section key={a.id} id={a.id} data-testid={`research-${a.id}`}
          className={`${i % 2 === 0 ? "bg-editorial-cream" : "bg-white"} section-pad border-t border-black/10 relative`}>
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <SectionEyebrow n={`§ ${a.n}`}>Focus Area</SectionEyebrow>
            <div className="grid md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-6">
                <FadeIn>
                  <div className="font-serif text-[110px] md:text-[160px] leading-[0.85] text-aggie-gold font-light -ml-2">{a.n}</div>
                  <h2 className="font-serif text-4xl md:text-5xl leading-[1.02] tracking-tight text-aggie-navy mt-4 max-w-lg">{a.title}</h2>
                  <p className="mt-6 text-base leading-relaxed text-editorial-text/85 max-w-xl">{a.body}</p>
                  <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-aggie-blue/70">
                    Representative publications and grants forthcoming — populated via admin panel.
                  </div>
                </FadeIn>
              </div>
              <div className="md:col-span-6">
                <FadeIn delay={0.1}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={a.img} alt="" className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-aggie-navy text-editorial-cream section-pad">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionEyebrow n="§ Legacy">Related lines of work</SectionEyebrow>
          <p className="font-serif text-3xl md:text-4xl leading-tight max-w-4xl">
            Related and legacy research — carbon nanotube biosensors, biodegradable metallic
            implants, and neurovascular brain-chip nerve-agent screening — remains active
            through the affiliated FIT BEST Laboratory.
          </p>
        </div>
      </section>
    </main>
  );
}
