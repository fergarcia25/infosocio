# include/data-table.php

Function `renderTable($columns, $data, $actionFn = null)`:

- $columns: array of [key, label, render?]
- $data: array of rows
- $actionFn: optional callable that takes a row and returns action button HTML

Render:
```html
<div class="table-responsive">
  <table class="table table-hover align-middle">
    <thead class="table-light">
      <tr>
        {columns labels}
        {action header if actionFn}
      </tr>
    </thead>
    <tbody>
      {if empty: "No hay datos disponibles" row}
      {foreach rows: render cells, optionally using render callback}
    </tbody>
  </table>
</div>
```
