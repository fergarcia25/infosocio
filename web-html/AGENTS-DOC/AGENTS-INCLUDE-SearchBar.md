# AGENTS-INCLUDE-SearchBar

## Output file
`include/search-bar.php`

## JavaScript needed (in `js/scripts.js`)
- Form submit handler: capture the input value and redirect to `/resultados?q=VALUE`

## Notes
- Accepts a `$large` boolean variable. If `$large` is true, add class `mx-auto` and use the longer placeholder.
- Usage in pages: `<?php $large = true; include 'include/search-bar.php'; ?>` or just `<?php include 'include/search-bar.php'; ?>` for default.

## Page content

<form class="search-container<?php echo isset($large) && $large ? ' mx-auto' : ''; ?>">
  <div class="home-search-wrapper">
    <input
      type="text"
      id="criterio"
      name="criterio"
      class="form-control inp_box home-search-input"
      placeholder="<?php echo isset($large) && $large ? 'Buscar por NOMBRE, DNI ó CUIT' : 'Nombre, DNI o CUIL...'; ?>"
    />
    <button class="btn btn-primary fw-bold px-4 home-search-btn" type="submit">
      <i class="bi bi-search"></i>
    </button>
  </div>
</form>
