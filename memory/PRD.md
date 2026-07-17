## NERVE Center Website — original problem statement

Build a professional academic research center website for the NERVE Center (Center for
Neurovascular Engineering Research and adVanced Education) at North Carolina A&T State
University. Editorial, national-lab-style polish for the public site, plus a JWT-protected
built-in admin dashboard for self-service editing of members, publications, and news.
Cloudinary-signed image uploads. Framer-motion + Lenis for smooth, kinetic motion.

## Architecture — What Has Been Implemented (Dec 2025)

**Backend (FastAPI, MongoDB, Motor async)** — `/app/backend/server.py`
- JWT (PyJWT + bcrypt), httpOnly access + refresh cookies, Bearer fallback
- Admin seed at startup from `ADMIN_EMAIL`/`ADMIN_PASSWORD`
- Signed Cloudinary upload endpoint at `/api/cloudinary/signature` (auth-gated)
- Public: `GET /api/members`, `GET /api/publications` (year/topic filters), `GET /api/news`, `POST /api/contact`
- Admin: full CRUD for members, publications, news; `GET /api/admin/contacts`

**Frontend (React 19 + Tailwind + Framer Motion + Lenis)**
- Public pages: Home, About, Research (with anchored focus areas + hash scroll), Education, People, Publications (filterable), Partnerships, News, Facilities, Contact (with map + form)
- Admin: `/admin/login`, `/admin/members`, `/admin/publications`, `/admin/news`, `/admin/contacts`
- Kinetic hero (line-by-line masked reveal + parallax + slow-rotating vascular SVG), editorial marquee, numbered manifesto chapters, research pillars grid with hover imagery, editorial numbered focus-area sections, dark-mode contact hero
- Custom brain + vascular linework logo (SVG, favicon + nav + footer)
- NC A&T institutional palette (Aggie Blue #004684, Aggie Gold #FDB927, deep navy anchors)
- Fraunces (display) + Inter Tight (body) + IBM Plex Mono (overlines)

**Personas**
- Site owner / editor (Dr. Yun) — logs in at `/admin/login`, manages content
- Prospective PhD applicants — read Research + Education + People, use Contact form
- Journalists / partners — browse News + Publications + Partnerships
- Peer researchers — Publications, Facilities, Contact

**Core requirements (static)**
- Fully responsive, WCAG-AA colors, semantic HTML, SVG favicon
- No hardcoded env values; `/api` prefix; `REACT_APP_BACKEND_URL` for all frontend calls
- Placeholder content, replaceable via admin panel without redeploy

## Prioritized Backlog

**P1**
- Add NC A&T official logo lockup to footer (link to ncat.edu) — awaiting owner's assets
- Add NIH RePORTER grant link once grant numbers confirmed
- Add publication filter chips (multi-select topics)
- Duotone treatment on People portraits via Cloudinary transform

**P2**
- Facilities page: instrumentation list with photos
- Director CV download (PDF)
- Password reset flow (currently owner uses env-driven reset)
- Search across publications
- News RSS feed
- Sitemap.xml

**P3**
- Additional collaborators section once confirmed
- Alumni placements listing enhancement
