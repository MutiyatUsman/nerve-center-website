import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MaskedLines, FadeIn, Overline, Chapter, SectionEyebrow } from "../components/Reveal";
import Marquee from "../components/Marquee";
import { NerveLogo } from "../components/NerveLogo";

const HERO_IMG = "https://images.pexels.com/photos/8442027/pexels-photo-8442027.jpeg";
const ORGANOID = "https://images.unsplash.com/photo-1679639539537-0d2e452890f7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHw0fHxuZXVyb3NjaWVuY2UlMjByZXNlYXJjaHxlbnwwfHx8fDE3ODM1NzIwNTZ8MA&ixlib=rb-4.1.0&q=85";
const IMAGING = "https://images.unsplash.com/photo-1518152006812-edab29b069ac";
const TISSUE = "https://images.unsplash.com/photo-1647083701183-6f66d6b48174";
const STUDENTS = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYW5kJTIwZW5naW5lZXJpbmclMjBzdHVkZW50c3xlbnwwfHx8fDE3ODI2NDg4Nzd8MA&ixlib=rb-4.1.0&q=85";

const PILLARS = [
  { id: "organoid", n: "01", title: "Mini-Brain & Organoid Modeling", body: "iPSC-derived tissue constructs for Alzheimer's and complex neurological disease modeling.", img: ORGANOID },
  { id: "drug-delivery", n: "02", title: "Drug Delivery & Tissue Constructs", body: "Engineered platforms for precise CNS drug delivery and vascularized construct testing.", img: TISSUE },
  { id: "imaging", n: "03", title: "Advanced Imaging & Machine Learning", body: "AI-driven analysis of neurovascular structure, dynamics, and disease signatures.", img: IMAGING },
  { id: "neurotech", n: "04", title: "Neurotechnology & Organ-on-Chip", body: "Microfluidic brain-on-chip systems for translational discovery and neuroactive-agent screening.", img: STUDENTS },
];

