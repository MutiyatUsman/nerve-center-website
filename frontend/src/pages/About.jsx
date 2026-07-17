import React from "react";
import PageHero from "../components/PageHero";
import { FadeIn, SectionEyebrow, Chapter } from "../components/Reveal";

export default function About() {
  return (
    <main data-testid="about-page">
      <PageHero
        eyebrow="§ About the Center"
        title={["What NERVE", <em key="e" className="not-italic text-aggie-gold">stands for.</em>]}
        lead="Center for Neurovascular Engineering Research and adVanced Education — a university research center at North Carolina A&T State University."
      />

      <section className="bg-editorial-cream section-pad">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionEyebrow n="§ 01">Mission</SectionEyebrow>
          <FadeIn>
            <p className="font-serif text-3xl md:text-5xl leading-[1.15] tracking-tight text-aggie-navy max-w-5xl">
              To integrate neuroscience, biomaterials, advanced imaging and AI-driven medical
              technologies to address neurological diseases and disorders — and to train the
              next generation of bioengineers.
            </p>
          </FadeIn>
        </div>
      </section>

      <Chapter n="01" label="Origin" title="Founded to anchor NCAT&rsquo;s bioengineering doctorate."
        image="https://images.unsplash.com/photo-1581092160607-ee22621dd758?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYW5kJTIwZW5naW5lZXJpbmclMjBzdHVkZW50c3xlbnwwfHx8fDE3ODI2NDg4Nzd8MA&ixlib=rb-4.1.0&q=85">
        NERVE was established to support North Carolina A&amp;T&rsquo;s bioengineering Ph.D. &mdash; the first
        standalone bioengineering doctorate at a Historically Black College or University — and
        to strengthen the university&rsquo;s push toward R1 research classification.
      </Chapter>

      <Chapter n="02" label="Director" reverse title="Dr. Yeoheung Yun — Founding faculty, principal investigator."
        image="https://images.unsplash.com/photo-1518152006812-edab29b069ac">
        Professor in the Department of Chemical, Biological and Bioengineering at NC A&amp;T.
        Ph.D. in Mechanical Engineering, University of Cincinnati. Joined NCAT in 2010 as
        founding bioengineering faculty. O. Max Gardner Award recipient. Also directs the
        affiliated FIT BEST Laboratory. Email: yyun@ncat.edu · Office: Fort IRC Building Room 119.
      </Chapter>

      <Chapter n="03" label="Ecosystem" title="Embedded within NCAT's Interdisciplinary Bioengineering Center (IBEC).">
        The NERVE Center operates alongside the FIT BEST Laboratory and NCAT's Interdisciplinary
        Bioengineering Center (IBEC), sharing instrumentation, PhD training pipelines and
        translational infrastructure across bioengineering, chemistry, and computing.
      </Chapter>
    </main>
  );
}
