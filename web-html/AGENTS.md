# web-html — Static PHP Pages

## Objective
Create plain PHP + HTML5 + CSS3 pages in `/web-html/` that mirror the **exact text content** (every word, unaltered) of the React JSX pages in `/web/src/pages/`. Replace React/JSX with vanilla JavaScript for interactivity. No frameworks, no build steps.

## Execution flow
1. Read this `AGENTS.md` for global rules, stack, directory structure, and CSS/JS requirements.
2. For each PHP page to generate, read the corresponding `AGENTS-DOC/AGENTS-PAGE-*.md` file listed in the **Page Mapping** table below.
3. Each `AGENTS-DOC/AGENTS-PAGE-*.md` contains the full HTML content converted from the JSX `return()` — copy it verbatim into the `.php` output file.
4. Wrap each page with `<?php include 'include/header.php'; ?>` at top and `<?php include 'include/footer.php'; ?>` at bottom.
5. For reusable components (see **AGENTS-INCLUDE files** table below), read the corresponding `AGENTS-DOC/AGENTS-INCLUDE-*.md` file and create the PHP include first, before the pages that use them.

## Stack
- **PHP 8+** — pure, no framework
- **HTML5** — semantic markup
- **CSS3** — Bootstrap 5 + Bootstrap Icons via CDN, plus a custom `style.css`
- **Vanilla JS** — for interactive behavior (slider, filter toggle)

## Libraries (CDN)
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

## AGENTS-INCLUDE files & services

| Component/Service | Instructions file | PHP output | Description |
|---|---|---|---|
| `Header.jsx` | `AGENTS-DOC/AGENTS-INCLUDE-Header.md` | `include/header.php` | DOCTYPE, head (CDN), nav, offcanvas mobile menu, scroll detection (vanilla JS) |
| `Footer.jsx` | `AGENTS-DOC/AGENTS-INCLUDE-Footer.md` | `include/footer.php` | Footer links, contact info, copyright, closing body/html tags |
| `SearchBar.jsx` | `AGENTS-DOC/AGENTS-INCLUDE-SearchBar.md` | `include/search-bar.php` | Search input + submit button, accepts `$large` bool for expanded variant |
| `FilterSidebar.jsx` | `AGENTS-DOC/AGENTS-INCLUDE-FilterSidebar.md` | `include/filter-sidebar.php` | 4 filter selects (Sexo, Edad, Provincia, Ciudad) with dynamic counts and auto-submit |
| `Pagination.jsx` | `AGENTS-DOC/AGENTS-INCLUDE-Pagination.md` | `include/pagination.php` | Prev/next + page number buttons via PHP foreach loop |
| `ResultCard.jsx` | `AGENTS-DOC/AGENTS-INCLUDE-ResultCard.md` | `include/result-card.php` | Persona data card with "Solicitar Informe" link (passes persona via URL params) |
| `ServiceCard.jsx` | *(skip — unused, imported nowhere)* | *(none)* | Dead code; not referenced in any page |
| `searchApi.js` | `AGENTS-DOC/AGENTS-SERVICES-SearchApi.md` | `include/search-api.php` | cURL wrapper for `/admin/api/buscar-basic.php` with `searchPeople()` function |

## Directory Structure
```
/web-html/
├── AGENTS.md                    # Main orchestrator — read this first
├── AGENTS-DOC/                  # Instruction files for pages, includes, and CSS
│   ├── AGENTS-CSS-STYLE.md          # CSS converted from SCSS (for assets/css/style.css)
│   ├── AGENTS-INCLUDE-Header.md     # Header nav + DOCTYPE/head include
│   ├── AGENTS-INCLUDE-Footer.md     # Footer + scripts/closing tags include
│   ├── AGENTS-INCLUDE-SearchBar.md  # Search bar form include
│   ├── AGENTS-INCLUDE-FilterSidebar.md # Filter sidebar selects include
│   ├── AGENTS-INCLUDE-Pagination.md # Pagination buttons include
│   ├── AGENTS-SERVICES-SearchApi.md # PHP search service (cURL -> API)
│   ├── AGENTS-INCLUDE-ResultCard.md # Result card include
│   ├── AGENTS-PAGE-HomePage.md      # HTML content for index.php
│   ├── AGENTS-PAGE-InfotargetPage.md # HTML content for infotarget.php
│   ├── AGENTS-PAGE-ServicesPage.md  # HTML content for servicios.php
│   ├── AGENTS-PAGE-InfoboostPage.md # HTML content for infoboost.php
│   ├── AGENTS-PAGE-ResultsPage.md   # HTML content for resultados.php
│   ├── AGENTS-PAGE-SolicitarPage.md # HTML content for solicitar.php
│   ├── AGENTS-PAGE-TyCPage.md       # HTML content for terminos.php
│   ├── AGENTS-PAGE-PrivacidadPage.md# HTML content for privacidad.php
│   └── AGENTS-PAGE-CancelacionPage.md# HTML content for cancelacion.php
├── .htaccess                # Clean URL routing (mod_rewrite)
├── assets/css/style.css
├── include/
│   ├── header.php
│   ├── footer.php
│   ├── search-bar.php
│   ├── filter-sidebar.php
│   ├── pagination.php
│   ├── result-card.php
│   └── search-api.php
├── js/scripts.js
├── index.php          # HomePage
├── infotarget.php     # AboutPage (InfoTarget)
├── servicios.php      # ServicesPage
├── infoboost.php      # InfoboostPage
├── resultados.php     # ResultsPage
├── solicitar.php      # SolicitarPage
├── terminos.php       # TyCPage
├── privacidad.php     # PrivacidadPage
└── cancelacion.php    # CancelacionPage
```

