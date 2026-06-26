# AGENTS-INCLUDE-FilterSidebar

## Output file
`include/filter-sidebar.php`

## PHP variables expected
- `$q` (string) — current search query
- `$counts` (array) — with keys `men`, `women`, `firstAge`, `secondAge`, `thirdAge`
- `$filters` (array) — with keys `sexo`, `edad`, `provincia`, `ciudad`

## Description
Dynamic filter sidebar with 4 selects (Sexo, Edad, Provincia, Ciudad). Disabled options when count = 0. Auto-submits on change via `onchange="this.form.submit()"`.

## Code

```php
<form method="GET" action="resultados">
  <input type="hidden" name="q" value="<?php echo htmlspecialchars($q ?? ''); ?>">
  <div class="row g-2 align-items-end">
    <div class="col-12 col-sm-6 col-md">
      <label class="form-label small fw-semibold mb-1">Sexo</label>
      <select name="sexo" class="form-select form-select-sm" onchange="this.form.submit()">
        <option value="">Todos</option>
        <option value="M"<?php echo ($filters['sexo'] ?? '') === 'M' ? ' selected' : ''; ?><?php echo ($counts['men'] ?? 0) === 0 ? ' disabled' : ''; ?>>Hombre<?php echo ($counts['men'] ?? 0) > 0 ? ' (' . $counts['men'] . ')' : ''; ?></option>
        <option value="F"<?php echo ($filters['sexo'] ?? '') === 'F' ? ' selected' : ''; ?><?php echo ($counts['women'] ?? 0) === 0 ? ' disabled' : ''; ?>>Mujer<?php echo ($counts['women'] ?? 0) > 0 ? ' (' . $counts['women'] . ')' : ''; ?></option>
      </select>
    </div>
    <div class="col-12 col-sm-6 col-md">
      <label class="form-label small fw-semibold mb-1">Edad</label>
      <select name="edad" class="form-select form-select-sm" onchange="this.form.submit()">
        <option value="">Todas</option>
        <option value="1"<?php echo ($filters['edad'] ?? '') === '1' ? ' selected' : ''; ?><?php echo ($counts['firstAge'] ?? 0) === 0 ? ' disabled' : ''; ?>>18-30<?php echo ($counts['firstAge'] ?? 0) > 0 ? ' (' . $counts['firstAge'] . ')' : ''; ?></option>
        <option value="2"<?php echo ($filters['edad'] ?? '') === '2' ? ' selected' : ''; ?><?php echo ($counts['secondAge'] ?? 0) === 0 ? ' disabled' : ''; ?>>30-50<?php echo ($counts['secondAge'] ?? 0) > 0 ? ' (' . $counts['secondAge'] . ')' : ''; ?></option>
        <option value="3"<?php echo ($filters['edad'] ?? '') === '3' ? ' selected' : ''; ?><?php echo ($counts['thirdAge'] ?? 0) === 0 ? ' disabled' : ''; ?>>50-100<?php echo ($counts['thirdAge'] ?? 0) > 0 ? ' (' . $counts['thirdAge'] . ')' : ''; ?></option>
      </select>
    </div>
    <div class="col-12 col-sm-6 col-md">
      <label class="form-label small fw-semibold mb-1">Provincia</label>
      <select name="provincia" class="form-select form-select-sm" onchange="this.form.submit()">
        <option value="">Todas</option>
        <option value="bsas"<?php echo ($filters['provincia'] ?? '') === 'bsas' ? ' selected' : ''; ?>>Buenos Aires</option>
        <option value="caba"<?php echo ($filters['provincia'] ?? '') === 'caba' ? ' selected' : ''; ?>>CABA</option>
        <option value="cordoba"<?php echo ($filters['provincia'] ?? '') === 'cordoba' ? ' selected' : ''; ?>>Córdoba</option>
        <option value="santa-fe"<?php echo ($filters['provincia'] ?? '') === 'santa-fe' ? ' selected' : ''; ?>>Santa Fe</option>
      </select>
    </div>
    <div class="col-12 col-sm-6 col-md">
      <label class="form-label small fw-semibold mb-1">Ciudad</label>
      <select name="ciudad" class="form-select form-select-sm" onchange="this.form.submit()">
        <option value="">Todas</option>
        <option value="la-plata"<?php echo ($filters['ciudad'] ?? '') === 'la-plata' ? ' selected' : ''; ?>>La Plata</option>
        <option value="mar-del-plata"<?php echo ($filters['ciudad'] ?? '') === 'mar-del-plata' ? ' selected' : ''; ?>>Mar del Plata</option>
        <option value="rosario"<?php echo ($filters['ciudad'] ?? '') === 'rosario' ? ' selected' : ''; ?>>Rosario</option>
      </select>
    </div>
  </div>
</form>
```
