# Admin — InfoSocio

## Stack
- React 19 + Vite 8 + Bootstrap 5 + SASS + Recharts
- PHP backend (REST API) in `/admin/api/`

## Dev
```bash
npm run dev        # http://localhost:5174
npm run build      # Build to /dist
```

## Proxy (Vite)
Redirects `/admin/api/...` to `http://localhost/infosocio/admin/api/` (Laragon).

## Auth
PHP session-based. Login via `POST /admin/api/index.php?action=login` (user: `admin`, pass: `123`).

## Pages
| Route | File | Description |
|---|---|---|
| `/login` | LoginPage | Admin login form |
| `/` | DashboardPage | Stats + monthly chart (real data) |
| `/solicitudes` | RequestsPage | List with filters (search, estado, pago_estado, dates via URL params) |
| `/solicitudes/:id` | RequestDetailPage | Detail + colored estado buttons (warning/danger/success) |
| `/precio` | PricePage | Edit report price |
| `/generar-informe` | GenerateReportPage | Placeholder (blank) |

## Design
- White sidebar (`#ffffff`), nav links `#555`, active/hover in red.
- Red tones (`#b71c1c`, `#c62828`) — no blue.
- Sidebar hidden on mobile, toggled via hamburger button.
- Logo: `src/assets/images/logo-full.png`, max-width 90px.
- Bootstrap SASS deprecation warnings are harmless.

## Key files
- `src/styles/_variables.scss` — color variables
- `src/styles/admin.scss` — sidebar, responsive, global admin styles
- `src/components/Sidebar.jsx` — sidebar with logo + nav
- `src/components/AdminLayout.jsx` — layout with sidebar toggle
- `src/components/AdminHeader.jsx` — top header with user info + logout
- `src/context/AuthContext.jsx` — auth context (PHP session)
- `api/controllers/*.php` — PHP API controllers
- `api/index.php` — router
