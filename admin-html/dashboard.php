<?php
require_once 'include/api-helpers.php';
$result = apiCallGet('dashboard');
$stats = $result['success'] ? $result['data'] : null;
require 'include/header.php';
?>

<h4 class="fw-bold mb-4">Dashboard</h4>

<?php if (!$stats): ?>
  <div class="alert alert-danger">Error al cargar estadísticas</div>
<?php else:
  $statCards = [
    ['label' => 'Solicitudes Totales', 'value' => $stats['totales'], 'color' => '#b71c1c', 'icon' => 'bi-inbox', 'link' => 'index.php?page=solicitudes'],
    ['label' => 'Pendientes', 'value' => $stats['pendientes'], 'color' => '#ffc107', 'icon' => 'bi-clock', 'link' => 'index.php?page=solicitudes&estado=pendiente'],
    ['label' => 'Finalizadas', 'value' => $stats['finalizadas'], 'color' => '#198754', 'icon' => 'bi-check-circle', 'link' => 'index.php?page=solicitudes&estado=finalizado'],
    ['label' => 'Ingresos', 'value' => '$' . number_format((float)$stats['ingresos'], 2, ',', '.'), 'color' => '#0dcaf0', 'icon' => 'bi-currency-dollar', 'link' => 'index.php?page=solicitudes&pago_estado=aprobado'],
  ];
  $chartData = [];
  if (!empty($stats['diario'])) {
    $monthNames = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    foreach ($stats['diario'] as $item) {
      $ts = strtotime($item['dia']);
      $chartData[] = [
        'dia' => date('j', $ts) . ' ' . $monthNames[(int)date('n', $ts) - 1],
        'solicitudes' => (int)$item['total'],
      ];
    }
  }
?>
<div class="row g-3 mb-4">
  <?php foreach ($statCards as $s): ?>
    <div class="col-md-3">
      <a href="<?= $s['link'] ?>" class="text-decoration-none">
        <div class="card stat-card">
          <div class="card-body d-flex align-items-center gap-3">
            <div class="stat-icon" style="background-color:<?= $s['color'] ?>20;color:<?= $s['color'] ?>">
              <i class="bi <?= $s['icon'] ?>"></i>
            </div>
            <div>
              <div class="stat-value"><?= $s['value'] ?></div>
              <div class="stat-label"><?= $s['label'] ?></div>
            </div>
          </div>
        </div>
      </a>
    </div>
  <?php endforeach; ?>
</div>

<div class="card shadow-sm">
  <div class="card-body">
    <h5 class="fw-bold mb-3">Solicitudes por Día</h5>
    <?php if (!empty($chartData)): ?>
      <div class="chart-container">
        <canvas id="dashboardChart"></canvas>
      </div>
      <script>
        new Chart(document.getElementById('dashboardChart'), {
          type: 'bar',
          data: {
            labels: <?= json_encode(array_column($chartData, 'dia')) ?>,
            datasets: [{
              label: 'Solicitudes',
              data: <?= json_encode(array_column($chartData, 'solicitudes')) ?>,
              backgroundColor: '#b71c1c',
              borderRadius: 4,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1 }
              }
            }
          }
        });
      </script>
    <?php else: ?>
      <p class="text-muted text-center py-4">No hay datos de solicitudes por día</p>
    <?php endif; ?>
  </div>
</div>
<?php endif; ?>

<?php require 'include/footer.php'; ?>
