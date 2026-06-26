# include/scoring-chart.php

Render an SVG gauge chart with 5 colored segments and a needle.

Segments (start deg, end deg, color, label, range):
1. 36-108, #7B1FA2, "Bajo", "0 - 299"
2. 108-180, #C62828, "Regular", "300 - 499"
3. 180-252, #EF6C00, "Bueno", "500 - 649"
4. 252-324, #7CB342, "Muy bueno", "650 - 749"
5. 324-36, #2E7D32, "Excelente", "750 - 999"

Needle rotates to the score value (0-999).
Center shows score value and label text.

The SVG viewBox is "0 0 400 400", responsive width 100%.

The arcs are rendered as `<path>` elements using SVG arc commands.

A `<div>` wrapper with class `scoring-svg` and `id="scoringContainer"` where JS will render the chart.
