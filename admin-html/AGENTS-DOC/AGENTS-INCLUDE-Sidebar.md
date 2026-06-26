# include/sidebar.php

Render:
1. `.sidebar-overlay#sidebarOverlay` (click to close)
2. `<aside class="sidebar" id="sidebar">`
   - `.sidebar-header` with logo `assets/images/logo-full.png`
   - `<nav>` with 4 links:
     - Dashboard (`?page=dashboard`) — icon `bi-speedometer2`
     - Solicitudes (`?page=solicitudes`) — icon `bi-inbox`
     - Precio Informe (`?page=precio`) — icon `bi-tag`
     - Generar Informe (`?page=generar-informe`) — icon `bi-file-earmark-pdf`
   - Each link has `class="nav-link"` and adds `active` if current page matches
