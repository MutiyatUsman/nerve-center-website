# NERVE Center Website

**Center for Neurovascular Engineering Research and adVanced Education (NERVE)**
North Carolina A&T State University · Greensboro, NC

An academic research-center website with a built-in admin CMS. Editorial, motion-forward public site
paired with a JWT-protected admin dashboard for managing lab members, publications, news, and
contact messages. Image uploads flow through Cloudinary with automatic optimization.

---

## Stack

- **Frontend** — React 19, React Router, Tailwind CSS, Framer Motion, Lenis (smooth scroll), Sonner (toasts), shadcn/ui primitives
- **Backend** — FastAPI (Python), Motor (async MongoDB), PyJWT, bcrypt, Cloudinary Python SDK
- **Database** — MongoDB
- **Media** — Cloudinary signed uploads (`f_auto,q_auto` optimization)

---

## Project layout

```
/app
├── backend/                # FastAPI service (routes prefixed with /api)
│   ├── server.py           # auth, admin CRUD, Cloudinary signature, public list endpoints
│   ├── requirements.txt
│   └── .env                # MongoDB, JWT_SECRET, ADMIN_EMAIL/PASSWORD, CLOUDINARY_*
└── frontend/               # React app
    └── src/
        ├── App.js
        ├── components/     # Nav, Footer, Marquee, Reveal (masked line-by-line), NerveLogo, SmoothScroll
        ├── lib/auth.jsx    # AuthContext + axios helper
        ├── pages/          # Home, About, Research, Education, People, Publications, News,
        │                   # Partnerships, Facilities, Contact, AdminLogin, AdminApp
        └── index.css       # Tailwind + editorial base styles
```

---

## Environment variables

`backend/.env`
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
JWT_SECRET="<64-char hex>"
ADMIN_EMAIL="admin@nervecenter.org"
ADMIN_PASSWORD="<change me>"
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

`frontend/.env`
```
REACT_APP_BACKEND_URL=https://<your-emergent-preview>.preview.emergentagent.com
```

---

## Local development

```bash
# Backend (auto-reloaded via supervisor in this environment)
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
yarn install
yarn start
```

On first backend boot the admin user in `.env` is seeded automatically. Sign in at `/admin/login`.

---

## Admin panel

- URL — `/admin/login`
- Credentials — set via `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `backend/.env` (change and restart backend)
- Sections — Members, Publications, News, and Contact Messages
- Photos upload directly to Cloudinary using signed uploads (backend never proxies binary content)

---

## Public content endpoints

- `GET /api/members` — list members (public)
- `GET /api/publications?year=&topic=` — filterable publications
- `GET /api/news` — news feed
- `POST /api/contact` — public contact form submissions

Admin-only endpoints live under `/api/admin/*` and `/api/cloudinary/signature`.

---

## Deployment

This app is designed to be deployed on the Emergent platform (one-click). Source can then be
pushed to GitHub for version control. `REACT_APP_BACKEND_URL` in `frontend/.env` must point to
the deployed backend URL.

---

## Accessibility & SEO

- Semantic HTML sections with `<main>`, `<header>`, `<footer>`, `<address>`.
- All interactive elements carry `data-testid` attributes.
- Meta description, Open Graph tags, and SVG favicon set in `public/index.html`.
- Keyboard-focusable navigation with visible focus states via Tailwind defaults.
