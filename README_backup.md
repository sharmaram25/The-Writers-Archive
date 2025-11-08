# The Writer's Archive

An elegant, minimal, emotionally immersive digital library for showcasing personal Shayari (poetry). Built with React + Vite, TailwindCSS, Supabase, Framer Motion.

## ✨ Features
- Home page with random featured Shayari preview
- Collections grid with modal view (copy & share)
- About Author profile & social links
- Hidden Admin dashboard for Shayari CRUD (manual /admin route)
- Glassmorphism aesthetic (dark, vintage palette)
- Responsive, mobile-first design
 - Theme system: Love, Heart Break, Dreams, Memories. Admin selects from these only; Collections can filter/sort by theme.

## 🧩 Tech Stack
React, Vite, TailwindCSS, React Router, Supabase, Framer Motion.

## 📂 Structure
```
src/
  components/
    Navbar.jsx
    Footer.jsx
    ShayriCard.jsx
    Modal.jsx
    RandomShayri.jsx
    SharedUI/
      Button.jsx
      Loader.jsx
      Toast.jsx
  pages/
    Home.jsx
    Collections.jsx
    About.jsx
    Admin.jsx
  supabase/
    client.js
  styles/
    index.css
App.jsx
main.jsx
```

## 🔧 Setup
1. Clone repo
2. Install dependencies:
```bash
npm install
```
3. Configure Supabase: create project & tables (only `shayris`). Use `supabase_schema.sql` in the repo root. This will also create a trigger to auto-generate the `preview` from the first 4 lines of `full_content` on insert/update.

4. Copy `.env.local.example` to `.env.local` and fill values:
```
VITE_SUPABASE_URL=... 
VITE_SUPABASE_ANON_KEY=...
```

If you already have real values, place them directly. Never commit the real keys; `.gitignore` already ignores `.env*`.

5. Update `src/pages/About.jsx` with your actual author details (static content).

6. Run dev server:
```bash
npm run dev
```

## 🚀 Deploy (Vercel)
1. Import project in Vercel
2. Set Environment Variables (same as `.env.local`)
3. Build command: `npm run build` ; Output directory: `dist`

## � Deploy (Netlify)
1. Create a new site from Git (choose this repository).
2. Netlify will auto-detect Vite. If not, set:
  - Build command: `npm run build`
  - Publish directory: `dist`
3. Add Environment Variables in Site Settings → Environment:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
4. Ensure `netlify.toml` is present (added in repo) for SPA redirects & caching.
5. Trigger a deploy; client-side routing will work because of the `/* -> /index.html` rule.

### Netlify Notes
- To force a dark default theme, remove the auto preference logic in `ThemeContext.jsx`.
- Use Netlify Analytics or Edge Functions later without changing build setup.
- For preview branches, each deploy inherits env vars; set them at the site level, not the UI build dashboard.

## �🛠 Design Consistency
- Shared glass classes in `index.css`
- Font families loaded in `index.html`
- Unified radii (`rounded-glass`) & shadows

## 🔐 Admin Access
Navigate directly to `/admin` (no nav link). Make sure Supabase Row Level Security configured as desired.

## 📄 License
Personal project — not open for redistribution without permission.

---
Crafted to feel calm & timeless.
