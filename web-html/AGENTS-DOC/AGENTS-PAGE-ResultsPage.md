# AGENTS-PAGE-ResultsPage

## Output file
`resultados.php`

## Includes needed
- `include/header.php` (top)
- `include/footer.php` (bottom)
- `include/search-api.php` (API call)
- `include/filter-sidebar.php` (inside the filter section)
- `include/result-card.php` (for each result card)
- `include/pagination.php` (at bottom of results)

## PHP logic (top of file, before includes)

```php
<?php
require_once 'include/search-api.php';

$q = trim($_GET['q'] ?? '');
$sexoFilter = trim($_GET['sexo'] ?? '');
$edadFilter = trim($_GET['edad'] ?? '');
$currentPage = max(1, (int)($_GET['page'] ?? 1));
$itemsPerPage = 10;

$results = [];
$counts = ['men' => 0, 'women' => 0, 'firstAge' => 0, 'secondAge' => 0, 'thirdAge' => 0];
$filters = ['sexo' => $sexoFilter, 'edad' => $edadFilter];
$loading = false;
$error = null;

if ($q !== '') {
    $loading = true;
    try {
        $data = searchPeople($q);
        $allResults = $data['results'] ?? [];
        $counts = $data['counts'] ?? $counts;
    } catch (Exception $e) {
        $error = $e->getMessage();
        $allResults = [];
    }
    $loading = false;

    // Client-side filtering (sexo, edad)
    if ($sexoFilter !== '') {
        $allResults = array_values(array_filter($allResults, function($r) use ($sexoFilter) {
            return ($r['sexo'] ?? '') === $sexoFilter;
        }));
    }
    if ($edadFilter !== '') {
        $allResults = array_values(array_filter($allResults, function($r) use ($edadFilter) {
            $edad = (int)($r['edad'] ?? 0);
            if ($edadFilter === '1') return $edad >= 18 && $edad <= 30;
            if ($edadFilter === '2') return $edad > 30 && $edad <= 50;
            if ($edadFilter === '3') return $edad > 50 && $edad <= 100;
            return true;
        }));
    }

    $results = $allResults;
}

$totalResults = count($results);
$totalPages = max(1, (int)ceil($totalResults / $itemsPerPage));
$currentPage = min($currentPage, $totalPages);
$offset = ($currentPage - 1) * $itemsPerPage;
$paginatedResults = array_slice($results, $offset, $itemsPerPage);
?>
```

## States

### No query (`$q === ''` and not loading)
- Hero title: `Ingrese un término de búsqueda` (no `"..."`)
- No results count paragraph
- Cards section shows: `Realice una búsqueda para ver resultados`

### Loading (`$loading === true`)
Shows spinner + "Buscando resultados..." text.

### Error (`$error !== null` and not loading)
Shows error in `.alert.alert-danger.text-center`

### Results (no error, not loading, query present, results > 0)
Shows all filter + cards + pagination.

### No results (no error, not loading, query present, results === 0)
Shows search icon + message + "Realizar nueva busqueda" link to home.

## Page content

```php
<?php include 'include/header.php'; ?>

<!-- Results header -->
<section class="about-transform-section" style="padding-top: calc(3rem + 80px); padding-bottom: 3rem;">
  <div class="container position-relative">
    <div class="row justify-content-center">
      <div class="col-lg-10 text-center">
        <span class="about-label" style="color: #b71c1c;">RESULTADOS DE BÚSQUEDA</span>
        <h2 class="about-title" style="color: #fff;">
          <?php if ($q): ?>
            Resultados para: <strong>"<?php echo htmlspecialchars($q); ?>"</strong>
          <?php else: ?>
            Ingrese un término de búsqueda
          <?php endif; ?>
        </h2>
        <?php if ($q && !$error && !$loading): ?>
          <p style="color: rgba(255,255,255,0.7); font-size: 1.1rem; max-width: 700px; margin: 0 auto;">
            Se encontraron <?php echo $totalResults; ?> resultado<?php echo $totalResults !== 1 ? 's' : ''; ?>
          </p>
        <?php endif; ?>
      </div>
    </div>

    <!-- Filter toggle (mobile) -->
    <div class="d-md-none mt-4">
      <button class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 filter-toggle-btn">
        <i class="bi bi-funnel"></i>
        Filtros
      </button>
    </div>

    <!-- Filters -->
    <div class="row justify-content-center mt-4 d-none d-md-flex filter-content">
      <div class="col-lg-10">
        <div class="p-3 results-filter-wrap" style="background: rgba(255,255,255,0.05); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
          <?php include 'include/filter-sidebar.php'; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Results cards -->
<section class="about-features-section" style="background: #e0e0e0; padding: 4rem 0;">
  <div class="container">
    <?php if ($loading): ?>
      <div class="text-center py-5">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Buscando...</span>
        </div>
        <p class="text-muted mt-2">Buscando resultados...</p>
      </div>
    <?php endif; ?>

    <?php if ($error && !$loading): ?>
      <div class="alert alert-danger text-center"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <?php if (!$loading && !$error && $q): ?>
      <?php if (count($paginatedResults) > 0): ?>
        <div class="row g-4">
          <?php foreach ($paginatedResults as $r): ?>
            <div class="col-md-6">
              <?php $result = $r; include 'include/result-card.php'; ?>
            </div>
          <?php endforeach; ?>
        </div>
        <?php $currentPage = $currentPage; $totalPages = $totalPages; include 'include/pagination.php'; ?>
      <?php else: ?>
        <div class="text-center py-5">
          <i class="bi bi-search" style="font-size: 3rem; display: block; margin-bottom: 1rem; color: #999;"></i>
          <p class="text-muted">
            No se encontraron resultados para tu busqueda, segurate de haber ingresado los datos correctamente.
          </p>
          <a href="." class="about-btn-primary">Realizar nueva busqueda</a>
        </div>
      <?php endif; ?>
    <?php endif; ?>

    <?php if (!$q && !$loading): ?>
      <div class="text-center py-5 text-muted">
        <p>Realice una búsqueda para ver resultados</p>
      </div>
    <?php endif; ?>
  </div>
</section>

<?php include 'include/footer.php'; ?>
```
