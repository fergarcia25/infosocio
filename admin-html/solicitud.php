<?php
require_once 'include/api-helpers.php';
require_once 'include/status-badge.php';

$id = $_GET['id'] ?? null;
$result = apiCallGet('solicitud', ['id' => $id]);
$request = $result['success'] ? $result['data'] : null;

require 'include/header.php';
?>

<div class="d-flex justify-content-between align-items-center mb-4">
  <h4 class="fw-bold mb-0">Solicitud #<?= htmlspecialchars($id) ?></h4>
  <a href="index.php?page=solicitudes" class="btn btn-outline-secondary btn-sm">Volver</a>
</div>

<?php if (!$request): ?>
  <div class="alert alert-danger">Solicitud no encontrada</div>
<?php else: ?>
<div class="row g-4">
  <div class="col-md-6">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="fw-bold mb-3">Datos de la Solicitud</h5>
        <table class="table table-borderless">
          <tbody>
            <tr><td class="fw-semibold">Nombre</td><td><?= htmlspecialchars($request['nombre']) ?></td></tr>
            <tr><td class="fw-semibold">DNI</td><td><?= htmlspecialchars($request['dni']) ?></td></tr>
            <tr><td class="fw-semibold">CUIL</td><td><?= htmlspecialchars($request['cuil']) ?></td></tr>
            <tr><td class="fw-semibold">Email Destino</td><td><?= htmlspecialchars($request['email_destino']) ?></td></tr>
            <tr><td class="fw-semibold">Teléfono</td><td><?= htmlspecialchars($request['telefono'] ?? '-') ?></td></tr>
            <tr><td class="fw-semibold">Estado</td><td><?php statusBadge($request['estado']) ?></td></tr>
            <tr><td class="fw-semibold">Fecha</td><td><?= htmlspecialchars($request['created_at']) ?></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="fw-bold mb-3">Pago</h5>
        <table class="table table-borderless">
          <tbody>
            <tr><td class="fw-semibold">Estado del Pago</td><td><?php statusBadge($request['pago_estado']) ?></td></tr>
            <tr><td class="fw-semibold">Precio</td><td>$<?= htmlspecialchars($request['precio']) ?></td></tr>
            <tr><td class="fw-semibold">ID de Pago</td><td><?= htmlspecialchars($request['pago_id'] ?? '-') ?></td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card shadow-sm mt-3">
      <div class="card-body">
        <h5 class="fw-bold mb-3">Cambiar Estado</h5>
        <div class="d-flex gap-2">
          <?php
          $statuses = [
            ['value' => 'pendiente', 'label' => 'Pendiente', 'color' => 'warning'],
            ['value' => 'rechazado', 'label' => 'Rechazado', 'color' => 'danger'],
            ['value' => 'finalizado', 'label' => 'Finalizado', 'color' => 'success'],
          ];
          foreach ($statuses as $st):
            $isActive = $request['estado'] === $st['value'];
            $btnClass = $isActive ? 'btn-' . $st['color'] : 'btn-outline-' . $st['color'];
          ?>
            <button class="btn btn-sm <?= $btnClass ?> status-btn"
                    data-value="<?= $st['value'] ?>"
                    data-id="<?= $id ?>"
                    <?= $isActive ? 'disabled' : '' ?>>
              <?= $st['label'] ?>
            </button>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  document.querySelectorAll('.status-btn').forEach(function(btn) {
    btn.addEventListener('click', async function() {
      const id = this.dataset.id;
      const value = this.dataset.value;
      if (!confirm('¿Cambiar estado a "' + value + '"?')) return;

      const originalText = this.textContent;
      this.disabled = true;
      this.textContent = '...';

      try {
        const res = await fetch('./api/index.php?action=actualizar-solicitud', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: parseInt(id), estado: value })
        });
        const data = await res.json();
        if (data.success) {
          // Re-enable all buttons, disable active one
          document.querySelectorAll('.status-btn').forEach(function(b) {
            b.disabled = false;
            const colors = { pendiente: 'warning', rechazado: 'danger', finalizado: 'success' };
            b.className = 'btn btn-sm btn-outline-' + (colors[b.dataset.value] || 'secondary');
          });
          document.querySelectorAll('.status-btn').forEach(function(b) {
            if (b.dataset.value === value) {
              const colors = { pendiente: 'warning', rechazado: 'danger', finalizado: 'success' };
              b.className = 'btn btn-sm btn-' + (colors[value] || 'secondary');
              b.disabled = true;
            }
          });
          // Reload page to refresh badges
          location.reload();
        } else {
          alert('Error: ' + (data.message || 'No se pudo actualizar'));
          this.disabled = false;
          this.textContent = originalText;
        }
      } catch(err) {
        alert('Error de conexión');
        this.disabled = false;
        this.textContent = originalText;
      }
    });
  });
</script>
<?php endif; ?>

<?php require 'include/footer.php'; ?>
