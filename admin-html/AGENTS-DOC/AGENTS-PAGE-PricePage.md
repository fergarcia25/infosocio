# precio.php

Requires: header.php, sidebar.php, footer.php, api-helpers.php

Flow:
1. Call `apiCallGet('precio')`
2. Render heading "Precio del Informe"
3. Single card with form:
   - Alert message div (hidden by default, shown on save)
   - Label "Monto ($)"
   - Number input with step 0.01, min 0, current value pre-filled
   - "Guardar Precio" button
4. On form submit: call `apiCallPut('actualizar-precio', ['monto' => parseFloat])`
   - Show success/error in alert
