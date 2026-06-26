# admin.css — Admin Styles

Convert the SCSS variables and styles from `admin/src/styles/` to plain CSS.

## Variables (hardcode)

| SCSS | CSS value |
|---|---|
| `$sidebar-bg` | `#b71c1c` |
| `$sidebar-width` | `250px` |
| `$primary` | `#c62828` |
| `$secondary` | `#6c757d` |
| `$success` | `#198754` |
| `$danger` | `#dc3545` |
| `$warning` | `#ffc107` |
| `$info` | `#0dcaf0` |
| `$font-family-base` | `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` |

## Structure to mirror

1. Global reset (`*`), body bg `#f5f6fa`
2. `.admin-layout` — flex container
3. `.sidebar-overlay` — mobile overlay (hidden by default, `.show` = block)
4. `.sidebar` — fixed white sidebar 250px
   - `.sidebar-header` — padding, border-bottom, centered logo
   - `.nav-link` — color `#555`, hover/active `#c62828` bg `rgba(198,40,40,0.08)`
5. `.main-content` — `margin-left: 250px`, `padding: 1.5rem`
6. `.admin-header` — white bg, shadow, flex space-between
7. Desktop (`>=992px`): sidebar always visible, no overlay, no toggler
8. Mobile (`<992px`): sidebar hidden by default (`translateX(-100%)`), `.show` = visible, overlay visible
9. `.stat-card` — border-radius 10px, shadow, hover effect
   - `.stat-icon` — 48x48, rounded 12px, centered
   - `.stat-value` — 1.25rem bold
   - `.stat-label` — color `#6c757d`
10. `.login-page` — flex center, gradient bg `#b71c1c` → `#e57373`
11. `.login-card` — max 400px, border-radius 12px, shadow
12. `.badge-estado` — small font, padding
13. `.table-actions` — white-space nowrap
14. `.table-sm th/td` — font sizes
15. Print styles — hide buttons, white backgrounds
16. `.report-container` — table styles matching ReportContent component
17. `.scoring-svg text` — font family
