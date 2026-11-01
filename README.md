# Sourav Mallick - Personal Portfolio
Click-> https://franky1107.github.io/Portfolio/

A sleek, modern, and highly responsive personal portfolio website built to showcase my projects, skills, and background as a Computer Science student and aspiring Software Developer.

## 🚀 Features

- **Dynamic Hero Section:** Immersive full-screen fading image layout with modern typography.
- **Smooth Scrolling:** [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll) + [GSAP](https://gsap.com/) for momentum scrolling and scroll-triggered animations.
- **Greeting Splash Navigation:** Multilingual "Hello" transition when jumping between sections.
- **Responsive Design:** Mobile menu, floating action button (FAB), and responsive grids.
- **Interactive UI:** Project filtering, animated skill bars, velocity-reactive marquee, and a contact form.

## 💻 Tech Stack

- **Next.js (App Router) + React** — component-based UI, statically exported for GitHub Pages.
- **CSS** — custom properties, Flexbox/Grid, keyframe animations (`app/globals.css`).
- **GSAP & Locomotive Scroll** — animation and smooth scrolling.

## 📁 Project Structure

```
app/
  layout.jsx          # <html>, fonts, metadata, global CSS
  page.jsx            # assembles the page from sections
  globals.css         # all site styles
components/
  SiteProvider.jsx    # smooth scroll, nav state, splash transition, reveal
  Loader.jsx  Navbar.jsx  NavSplash.jsx  SectionLink.jsx ...
  sections/           # Hero, About, Skills, Projects, Education, ...
lib/
  content.js          # ✏️ all text/data — edit this to update the site
  scrollEffects.js    # reveal, hero entrance, marquee, snapping
assets/hero-photo.png
```

To update projects, skills, achievements or blog posts, just edit `lib/content.js`.

## 🛠️ How to Run

Requires Node.js 20.9+.

```bash
git clone https://github.com/Franky1107/Portfolio.git
cd Portfolio
npm install
npm run dev        # http://localhost:3000
```

Production build (static HTML in `out/`):

```bash
npm run build
```

Builds are served under `/Portfolio` to match GitHub Pages. For a root-domain deploy, build with `BASE_PATH="" npm run build`.

## 🚢 Deployment

**Vercel:** import the repo at vercel.com and set the production branch. The base path is
detected automatically (served from `/`), no extra settings needed.

**GitHub Pages:**

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.
In the repo go to **Settings → Pages → Source** and choose **GitHub Actions** (one-time setup).

## 📫 Contact

Feel free to reach out via the Contact form directly on the site if you'd like to connect!
