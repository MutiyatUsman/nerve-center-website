import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { NerveLogo } from "./NerveLogo";

const NAV = [
  { label: "About", to: "/about" },
  { label: "Research", to: "/research", children: [
    { label: "Mini-Brain / Organoids", to: "/research#organoid" },
    { label: "Drug Delivery & Tissue", to: "/research#drug-delivery" },
    { label: "Imaging & Machine Learning", to: "/research#imaging" },
    { label: "Neurotechnology & Organ-on-Chip", to: "/research#neurotech" },
    { label: "Translational", to: "/research#translational" },
  ]},
  { label: "Education", to: "/education" },
  { label: "People", to: "/people" },
  { label: "Publications", to: "/publications" },
  { label: "News", to: "/news" },
  { label: "Facilities", to: "/facilities" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [loc.pathname]);

  const dark = loc.pathname === "/";
  const barBg = scrolled
    ? "bg-editorial-cream/90 border-b border-black/10 backdrop-blur-xl"
    : (dark ? "bg-transparent" : "bg-editorial-cream/90 border-b border-black/10 backdrop-blur-xl");
  const txt = scrolled ? "text-aggie-navy" : (dark ? "text-editorial-cream" : "text-aggie-navy");

  return (
    <header data-testid="site-nav" className={`fixed top-0 left-0 right-0 z-50 ${barBg} transition-[background,color] duration-500`}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-[68px] flex items-center justify-between">
        <Link to="/" data-testid="nav-home-logo" className="flex items-center">
          <NerveLogo color={txt.includes("cream") ? "#F9F8F6" : "#002147"} accent="#FDB927" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <div key={n.label} className="relative"
                 onMouseEnter={() => n.children && setDropdown(n.label)}
                 onMouseLeave={() => setDropdown(false)}>
              <NavLink to={n.to} data-testid={`nav-${n.label.toLowerCase()}`}
                className={({ isActive }) => `text-[13px] font-medium tracking-wide uppercase font-mono ${txt} ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"} transition-opacity flex items-center gap-1`}>
                {n.label} {n.children && <ChevronDown className="w-3 h-3" />}
              </NavLink>
              <AnimatePresence>
                {n.children && dropdown === n.label && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-full pt-3">
                    <div className="min-w-[280px] bg-white border border-black/10 shadow-xl p-2" data-testid="nav-research-dropdown">
                      {n.children.map((c) => (
                        <Link key={c.label} to={c.to}
                          className="block px-4 py-3 text-sm text-aggie-navy hover:bg-editorial-cream transition-colors font-sans">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <Link to="/contact" data-testid="nav-contact-cta"
          className={`hidden lg:inline-flex items-center gap-2 px-5 py-2 border ${scrolled || !dark ? "border-aggie-navy text-aggie-navy hover:bg-aggie-navy hover:text-editorial-cream" : "border-editorial-cream text-editorial-cream hover:bg-editorial-cream hover:text-aggie-navy"} transition-colors text-xs font-mono uppercase tracking-widest`}>
          Contact <span aria-hidden>→</span>
        </Link>

        <button data-testid="nav-mobile-toggle" onClick={() => setOpen(!open)}
          className={`lg:hidden ${txt}`} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            className="lg:hidden overflow-hidden bg-editorial-cream border-t border-black/10">
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV.map((n) => (
                <Link key={n.label} to={n.to} data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                  className="font-mono uppercase tracking-wider text-sm text-aggie-navy">{n.label}</Link>
              ))}
              <Link to="/contact" data-testid="mobile-nav-contact"
                className="mt-2 inline-flex px-5 py-2 border border-aggie-navy text-aggie-navy text-xs font-mono uppercase tracking-widest">Contact →</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
