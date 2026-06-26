# solicitudes.php

Requires: header.php, sidebar.php, footer.php, api-helpers.php, status-badge.php, data-table.php

Flow:
1. Read filter params from $_GET: search, estado, pago_estado, fecha_desde, fecha_hasta
2. Call `apiCallGet('solicitudes', $filters)`
3. If error, show error message
4. Render toggle button for filters with badge indicator if active
5. Filter card (hidden by default, toggled by button):
   - Search input (text, placeholder "Nombre, DNI, CUIL o Email...")
   - Estado select: Todos/Pendiente/Rechazado/Finalizado
   - Pago select: Todos/Pendiente/Aprobado/Rechazado
   - Fecha Desde input (date)
   - Fecha Hasta input (date)
   - Aplicar Filtros button (submit)
   - Limpiar Filtros button (clears all params)
6. Active filters summary text
7. DataTable with columns: ID, Nombre, DNI, Email Destino, Estado (badge), Pago (badge), Fecha
8. Action column: "Ver" link to solicitud.php?id=X
