# admin-html — Static Admin PHP Pages

## Objective
Create plain PHP + HTML5 + CSS3 pages in `/admin-html/` that mirror the **exact same functionality** of the React SPA in `/admin/src/`. Replace React/JSX with vanilla JavaScript for interactivity. No frameworks, no build steps. The existing API in `/admin-html/api/` serves as the backend.

## Execution flow
1. Read this `AGENTS.md` for global rules, stack, directory structure, and CSS/JS requirements.
2. For each PHP page to generate, read the corresponding `AGENTS-DOC/AGENTS-PAGE-*.md` file listed in the **Page Mapping** table below.
3. Each `AGENTS-DOC/AGENTS-PAGE-*.md` contains instructions for the page content — translate React JSX to PHP/HTML.
4. Wrap each authenticated page with `<?php require 'include/header.php'; ?>` and `<?php require 'include/footer.php'; ?>`.
5. For reusable components, read the corresponding `AGENTS-DOC/AGENTS-INCLUDE-*.md` file and create the PHP include first.

## Stack
- **PHP 8+** — pure, no framework
- **HTML5** — semantic markup
- **CSS3** — Bootstrap 5 + Bootstrap Icons via CDN, plus a custom `admin.css`
- **Chart.js** — for dashboard bar chart (CDN)
- **Vanilla JS** — for sidebar toggle, filters, chart init, PDF generation

## Libraries (CDN)
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js"></script>
```

## Directory Structure
```
/admin-html/
├── AGENTS.md                    # Main orchestrator — read this first
├── AGENTS-DOC/                  # Instruction files for pages, includes, and CSS
│   ├── AGENTS-CSS-ADMIN.md          # CSS converted from SCSS (for assets/css/admin.css)
│   ├── AGENTS-INCLUDE-Header.md     # Header + nav + sidebar include
│   ├── AGENTS-INCLUDE-Sidebar.md    # Sidebar nav links
│   ├── AGENTS-INCLUDE-Footer.md     # Footer + scripts/closing tags include
│   ├── AGENTS-INCLUDE-StatusBadge.md# Status badge component
│   ├── AGENTS-INCLUDE-DataTable.md  # Data table component
│   ├── AGENTS-INCLUDE-ReportContent.md # Full report display
│   ├── AGENTS-INCLUDE-ScoringChart.md # Scoring gauge SVG
│   ├── AGENTS-SERVICES-ApiHelpers.md # API call helpers
│   ├── AGENTS-PAGE-LoginPage.md     # Login page
│   ├── AGENTS-PAGE-DashboardPage.md # Dashboard page
│   ├── AGENTS-PAGE-RequestsPage.md  # Solicitudes list page
│   ├── AGENTS-PAGE-RequestDetailPage.md # Solicitud detail page
│   ├── AGENTS-PAGE-PricePage.md     # Price edit page
│   └── AGENTS-PAGE-GenerateReportPage.md # Generate report page
├── api/                      # PHP REST API (copy from admin/api/)
├── assets/css/admin.css
├── assets/images/            # Logo files (logo-full.png, etc.)
├── include/
│   ├── header.php
│   ├── sidebar.php
│   ├── footer.php
│   ├── status-badge.php
│   ├── data-table.php
│   ├── report-content.php
│   ├── scoring-chart.php
│   └── api-helpers.php
├── js/scripts.js
├── index.php          # Router + auth check
├── login.php          # LoginPage
├── dashboard.php      # DashboardPage
├── solicitudes.php    # RequestsPage
├── solicitud.php      # RequestDetailPage
├── precio.php         # PricePage
├── generar-informe.php# GenerateReportPage
└── .htaccess
```

## Page Mapping

| Route (page param) | PHP file | Instructions file | Description |
|---|---|---|---|
| `login` | `login.php` | `AGENTS-DOC/AGENTS-PAGE-LoginPage.md` | Admin login form |
| `dashboard` | `dashboard.php` | `AGENTS-DOC/AGENTS-PAGE-DashboardPage.md` | Stats + monthly chart via Chart.js |
| `solicitudes` | `solicitudes.php` | `AGENTS-DOC/AGENTS-PAGE-RequestsPage.md` | List with filters (search, estado, pago_estado, dates) |
| `solicitud&id=X` | `solicitud.php` | `AGENTS-DOC/AGENTS-PAGE-RequestDetailPage.md` | Detail + colored estado buttons |
| `precio` | `precio.php` | `AGENTS-DOC/AGENTS-PAGE-PricePage.md` | Edit report price |
| `generar-informe` | `generar-informe.php` | `AGENTS-DOC/AGENTS-PAGE-GenerateReportPage.md` | JSON import + report preview + PDF download |

## Router (`index.php`)

Single entry point using `$_GET['page']` for routing:

```php
$page = $_GET['page'] ?? 'dashboard';
// If no session and not login -> redirect to ?page=login
// Dispatch based on $page
```

## Auth

PHP session-based. The router checks `$_SESSION['admin_user']` on every page except `login`. Login POSTs to `./api/index.php?action=login`. Logout calls `./api/index.php?action=logout`.

## API Calls

All API calls go through `include/api-helpers.php` which uses cURL to `./api/index.php?action=...`. The API in `admin-html/api/` is self-contained (copied from `admin/api/`).

## Design

- White sidebar (`#ffffff`), nav links `#555`, active/hover in red (`#c62828`)
- Red tones (`#b71c1c`, `#c62828`) — no blue
- Sidebar hidden on mobile, toggled via hamburger button + overlay
- Logo: `assets/images/logo-full.png`, max-height 90px
- Stats cards with colored icon circles
- Login page: centered card with gradient background