## Page Mapping

| JSX file | PHP output | Instructions file | Route | Key sections |
|---|---|---|---|---|
| `HomePage.jsx` | `index.php` | `AGENTS-DOC/AGENTS-PAGE-HomePage.md` | `.` | Hero + slider + about + 8 benefit cards + InfoBoost/InfoTarget cards |
| `AboutPage.jsx` | `infotarget.php` | `AGENTS-DOC/AGENTS-PAGE-InfotargetPage.md` | `infotarget` | Hero + "What is" + 3-step transform + 3 features + 4 benefits + 3 steps + CTA + contact form |
| `ServicesPage.jsx` | `servicios.php` | `AGENTS-DOC/AGENTS-PAGE-ServicesPage.md` | `servicios` | Hero + 8 plan cards with badges |
| `InfoboostPage.jsx` | `infoboost.php` | `AGENTS-DOC/AGENTS-PAGE-InfoboostPage.md` | `infoboost` | Hero + "What is" (3 steps) + 4 info cards + CTA + contact form |
| `ResultsPage.jsx` | `resultados.php` | `AGENTS-DOC/AGENTS-PAGE-ResultsPage.md` | `resultados?q=...` | Dynamic results via search API + filter (sexo/edad) + pagination |
| `SolicitarPage.jsx` | `solicitar.php` | `AGENTS-DOC/AGENTS-PAGE-SolicitarPage.md` | `solicitar` | Persona card + email fields + static price |
| `TyCPage.jsx` | `terminos.php` | `AGENTS-DOC/AGENTS-PAGE-TyCPage.md` | `terminos-y-condiciones` | 12 sections of legal text |
| `PrivacidadPage.jsx` | `privacidad.php` | `AGENTS-DOC/AGENTS-PAGE-PrivacidadPage.md` | `politicas-de-privacidad` | Terms 1-7 + Privacy 1-7 legal text |
| `CancelacionPage.jsx` | `cancelacion.php` | `AGENTS-DOC/AGENTS-PAGE-CancelacionPage.md` | `cancelacion-datos` | Form header + 5-field form + success message |

## URL Routing (.htaccess)

All internal links use relative clean URLs (no leading `/`, no `.php` extension). The `.htaccess` file maps them via `mod_rewrite`:

| Clean URL | PHP file |
|---|---|
| `.` (home) | `index.php` (DirectoryIndex) |
| `infoboost` | `infoboost.php` |
| `infotarget` | `infotarget.php` |
| `resultados` | `resultados.php` |
| `solicitar` | `solicitar.php` |
| `terminos-y-condiciones` | `terminos.php` |
| `politicas-de-privacidad` | `privacidad.php` |
| `cancelacion-datos` | `cancelacion.php` |
| `servicios` | `servicios.php` |

A catch-all rewrite rule sends unmatched requests to `index.php` (SPA fallback).

## Header — active nav link
The `header.php` include detects the current route via `$_SERVER['REQUEST_URI']` and adds `class="active"` to the matching nav link (Inicio, InfoBoost, InfoTarget). Pages without a matching route get no active class.

## Content Rules

### CRITICAL: Copy text verbatim
Every Spanish string must be copied **exactly** — same words, accents, punctuation, line breaks. Do not paraphrase, summarize, or reword anything.

