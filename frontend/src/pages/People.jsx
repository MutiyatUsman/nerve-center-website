import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHero from "../components/PageHero";
import { FadeIn, SectionEyebrow } from "../components/Reveal";
import { API } from "../lib/auth";
import { Mail } from "lucide-react";

export default function People() {
  const [members, setMembers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios.get(`${API}/members`).then((r) => { setMembers(r.data || []); setLoaded(true); }).catch(() => setLoaded(true));
  }, []);

  const director = members.find((m) => m.category === "director");
  const others = members.filter((m) => m.category !== "director" && m.category !== "alumni");
  const alumni = members.filter((m) => m.category === "alumni");

  return (
    <main data-testid="people-page">
      <PageHero
        eyebrow="§ People"
        title={["The people behind", <em key="e" className="not-italic text-aggie-gold">NERVE.</em>]}
        lead="Faculty, postdocs, PhD students, and alumni working across five interlinked research pillars."
      />

      {/* Director */}
      <section className="bg-editorial-cream section-pad border-t border-black/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionEyebrow n="§ 01">Director</SectionEyebrow>
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <div className="aspect-[4/5] bg-aggie-navy overflow-hidden">
                {director?.photo_url ? (
                  <img src={director.photo_url} alt={director.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-editorial-cream/40 font-mono text-xs uppercase tracking-widest">
                    [Director Portrait]
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-7">
              <h2 className="font-serif text-5xl md:text-6xl leading-[1.02] tracking-tight text-aggie-navy">
                {director?.name || "Dr. Yeoheung Yun"}
              </h2>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-aggie-blue">
                {director?.role || "Director · Professor of Chemical, Biological & Bioengineering"}
              </div>
              <p className="mt-8 text-base leading-relaxed text-editorial-text/85 max-w-2xl">
                {director?.bio || "Ph.D. in Mechanical Engineering, University of Cincinnati. Joined NC A&T in 2010 as founding bioengineering faculty. Recipient of the O. Max Gardner Award. Also directs the affiliated FIT BEST Laboratory."}
              </p>
              <div className="mt-8 space-y-2 font-mono text-xs uppercase tracking-widest text-aggie-navy/80">
                <div className="flex items-center gap-3"><Mail className="w-3.5 h-3.5" /> {director?.email || "yyun@ncat.edu"}</div>
                <div>Office · Fort IRC Building, Room 119</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="bg-white section-pad border-t border-black/10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionEyebrow n="§ 02">Members</SectionEyebrow>
          {loaded && others.length === 0 ? (
            <p className="font-mono text-xs uppercase tracking-widest text-aggie-navy/60">
              [Roster forthcoming — populated via admin panel]
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {others.map((m) => <MemberCard key={m.id} m={m} />)}
            </div>
          )}
        </div>
      </section>

      {alumni.length > 0 && (
        <section className="bg-editorial-cream section-pad border-t border-black/10">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <SectionEyebrow n="§ 03">Alumni</SectionEyebrow>
            <ul className="divide-y divide-black/10">
              {alumni.map((a) => (
                <li key={a.id} className="py-4 flex flex-wrap items-baseline gap-x-6 gap-y-1">
                  <span className="font-serif text-xl text-aggie-navy">{a.name}</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-aggie-blue/80">{a.role}</span>
                  {a.focus_area && <span className="text-sm text-editorial-text/70">{a.focus_area}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-aggie-navy text-editorial-cream section-pad">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionEyebrow n="§ Join">Open positions</SectionEyebrow>
          <h2 className="font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight max-w-4xl">Join the Center.</h2>
          <p className="mt-6 text-white/70 max-w-2xl">PhD, postdoctoral, and research-associate positions open on a rolling basis.
            Interested candidates should reach out with a CV and short research statement.</p>
          <a href="mailto:yyun@ncat.edu" data-testid="join-cta"
            className="mt-8 inline-flex items-center gap-2 bg-aggie-gold text-aggie-void px-6 py-4 font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors">
            Email the Director →
          </a>
        </div>
      </section>
    </main>
  );
}

const MemberCard = ({ m }) => (
  <FadeIn>
    <div className="group">
      <div className="aspect-[4/5] bg-editorial-stone overflow-hidden">
        {m.photo_url ? (
          <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-aggie-navy/40">[Photo]</div>
        )}
      </div>
      <div className="mt-3">
        <div className="font-serif text-lg text-aggie-navy">{m.name}</div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-aggie-blue/80">{m.role}</div>
        {m.focus_area && <div className="text-xs text-editorial-text/70 mt-1">{m.focus_area}</div>}
      </div>
    </div>
  </FadeIn>
);
