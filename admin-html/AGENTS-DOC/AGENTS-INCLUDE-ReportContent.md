# include/report-content.php

Function `renderReport($data)`:

Takes a JSON-decoded data object and renders the full report HTML.

Sections to render (each conditionally, only if data exists):

1. **Header**: Logo + "INFORME" title + date
2. **Person name**: Apellido, Nombre + Fecha + INFORME N°
3. **Datos Personales**: 2-column grid with fields: nombre, apellido, cuil, dni, edad, sexo, nacimiento, defunción, nacionalidad, tipo. Each in a gray bg box. Right column: ScoringChart if score exists.
4. **Domicilio Particular**: Table with ubicación, CP, localidad, provincia
5. **Otros Domicilios**: Same table if domAlternativos has data
6. **Teléfonos principales**: Table with número, prestador, localidad
7. **Teléfonos celulares**: Same layout
8. **Emails**: Table with cuit, dni, email
9. **Vínculos/Familiares**: Table with nombre, cuil, nacimiento, relación, sexo, edad
10. **Historial Laboral**: Table with estado, cuit, razón social, nivel de ingreso
11. **Automotores actuales**: Table with año, dominio, tipo, marca, modelo, origen, %
12. **Historial Automotores**: Same table
13. **Situación Financiera (BCRA)**: Table with banco + monthly columns
14. **Monotributista/Autónomo**: Table with period, tipo, categoria, ganancias, iva, sociedades
15. **Actividades**: Table with código, descripción
16. **Obra Social**: Table with código, descripción
17. **Jubilación**: Table with titular, cuil, sueldo bruto/neto, periodo, rango
18. **Participación Societaria**: Table with archivo, cuit, fuente, boletín, fecha, nombre, razón social, cargo
19. **Boletín Oficial**: Table with fuente, fecha
20. **Cheques rechazados**: Table with nro, monto, causal, fecha rechazo, fecha levantamiento, multa
21. **Aportes Monotributista**: Monthly grid with colored squares
22. **Footer**: Legal disclaimer text

Use helper functions:
- `v($val)` — returns '-' if null/empty/object/boolean, string otherwise
- `formatDate($val)` — formats ISO date to DD-MM-YYYY or DD-MM-YYYY | HH:MM
