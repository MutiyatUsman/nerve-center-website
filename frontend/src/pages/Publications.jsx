import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PageHero from "../components/PageHero";
import { FadeIn, SectionEyebrow } from "../components/Reveal";
import { API } from "../lib/auth";

export default function Publications() {
  const [items, setItems] = useState([]);
  const [year, setYear] = useState("all");
  const [topic, setTopic] = useState("all");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(`${API}/publications`).then((r) => { setItems(r.data || []); setLoaded(true); }).catch(() => setLoaded(true));
  }, []);

  const years = useMemo(() => Array.from(new Set(items.map((i) => i.year))).sort((a, b) => b - a), [items]);
  const topics = useMemo(() => Array.from(new Set(items.map((i) => i.topic).filter(Boolean))), [items]);
  const filtered = items.filter((i) =>
    (year === "all" || i.year === Number(year)) && (topic === "all" || i.topic === topic)
  );

  return (
    <main data-testid="publications-page">
      <PageHero
        eyebrow="§ Publications"
        title={["Peer-reviewed work", "from the", <em key="e" className="not-italic text-aggie-gold">NERVE Center.</em>]}
        lead="Filter by year or topic. Each entry links to its DOI."
      />
      <section className="bg-editorial-cream section-pad">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionEyebrow n="§ 01">Filter</SectionEyebrow>
          <div className="flex flex-wrap gap-4 mb-12">
            <FilterSelect testid="filter-year" value={year} onChange={setYear} label="Year"
              options={[["all", "All years"], ...years.map((y) => [String(y), String(y)])]} />
            <FilterSelect testid="filter-topic" value={topic} onChange={setTopic} label="Topic"
              options={[["all", "All topics"], ...topics.map((t) => [t, t])]} />
          </div>

          {loaded && filtered.length === 0 ? (
            <p className="font-mono text-xs uppercase tracking-widest text-aggie-navy/60">[Publications list forthcoming — populated via admin panel]</p>
          ) : (
            <ul className="divide-y divide-black/15">
              {filtered.map((p) => (
                <li key={p.id} data-testid={`pub-${p.id}`} className="py-8 grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-1 font-mono text-xs uppercase tracking-widest text-aggie-blue">{p.year}</div>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-2xl leading-snug text-aggie-navy">{p.title}</h3>
                    <div className="mt-2 text-sm text-editorial-text/80">{p.authors}</div>
                    {p.journal && <div className="mt-1 italic text-sm text-editorial-text/70">{p.journal}</div>}
                    {p.topic && <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-aggie-blue/80">{p.topic}</div>}
                  </div>
                  <div className="md:col-span-2 md:text-right">
                    {p.doi ? (
                      <a href={p.doi.startsWith("http") ? p.doi : `https://doi.org/${p.doi}`} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-2 border border-aggie-navy px-4 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-aggie-navy hover:text-editorial-cream transition-colors">
                        DOI ↗
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

const FilterSelect = ({ label, value, onChange, options, testid }) => (
  <label className="inline-flex items-center gap-3">
    <span className="font-mono text-[10px] uppercase tracking-widest text-aggie-navy/70">{label}</span>
    <select data-testid={testid} value={value} onChange={(e) => onChange(e.target.value)}
      className="bg-transparent border-b border-aggie-navy/40 px-2 py-1 font-mono text-xs uppercase tracking-widest text-aggie-navy focus:outline-none">
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  </label>
);
