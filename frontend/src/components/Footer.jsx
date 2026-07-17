import React from "react";
import { Link } from "react-router-dom";
import { NerveLogo } from "./NerveLogo";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="relative bg-aggie-void text-editorial-cream">
      <div className="vascular-watermark opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          <div className="md:col-span-5">
            <NerveLogo color="#F9F8F6" accent="#FDB927" />
            <p className="mt-6 font-serif text-3xl md:text-4xl leading-[1.1] max-w-md">
              Advancing neurovascular engineering to understand and treat brain disease.
            </p>
            <p className="mt-6 text-sm text-white/60 max-w-md">
              Center for Neurovascular Engineering Research and adVanced Education,
              North Carolina A&amp;T State University.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-aggie-gold mb-4">Navigate</div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-aggie-gold transition-colors">About</Link></li>
              <li><Link to="/research" className="hover:text-aggie-gold transition-colors">Research</Link></li>
              <li><Link to="/education" className="hover:text-aggie-gold transition-colors">Education</Link></li>
              <li><Link to="/people" className="hover:text-aggie-gold transition-colors">People</Link></li>
              <li><Link to="/publications" className="hover:text-aggie-gold transition-colors">Publications</Link></li>
              <li><Link to="/news" className="hover:text-aggie-gold transition-colors">News</Link></li>
              <li><Link to="/facilities" className="hover:text-aggie-gold transition-colors">Facilities</Link></li>
              <li><Link to="/contact" className="hover:text-aggie-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-aggie-gold mb-4">Contact</div>
            <address className="not-italic text-sm space-y-1 text-white/80">
              <div>Fort IRC Building, Room 119</div>
              <div>NC A&amp;T State University</div>
              <div>Greensboro, NC 27411</div>
              <div className="pt-3">336-256-1152 ext. 2010</div>
              <div>336-285-3226</div>
              <div className="pt-3"><a href="mailto:yyun@ncat.edu" className="link-underline">yyun@ncat.edu</a></div>
            </address>
            <a href="https://www.ncat.edu" target="_blank" rel="noreferrer" className="inline-block mt-6 text-xs font-mono uppercase tracking-widest text-aggie-gold hover:text-white transition-colors">↗ ncat.edu</a>
          </div>
        </div>

        <div className="pt-8 pb-6 grid md:grid-cols-2 gap-6">
          <p className="text-xs text-white/50 max-w-2xl leading-relaxed">
            <span className="font-mono uppercase tracking-widest text-aggie-gold">Funding acknowledgment · </span>
            Research at the NERVE Center is supported in part by the National Institutes of Health (NIH).
            Content is solely the responsibility of the authors and does not necessarily represent the official
            views of the NIH.
          </p>
          <div className="text-xs text-white/40 md:text-right font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} NERVE Center · NC A&amp;T · All rights reserved
          </div>
        </div>

        <div aria-hidden className="mt-6 -mb-2 select-none">
          <div className="font-serif text-[18vw] leading-none tracking-tighter text-white/[0.04]">NERVE</div>
        </div>
      </div>
    </footer>
  );
}
