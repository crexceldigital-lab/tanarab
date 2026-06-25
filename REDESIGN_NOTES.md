# TanRab Redesign — What Changed

This is your existing project, rebranded from **TANARAB** to **TanRab** with a new
navy + gold luxury design system inspired by the TanRab company profile.

## How to use this
1. Unzip this folder.
2. Copy it over your existing project folder (or open it directly in VS Code) —
   it's the same project structure, just with the files below updated.
3. Run `npm install` (use `npm install --legacy-peer-deps` if you hit a peer
   dependency error from `react-leaflet-cluster` — that conflict exists in the
   original project too, unrelated to this redesign).
4. Run `npm run dev` and open the homepage.

## Design system (the foundation — affects the whole site automatically)
- **`src/index.css`** — new color tokens: warm ivory background, deep navy
  (`#0E1C33`) secondary, TanRab gold (`#C9A227`) primary, plus dark mode
  equivalents. New utility classes: `.font-display`, `.eyebrow`,
  `.text-gradient-gold`, `.bg-gold-gradient`, `.bg-hero-gradient`,
  `.shadow-gold-glow`.
- **`tailwind.config.ts`** — added a full `gold` and `navy` color scale
  (`gold-50`…`gold-900`, `navy-50`…`navy-900`), a `display` font family
  (Playfair Display, for headlines), and `luxury` / `gold-glow` shadows.
- **`src/components/ui/button.tsx`** — added two new button variants:
  `variant="luxury"` (gold-gradient CTA) and `variant="navy"`.

Because almost every component in this project already uses semantic
Tailwind tokens (`bg-primary`, `text-secondary`, `border-border`, etc.) rather
than hard-coded colors, this token change cascades through pages that
weren't touched directly (Properties, PropertyDetail, dashboards, etc).

## New brand components
- **`src/components/Logo.tsx`** — the "TanRab" lockup (skyline + bridge mark,
  gold "Rab"). Use `<Logo />`, `<Logo variant="light" />` (for navy/dark
  backgrounds), sizes `sm | md | lg`, and `showTagline` for the
  "Tanzania · Gulf Bridge" tagline.
- **`src/components/GoldDivider.tsx`** — the small ✦ divider used under
  section labels, echoing the company profile's styling.

## Rewritten for a premium feel
- `src/components/Navbar.tsx` — glass nav, gold hover underline, gold CTA.
- `src/components/HeroSection.tsx` — full-bleed photo hero with navy gradient
  overlay, serif headline, glass search bar.
- `src/components/PropertyCard.tsx` — refined card with gold/navy badges.
- `src/components/Footer.tsx` — navy footer listing both the Tanzania and
  Dubai office details (reflecting the Tanzania–Gulf bridge positioning).
- `src/pages/Index.tsx` — rebranded copy, new "bridge" strip under the hero,
  consistent eyebrow/heading treatment throughout.
- `src/pages/About.tsx`, `Login.tsx`, `Signup.tsx`, `ForgotPassword.tsx`,
  `ResetPassword.tsx`, `Onboarding.tsx`, `DashboardLayout.tsx` — rebranded
  text and visual touch-ups (Logo component, luxury buttons, serif headings).
- `index.html` — title/meta updated to TanRab.
- `public/favicon.svg` + `public/favicon.ico` — new brand mark favicon
  (multi-resolution .ico generated for browser compatibility).

## Not touched (left as-is, will still inherit the new colors automatically)
`Properties.tsx`, `PropertyDetail.tsx`, `Developers.tsx`, `MapSearch.tsx`,
and the dashboard sub-pages — these all use the same semantic tokens, so
they already look navy/gold. If you want the same hand-styling treatment
(eyebrow labels, serif headings, gold dividers) applied there too, just ask.

## Verified
`npm run build` and `npx tsc --noEmit` both pass cleanly on this project.
