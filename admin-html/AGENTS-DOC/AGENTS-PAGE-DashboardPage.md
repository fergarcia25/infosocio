# dashboard.php

Requires: header.php, sidebar.php, footer.php, api-helpers.php

Flow:
1. Call `apiCallGet('dashboard')`
2. If error, show error message
3. Render 4 stat cards in a row (col-md-3 each)
4. Render Chart.js bar chart in a card below

Stat cards (each is a link):
- Solicitudes Totales: stats.totales, icon bi-inbox, color #b71c1c, link to ?page=solicitudes
- Pendientes: stats.pendientes, icon bi-clock, color #ffc107, link to ?page=solicitudes&estado=pendiente
- Finalizadas: stats.finalizadas, icon bi-check-circle, color #198754, link to ?page=solicitudes&estado=finalizado
- Ingresos: formatted as $X.XXX,XX, icon bi-currency-dollar, color #0dcaf0, link to ?page=solicitudes&pago_estado=aprobado

Chart: `<canvas id="dashboardChart">` initialized by Chart.js.
- Data from stats.diario array
- X axis: formatted dates (dd Mon)
- Y axis: solicitudes count
- Bar color: #b71c1c
- Empty state: "No hay datos de solicitudes por día"