## JSX → PHP/HTML translation

| JSX | PHP/HTML |
|---|---|
| `{plan.title}` | Hardcode value or `<?= $var ?>` |
| `{items.map(...)}` | `<?php foreach: ?>` loop |
| `<Link to="/x">` | `<a href="?page=x">` |
| `className="..."` | `class="..."` |
| `style={{ color: '#b71c1c' }}` | `style="color: #b71c1c"` |
| `{\`bi \${icon}\`}` | Hardcode `<i class="bi bi-...">` |
| `useState` | PHP variables + form submission |
| `useEffect` + `fetch()` | PHP `apiCall()` on page load, or JS `fetch()` |
| `useNavigate()` | `header('Location: ...')` or `<a>` |
| `<Routes>`/`<Route>` | `$_GET['page']` switch |
| `useSearchParams` | `$_GET` superglobal |
| `useAuth()` | `$_SESSION['admin_user']` |
| `<ProtectedRoute>` | PHP session check in router |
| Conditionals | `<?php if: ?>` or direct HTML |

## Interactive Behavior (`js/scripts.js`)

### 1. Sidebar toggle (mobile)
- Open: add `.show` class on `#sidebar` + show `#sidebarOverlay` when hamburger clicked
- Close: hide both when overlay or close button clicked

### 2. Filters toggle (solicitudes.php)
- Toggle `.d-none` on filter card when "Filtros" button clicked

### 3. Dashboard chart
- Initialize Chart.js bar chart from data passed via PHP

### 4. Status change confirmation
- Confirm before changing estado via AJAX PUT

### 5. Price save
- Form submit with PUT via fetch, show success/error alert

### 6. Report PDF generation
- html2canvas + jsPDF (same logic as React component)

### 7. Scoring chart
- SVG gauge rendered in JS with needle rotation

## Omit (React-specific)
- `import`, `export default`, `useState`, `useEffect`, `useRef`, `useNavigate`
- JSX `{}`, `onChange`, `onSubmit`, `onClick` (use `onclick="..."` or `addEventListener`)
- `useSearchParams`, `useLocation`, `useParams`
- React Router components

## Per-Page Checklist

