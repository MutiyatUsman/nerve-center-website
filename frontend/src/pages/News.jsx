import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHero from "../components/PageHero";
import { FadeIn, SectionEyebrow } from "../components/Reveal";
import { API } from "../lib/auth";

export default function News() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios.get(`${API}/news`).then((r) => { setItems(r.data || []); setLoaded(true); }).catch(() => setLoaded(true));
  }, []);

  return (
    <main data-testid="news-page">
      <PageHero
        eyebrow="§ News & Media"
        title={["Press, awards", "and updates from", <em key="e" className="not-italic text-aggie-gold">the Center.</em>]}
      />
      <section className="bg-editorial-cream section-pad">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionEyebrow n="§ 01">Latest</SectionEyebrow>
          {loaded && items.length === 0 ? (
            <p className="font-mono text-xs uppercase tracking-widest text-aggie-navy/60">[Coverage forthcoming — populated via admin panel]</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {items.map((n) => (
                <FadeIn key={n.id}>
                  <article data-testid={`news-${n.id}`} className="group">
                    <div className="aspect-[4/3] bg-editorial-stone overflow-hidden mb-4">
                      {n.image_url ? (
                        <img src={n.image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-aggie-navy/40 font-mono text-[10px] uppercase tracking-widest">[Image]</div>
                      )}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-aggie-blue">{n.tag || "News"} · {n.date}</div>
                    <h3 className="mt-2 font-serif text-2xl leading-snug text-aggie-navy">{n.title}</h3>
                    {n.excerpt && <p className="mt-3 text-sm leading-relaxed text-editorial-text/80">{n.excerpt}</p>}
                  </article>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
