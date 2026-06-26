# solicitud.php

Requires: header.php, sidebar.php, footer.php, api-helpers.php, status-badge.php

Flow:
1. Read `$_GET['id']`
2. Call `apiCallGet('solicitud', ['id' => $id])`
3. If error, show "Solicitud no encontrada"
4. Render heading "Solicitud #ID" + "Volver" link
5. Two columns:
   - Left: card with solicitud data table
     - Nombre, DNI, CUIL, Email Destino, Teléfono, Estado (badge), Fecha
   - Right top: card with payment data
     - Estado del Pago (badge), Precio ($X), ID de Pago
   - Right bottom: card with 3 status buttons
     - Pendiente (btn-warning), Rechazado (btn-danger), Finalizado (btn-success)
     - Active state gets filled bg, others get outline
     - Click calls PUT via fetch to actualizar-solicitud
     - On success, update the estado badge and button states without page reload
