# generar-informe.php

Requires: header.php, sidebar.php, footer.php, report-content.php, scoring-chart.php, api-helpers.php

Flow:
1. Render heading "Generar Informe"
2. Card with 3 JSON input methods:
   - File upload (accept .json)
   - URL input (text, placeholder "https://")
   - Textarea paste (5 rows)
3. "Importar" button
4. Error alert (hidden, shown on invalid JSON)
5. After successful import:
   - Show modal overlay with report preview
   - Modal header: "Cerrar" button + "Descargar PDF" button
   - Modal body: call `renderReport($data)`
6. PDF download via html2canvas + jsPDF (same logic as React)
