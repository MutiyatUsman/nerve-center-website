import React from "react";

export const NerveLogo = ({ className = "", color = "currentColor", accent = "#FDB927", showWordmark = true }) => (
  <div className={`flex items-center gap-3 ${className}`} data-testid="nerve-logo">
    <svg viewBox="0 0 64 64" width="36" height="36" aria-hidden="true">
      {/* brain outline */}
      <path
        d="M32 8c-6 0-9 3-11 6-4-1-8 1-9 5-3 1-5 4-5 8 0 3 2 6 5 7-1 4 1 8 5 9 1 4 5 6 9 6h1c1 3 4 5 8 5s6-2 8-5h1c4 0 8-2 9-6 4-1 6-5 5-9 3-1 5-4 5-7 0-4-2-7-5-8-1-4-5-6-9-5-2-3-5-6-11-6h-6z"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* vertical fissure */}
      <path d="M32 10v45" fill="none" stroke={color} strokeWidth="1" opacity="0.55" />
      {/* vascular branching */}
      <g stroke={accent} strokeWidth="0.9" fill="none" opacity="0.95">
        <path d="M20 22c3 2 5 5 6 9M16 30c4 1 8 3 10 6M20 40c3 0 6 2 8 5M24 48c2 0 4 1 5 3" />
        <path d="M44 22c-3 2-5 5-6 9M48 30c-4 1-8 3-10 6M44 40c-3 0-6 2-8 5M40 48c-2 0-4 1-5 3" />
      </g>
      <circle cx="32" cy="10" r="1.2" fill={accent} />
    </svg>
    {showWordmark && (
      <div className="leading-none">
        <div className="font-serif text-[22px] tracking-tight" style={{ color }}>NERVE</div>
        <div className="font-mono text-[9px] tracking-[0.22em] uppercase opacity-70" style={{ color }}>Center · NC A&amp;T</div>
      </div>
    )}
  </div>
);

export default NerveLogo;
