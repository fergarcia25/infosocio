<?php
require_once 'include/api-helpers.php';
require_once 'include/status-badge.php';
require_once 'include/data-table.php';

$search = $_GET['search'] ?? '';
$estado = $_GET['estado'] ?? '';
$pagoEstado = $_GET['pago_estado'] ?? '';
$fechaDesde = $_GET['fecha_desde'] ?? '';
$fechaHasta = $_GET['fecha_hasta'] ?? '';

$filters = array_filter([
  'search' => $search,
  'estado' => $estado,
  'pago_estado' => $pagoEstado,
  'fecha_desde' => $fechaDesde,
  'fecha_hasta' => $fechaHasta,
], function($v) { return $v !== ''; });

$result = apiCallGet('solicitudes', $filters);
$requests = $result['success'] ? $result['data'] : [];

$columns = [
  ['key' => 'id', 'label' => 'ID'],
  ['key' => 'nombre', 'label' => 'Nombre'],
  ['key' => 'dni', 'label' => 'DNI'],
  ['key' => 'email_destino', 'label' => 'Email Destino'],
  ['key' => 'estado', 'label' => 'Estado', 'render' => function($val) { ob_start(); statusBadge($val); return ob_get_clean(); }],
  ['key' => 'pago_estado', 'label' => 'Pago', 'render' => function($val) { ob_start(); statusBadge($val); return ob_get_clean(); }],
  ['key' => 'created_at', 'label' => 'Fecha'],
];

$hasActiveFilters = $search || $estado || $pagoEstado || $fechaDesde || $fechaHasta;

require 'include/header.php';
?>

<div class="d-flex justify-content-between align-items-center mb-4">
  <h4 class="fw-bold mb-0">Solicitudes Recibidas</h4>
  <button class="btn btn-outline-primary btn-sm" onclick="toggleFilters()">
    <i class="bi bi-funnel me-1"></i>
    Filtros <?= $hasActiveFilters ? '<span class="badge bg-danger ms-1">!</span>' : '' ?>
  </button>
</div>

<div class="card shadow-sm mb-4 d-none" id="filterCard">
  <div class="card-body">
    <form method="GET" action="index.php">
      <input type="hidden" name="page" value="solicitudes">
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label small fw-semibold">Buscar</label>
          <input type="text" class="form-control" name="search" placeholder="Nombre, DNI, CUIL o Email..." value="<?= htmlspecialchars($search) ?>">
        </div>
        <div class="col-md-2">
          <label class="form-label small fw-semibold">Estado</label>
          <select class="form-select" name="estado">
            <option value="">Todos</option>
            <option value="pendiente" <?= $estado === 'pendiente' ? 'selected' : '' ?>>Pendiente</option>
            <option value="rechazado" <?= $estado === 'rechazado' ? 'selected' : '' ?>>Rechazado</option>
            <option value="finalizado" <?= $estado === 'finalizado' ? 'selected' : '' ?>>Finalizado</option>
          </select>
        </div>
        <div class="col-md-2">
          <label class="form-label small fw-semibold">Estado Pago</label>
          <select class="form-select" name="pago_estado">
            <option value="">Todos</option>
            <option value="pendiente" <?= $pagoEstado === 'pendiente' ? 'selected' : '' ?>>Pendiente</option>
            <option value="aprobado" <?= $pagoEstado === 'aprobado' ? 'selected' : '' ?>>Aprobado</option>
            <option value="rechazado" <?= $pagoEstado === 'rechazado' ? 'selected' : '' ?>>Rechazado</option>
          </select>
        </div>
        <div class="col-md-2">
          <label class="form-label small fw-semibold">Fecha Desde</label>
          <input type="date" class="form-control" name="fecha_desde" value="<?= htmlspecialchars($fechaDesde) ?>">
        </div>
        <div class="col-md-2">
          <label class="form-label small fw-semibold">Fecha Hasta</label>
          <input type="date" class="form-control" name="fecha_hasta" value="<?= htmlspecialchars($fechaHasta) ?>">
        </div>
      </div>
      <div class="d-flex gap-2 mt-3">
        <button type="submit" class="btn btn-primary btn-sm">Aplicar Filtros</button>
        <?php if ($hasActiveFilters): ?>
          <a href="index.php?page=solicitudes" class="btn btn-outline-secondary btn-sm">Limpiar Filtros</a>
        <?php endif; ?>
      </div>
    </form>
  </div>
</div>

<div class="card shadow-sm">
  <div class="card-body">
    <?php if ($hasActiveFilters): ?>
      <p class="text-muted small mb-3">
        <i class="bi bi-funnel me-1"></i>
        Filtros activados
        <?php if ($search): ?> &mdash; Búsqueda: "<?= htmlspecialchars($search) ?>"<?php endif; ?>
        <?php if ($estado): ?> &mdash; Estado: <?= $estado ?><?php endif; ?>
        <?php if ($pagoEstado): ?> &mdash; Pago: <?= $pagoEstado ?><?php endif; ?>
        <?php if ($fechaDesde): ?> &mdash; Desde: <?= $fechaDesde ?><?php endif; ?>
        <?php if ($fechaHasta): ?> &mdash; Hasta: <?= $fechaHasta ?><?php endif; ?>
      </p>
    <?php endif; ?>
    <?php
    $actionFn = function($row) {
      return '<a href="index.php?page=solicitud&id=' . $row['id'] . '" class="btn btn-sm btn-outline-primary">Ver</a>';
    };
    renderTable($columns, $requests, $actionFn);
    ?>
  </div>
</div>

<?php require 'include/footer.php'; ?>