### JSX → PHP/HTML translation
| JSX | PHP/HTML |
|---|---|
| `{plan.title}` | Hardcode value directly |
| `{items.map(...)}` | Repeat HTML block for each item |
| `<Link to="/x">` | `<a href="/x">` |
| `className="..."` | `class="..."` |
| `style={{ color: '#b71c1c' }}` | `style="color: #b71c1c"` |
| `{\`bi \${icon}\`}` | Hardcode `<i class="bi bi-...">` |
| Conditionals | `<?php if: ?>` or direct HTML |

### Omit (React-specific)
- `import`, `export default`, `useState`, `useEffect`, `useRef`, JSX `{}`, `onChange`, `onSubmit`, `onClick`, `useNavigate`, `useSearchParams`, `useLocation`, `fetch()`, `window.location.href`

## Interactive Behavior (Vanilla JS in `js/scripts.js`)

### 1. Header — scroll detection
Add/remove class `.navbar-scrolled` on `#mainNav` when `window.scrollY >= window.innerHeight`.

### 2. Header — mobile offcanvas menu
Open: add `.show` class (or display:block) on `#navOffcanvas` + show `#navOverlay` when `#navbarToggler` is clicked.
Close: hide both when `#navCloseBtn` or `#navOverlay` is clicked.

### 3. SearchBar — form submit
On `.search-container` form submit: `preventDefault()`, grab input value, `window.location.href = '/resultados?q=' + encodeURIComponent(value)`.

### 4. HomePage slider (exact replica of lines 28-64)
- `CARD_WIDTH = 228`, 8 real slides, cloned for infinite loop (16 total)
- Responsive gap: 24px (>=992), 16px (>=768), 12px (default)
- Auto-scroll every 1000ms with `transform: translateX(-Npx)` and `transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- When reaching clone start, instantly jump to 0 (no transition)
- Recalculate gap on window resize

### 5. Filter toggle (mobile)
Toggle `.d-none` / `.d-md-flex` on `.filter-content` when `.filter-toggle-btn` is clicked.

### 6. Price display
Format static price as `$ 15.200` using `Intl.NumberFormat('es-AR')`.

## Forms — Static Markup Only
Render all fields with exact labels/placeholders, but **no** `action`, `method`, `onsubmit`, or JS validation. Visual-only.

Forms: AboutPage (8 fields), InfoboostPage (8 fields), SolicitarPage (3 fields), CancelacionPage (5 fields).

SolicitarPage: show the form markup as-is (no conditional success/error states).
CancelacionPage: show the form (not the success message).

## CSS — style.css
Extract styles from all className-based classes AND all inline `style={{...}}` values. Key palette:
- Red: `#b71c1c`, `#c62828`, `#fef2f2`
- Dark: `#0a0a1a`, `rgba(0,0,0,0.9)`, `rgba(255,255,255,0.05)`
- Text: `#fff`, `#1a1a1a`, `#555`, `#666`, `rgba(255,255,255,0.7)`
- Success: `#22c55e`, `#2e7d32`, `#e8f5e9`

Classes to style: `about-hero`, `about-hero-bg`, `about-hero-title`, `about-hero-sub`, `about-btn-primary`, `about-btn-outline`, `about-section`, `about-label`, `about-title`, `about-text`, `about-benefits-section`, `about-benefit-card`, `about-transform-section`, `about-transform-card`, `about-features-section`, `about-feat-card`, `about-cta-section`, `about-stats-row`, `about-steps`, `about-step`, `about-form`, `about-input`, `about-textarea`, `home-hero`, `home-slider`, `home-slider-track`, `home-slide`, `home-slide-card`, `home-slide-icon`, `home-slide-title`, `home-about-card`, `home-about-list`, `home-about-item`, `home-hero-floating-link`, `services-hero`, `plan-card`, `plan-badge`, `plan-icon`, `plan-title`, `plan-desc`, `plan-btn`, `about-hero-visual`, `about-circle`, `about-hero-card`, `about-tag`, `about-targets`, `about-target-list`, `about-target-item`, `about-target-icon`, `about-transform-grid`, `about-transform-arrow`, `about-tc-number`, `about-feat-icon`, `about-feat-tags`, `about-stat-num`, `about-stat-label`, `about-step-num`, `about-step-line`, `about-step-content`, `about-buttons`, `results-filter-wrap`, `text-gradient`

## Per-Page Checklist

