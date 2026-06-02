# Web — InfoSocio

## Stack
- React 19 + Vite 8 + Bootstrap 5 + SASS

## Base path
`base: '/web/'` — the app lives at `http://infosocio.test/web/`.

## Dev
```bash
npm run dev        # http://localhost:5173/web/
npm run build      # Build to /dist → served by Laragon at http://infosocio.test/web/
```

## Proxy (Vite)
Redirects `/admin/api/...` to `http://localhost/infosocio/admin/api/` (Laragon).

## Pages
| Route | File |
|---|---|
| `/` | HomePage — hero + search + services + about |
| `/nosotros` | AboutPage |
| `/servicios` | ServicesPage |
| `/resultados?q=...` | ResultsPage (static results) |
| `/solicitar?userId=X` | SolicitarPage (request form) |

## Design
- Red tones (`#b71c1c`, `#c62828`) — no blue.
- Search button: dark background (`btn-dark`), white text.
- Bootstrap SASS deprecation warnings are harmless.

## Search behavior (static)
Home search captures input → navigates to `/resultados?q=...` → shows 2 static items with decorative filters.

## Key files
- `src/styles/_variables.scss` — color variables
- `src/styles/main.scss` — global styles
- `src/components/SearchBar.jsx` — search input + button