### login.php
- [ ] Centered card with "InfoSocio Admin" heading
- [ ] Error alert (hidden by default, shown on failed login)
- [ ] Usuario + Contraseña fields
- [ ] "Ingresar" submit button
- [ ] POST to api/index.php?action=login
- [ ] On success: redirect to ?page=dashboard

### dashboard.php
- [ ] 4 stat cards (Totales, Pendientes, Finalizadas, Ingresos) with colored icons and links
- [ ] Bar chart (Chart.js) with last 10 days data
- [ ] Empty state: "No hay datos de solicitudes por día"
- [ ] Uses api-helpers to call action=dashboard

### solicitudes.php
- [ ] Table with columns: ID, Nombre, DNI, Email, Estado, Pago, Fecha
- [ ] Estado/Pago rendered as colored badges
- [ ] "Ver" action button linking to ?page=solicitud&id=X
- [ ] Toggle filter card with: search text, estado select, pago select, date range
- [ ] Apply/Clear filter buttons
- [ ] Active filters indicator with details
- [ ] Loading: "Cargando..." text
- [ ] Empty: "No hay datos disponibles"
- [ ] Reads filters from $_GET params

### solicitud.php
- [ ] "Solicitud #ID" heading with "Volver" link
- [ ] Two-column layout: solicitud data table + payment data + change status buttons
- [ ] Data: nombre, DNI, CUIL, email, teléfono, estado (badge), fecha
- [ ] Payment: pago_estado (badge), precio, pago_id
- [ ] 3 status buttons: Pendiente (warning), Rechazado (danger), Finalizado (success)
- [ ] Active state = filled, others = outline
- [ ] PUT via fetch to action=actualizar-solicitud
- [ ] Loading/error states

### precio.php
- [ ] Single form with number input for monto
- [ ] Current price loaded from API on page load
- [ ] Save button with loading state
- [ ] Success/error alert message
- [ ] PUT via fetch to action=actualizar-precio

### generar-informe.php
- [ ] 3 input methods: file upload (.json), URL input, textarea paste
- [ ] "Importar" button
- [ ] Error alert for invalid JSON
- [ ] Report preview rendered in a fullscreen modal overlay
- [ ] "Cerrar" and "Descargar PDF" buttons in modal header
- [ ] PDF download via html2canvas + jsPDF
- [ ] ReportContent component rendering all data sections

## CSS — admin.css

Extract styles from admin SCSS. Key palette:
- Red: `#b71c1c`, `#c62828`, `#dc3545`
- Dark: `#333`, `#555`, `#6c757d`
- Background: `#f5f6fa`
- White sidebar: `#ffffff`

Key classes to style:
- `.admin-layout`, `.sidebar`, `.sidebar-overlay`, `.sidebar-header`, `.nav-link`
- `.main-content`, `.admin-header`, `.stat-card`, `.stat-icon`, `.stat-value`, `.stat-label`
- `.login-page`, `.login-card`, `.badge-estado`, `.table-actions`, `.table-sm`

## Implementation Order
1. `assets/css/admin.css`
2. `include/header.php`
3. `include/sidebar.php`
4. `include/footer.php`
5. `include/status-badge.php`
6. `include/data-table.php`
7. `include/scoring-chart.php`
8. `include/api-helpers.php`
9. `login.php`
10. `index.php` (router)
11. `dashboard.php`
12. `solicitudes.php`
13. `solicitud.php`
14. `precio.php`
15. `generar-informe.php`
16. `include/report-content.php`
17. `js/scripts.js`
18. `.htaccess`

## Verification
- Login/logout flow works
- Dashboard loads stats and chart from API
- Solicitudes list loads with filters applied via URL params
- Solicitud detail loads and status changes via AJAX
- Price loads and saves
- Generate report: JSON import, preview modal, PDF download
- Sidebar responsive: hidden on mobile, toggle via hamburger
- Active nav link highlighted correctly
- No React/JSX/framework code remains