### index.php — 236 lines
- [ ] Hero: h1 "Información estratégica para tomar decisiones seguras", subtitle, SearchBar, floating link "Ver informe demo"
- [ ] Slider: 8 items x2 (16 slides) with `sliderItems` icons and titles
- [ ] About: "SOBRE NOSOTROS", h2 "InfoSocio", 2 paragraphs, "Conocé más", card with 6 links
- [ ] Benefits: "¿Que contiene el informe?", 8 plan cards
- [ ] Plans: "PLANES Y SERVICIOS", InfoBoost + InfoTarget cards

### infotarget.php — 376 lines
- [ ] Hero: "InfoTarget" tag, h1 with "Encontrá a tus próximos clientes con Inteligencia de la Información", "DATOS EN VIVO 12.4M"
- [ ] "¿QUÉ ES?": paragraph, 10M+/98% stats, 3 service targets
- [ ] Transform: "NUESTRO ENFOQUE", 3 steps with arrows
- [ ] Features: 3 cards (Segmentación, Informes, BD Personalizadas)
- [ ] Benefits: 4 cards
- [ ] Process: 3 steps (Definimos → Procesamos → Descargás)
- [ ] CTA + contact form

### servicios.php — 97 lines
- [ ] Hero + 8 plan cards with badges

### infoboost.php — 271 lines
- [ ] Hero: "InfoBoost" tag, "Multiplicá el poder...", "ENRIQUECIMIENTO 100%"
- [ ] "¿QUÉ ES?": paragraph, 3 steps (Subís → Elegís → Descargás)
- [ ] Info cards: 4 (Datos Particulares, Vínculos, Bienes Personales, Morosidad)
- [ ] CTA + contact form

### resultados.php — dynamic
- [x] Dynamic results via search API (cURL to `/admin/api/buscar-basic.php`)
- [x] Filter (sexo/edad) with auto-submit on select change
- [x] Pagination (10 per page)
- [x] States: no-query, loading (spinner), error (alert), no-results, results

### solicitar.php — 243 lines
- [ ] Persona card, email/confirm email/WhatsApp, static "$ 15.200", "Pagar con MercadoPago" button

### terminos.php — 219 lines
- [ ] All 12 sections of legal text, email link, date 26/05/2026

### privacidad.php — 209 lines
- [ ] Terms 1-7 + Privacy 1-7, email link, date 26/05/2026

### cancelacion.php — 142 lines
- [ ] "CANCELACIÓN DE DATOS", 5-field form, success message

## Implementation Order
1. `assets/css/style.css` (use `AGENTS-DOC/AGENTS-CSS-STYLE.md`)
2. `include/header.php` (use `AGENTS-DOC/AGENTS-INCLUDE-Header.md`)
3. `include/footer.php` (use `AGENTS-DOC/AGENTS-INCLUDE-Footer.md`)
4. `include/search-bar.php` (use `AGENTS-DOC/AGENTS-INCLUDE-SearchBar.md`)
5. `include/filter-sidebar.php` (use `AGENTS-DOC/AGENTS-INCLUDE-FilterSidebar.md`)
6. `include/search-api.php` (use `AGENTS-DOC/AGENTS-SERVICES-SearchApi.md`)
7. `include/pagination.php` (use `AGENTS-DOC/AGENTS-INCLUDE-Pagination.md`)
8. `include/result-card.php` (use `AGENTS-DOC/AGENTS-INCLUDE-ResultCard.md`)
9. `js/scripts.js`
10. Static content: `terminos.php` (use `AGENTS-DOC/AGENTS-PAGE-TyCPage.md`), `privacidad.php` (use `AGENTS-DOC/AGENTS-PAGE-PrivacidadPage.md`)
11. Form pages: `cancelacion.php` (use `AGENTS-DOC/AGENTS-PAGE-CancelacionPage.md`), `solicitar.php` (use `AGENTS-DOC/AGENTS-PAGE-SolicitarPage.md`)
12. Content pages: `servicios.php` (use `AGENTS-DOC/AGENTS-PAGE-ServicesPage.md`), `infoboost.php` (use `AGENTS-DOC/AGENTS-PAGE-InfoboostPage.md`), `infotarget.php` (use `AGENTS-DOC/AGENTS-PAGE-InfotargetPage.md`), `resultados.php` (use `AGENTS-DOC/AGENTS-PAGE-ResultsPage.md`)
13. `index.php` (most complex — use `AGENTS-DOC/AGENTS-PAGE-HomePage.md`)

## Verification
- Every Spanish string matches the JSX file exactly
- All links/anchors correct
- Slider auto-scroll works
- Mobile filter toggle works
- No React/JSX/framework code remains