const PARTNERS = ["NIH", "NC A&T", "Univ. of Pittsburgh", "Washington Univ. in St. Louis"];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const brainRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <main data-testid="home-page">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] bg-aggie-void text-editorial-cream overflow-hidden grain">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-aggie-void via-aggie-void/60 to-aggie-void" />
        </motion.div>

        <motion.div
          style={{ rotate: brainRotate }}
          className="absolute -right-[10%] top-1/4 w-[70vw] h-[70vw] pointer-events-none opacity-[0.08]"
          aria-hidden
        >
          <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke="#FDB927" strokeWidth="0.5">
            <path d="M200 40c-40 0-70 20-90 50-30-4-60 10-70 40-20 6-35 25-35 55 0 20 12 40 32 50-6 30 12 60 42 68 8 26 32 45 60 45h10c8 20 30 32 55 32s45-12 55-32h10c28 0 52-19 60-45 30-8 48-38 42-68 20-10 32-30 32-50 0-30-15-49-35-55-10-30-40-44-70-40-20-30-50-50-90-50z"/>
            <path d="M200 40v340" opacity="0.5" />
            <g opacity="0.9">
              <path d="M120 130c15 12 30 30 40 55M90 180c25 5 55 20 70 45M110 240c20 0 40 15 55 35M140 300c15 0 30 8 40 20"/>
              <path d="M280 130c-15 12-30 30-40 55M310 180c-25 5-55 20-70 45M290 240c-20 0-40 15-55 35M260 300c-15 0-30 8-40 20"/>
            </g>
          </svg>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 pt-40 pb-24 min-h-[100svh] flex flex-col justify-between">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Overline className="text-aggie-gold">NIH-Funded Research Center · NC A&amp;T</Overline>
          </motion.div>

          <div className="mt-16">
            <h1 className="sr-only">Pioneering Neurovascular Engineering — NERVE Center at NC A&amp;T</h1>
            <MaskedLines
              className="font-serif font-light text-[13vw] md:text-[9vw] leading-[0.95] tracking-tighter"
              lines={["Pioneering", <span key="2"><em className="not-italic text-aggie-gold">Neurovascular</em></span>, "Engineering."]}
              delay={0.55}
            />
            <FadeIn delay={1.4} className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <p className="max-w-xl text-base md:text-lg text-white/75 leading-relaxed">
                A university research center at North Carolina A&amp;T integrating neuroscience,
                biomaterials, advanced imaging, and AI-driven medical technology to understand
                and treat the diseases of the brain.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/research" data-testid="hero-cta-research"
                  className="inline-flex items-center gap-2 bg-aggie-gold text-aggie-void px-6 py-4 font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors">
                  Explore Our Research <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/people" data-testid="hero-cta-join"
                  className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-4 font-mono text-xs uppercase tracking-widest hover:border-aggie-gold hover:text-aggie-gold transition-colors">
                  Join the Center <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={1.7} className="mt-16 flex items-end justify-between border-t border-white/10 pt-6">
            <div className="grid grid-cols-3 gap-10 md:gap-16">
              <Stat n="01" label="Standalone Bioengineering PhD at an HBCU" />
              <Stat n="R1" label="Push toward R1 research classification" />
              <Stat n="04" label="Interlinked research pillars" />
            </div>
            <div className="hidden md:block font-mono text-[10px] tracking-widest uppercase opacity-60">Scroll ↓</div>
          </FadeIn>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* MANIFESTO CHAPTERS */}
      <section className="bg-editorial-cream relative overflow-hidden" data-testid="manifesto">
        <div className="vascular-watermark" />
        <div className="relative">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-24">
            <SectionEyebrow n="§ 01">Manifesto</SectionEyebrow>
            <FadeIn>
              <h2 className="font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-aggie-navy max-w-4xl">
                A national-scale research effort<br />
                built inside an HBCU.
              </h2>
            </FadeIn>
          </div>

          <Chapter n="01" label="Mission"
            title="Understand and treat disease at the interface of blood and brain."
            image={ORGANOID}>
            The NERVE Center integrates neuroscience, biomaterials, advanced imaging, and AI-driven
            medical technologies to address neurological diseases and disorders — and to train the
            next generation of bioengineers.
          </Chapter>
          <Chapter n="02" label="Origin" reverse
            title="Anchoring NC A&T's bioengineering doctorate — a first at an HBCU."
            image={STUDENTS}>
            NERVE was founded to support NCAT's standalone bioengineering Ph.D. program — the first
            of its kind at a Historically Black College or University — and to help propel the
            university toward R1 research classification.
          </Chapter>
          <Chapter n="03" label="Method"
            title="Convergent, translational, and honest about the hard problems."
            image={IMAGING}>
            We bridge iPSC-derived tissue constructs, microfluidic organ-on-chip platforms,
            quantitative imaging, and machine learning into a single translational pipeline —
            from bench discovery toward clinical application.
          </Chapter>
        </div>
      </section>

      {/* RESEARCH PILLARS */}
      <section className="bg-aggie-navy text-editorial-cream section-pad" data-testid="pillars">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-4">
              <SectionEyebrow n="§ 02">Research Pillars</SectionEyebrow>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight">Four questions.<br />One system.</h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex items-end">
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Every pillar informs the next. Organoids stress-test drug-delivery platforms.
                Imaging validates neurotech. Machine learning threads the entire pipeline together.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {PILLARS.map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="group bg-aggie-navy p-8 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <img src={p.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="relative">
                  <div className="flex items-baseline justify-between">
                    <div className="font-serif text-aggie-gold text-5xl font-light">{p.n}</div>
                    <ArrowUpRight className="w-6 h-6 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl mt-8 leading-tight">{p.title}</h3>
                  <p className="mt-4 text-white/70 text-sm md:text-base leading-relaxed max-w-md">{p.body}</p>
                  <Link to={`/research#${p.id}`} data-testid={`pillar-${p.id}`}
                    className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-aggie-gold hover:text-white transition-colors">
                    Read Focus Area <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS / RECOGNITION STRIP */}
      <section className="bg-editorial-cream section-pad" data-testid="news-strip">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionEyebrow n="§ 03">Recognition</SectionEyebrow>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "HBCU-First Bioengineering Ph.D.", d: "NC A&T launches the first standalone bioengineering doctorate at an HBCU &mdash; anchored by the NERVE Center." },
              { t: "O. Max Gardner Award", d: "Director Dr. Yeoheung Yun recognized with one of the UNC System&rsquo;s highest faculty honors." },
              { t: "NIH-Funded Neurovascular Program", d: "Ongoing NIH support of the Center&rsquo;s brain-chip and organoid disease-modeling program." },
            ].map((n, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="border-t border-black/20 pt-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-aggie-blue mb-4">Highlight · 0{i+1}</div>
                  <h3 className="font-serif text-2xl leading-snug text-aggie-navy">{n.t}</h3>
                  <p className="mt-3 text-sm text-editorial-text/80 leading-relaxed">{n.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="bg-white section-pad border-t border-black/10" data-testid="partners-strip">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionEyebrow n="§ 04">Funding &amp; Partners</SectionEyebrow>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10">
            {PARTNERS.map((p, i) => (
              <div key={i} className="bg-white h-32 flex items-center justify-center px-6 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all">
                <div className="font-serif text-xl md:text-2xl text-aggie-navy text-center leading-tight">{p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-aggie-void text-editorial-cream section-pad relative overflow-hidden">
        <div className="vascular-watermark opacity-40" />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <FadeIn>
            <div className="flex items-center gap-8 mb-10">
              <div className="w-16"><NerveLogo showWordmark={false} color="#F9F8F6" accent="#FDB927" /></div>
              <div className="h-px flex-1 bg-white/20" />
              <Overline className="text-aggie-gold">Get in touch</Overline>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight max-w-4xl">
              Curious about the work? Come join a lab meeting.
            </h2>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" data-testid="cta-contact"
                className="inline-flex items-center gap-2 bg-aggie-gold text-aggie-void px-6 py-4 font-mono text-xs uppercase tracking-widest hover:bg-white">
                Contact The Center <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/people" data-testid="cta-open-positions"
                className="inline-flex items-center gap-2 border border-white/40 text-white px-6 py-4 font-mono text-xs uppercase tracking-widest hover:border-aggie-gold hover:text-aggie-gold">
                Open PhD &amp; Postdoc Positions
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

const Stat = ({ n, label }) => (
  <div>
    <div className="font-serif text-4xl md:text-5xl text-aggie-gold font-light">{n}</div>
    <div className="mt-2 text-xs text-white/60 max-w-[16ch] leading-snug">{label}</div>
  </div>
);
