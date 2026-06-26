<?php
require_once 'include/api-helpers.php';
$result = apiCallGet('precio');
$precioActual = $result['success'] ? ($result['data']['monto'] ?? '') : '';
require 'include/header.php';
?>

<h4 class="fw-bold mb-4">Precio del Informe</h4>

<div class="row">
  <div class="col-md-6">
    <div class="card shadow-sm">
      <div class="card-body p-4">
        <form id="priceForm">
          <div id="priceMessage" class="alert py-2 d-none"></div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Monto ($)</label>
            <input type="number" class="form-control form-control-lg" id="precioInput"
                   step="0.01" min="0" value="<?= htmlspecialchars($precioActual) ?>" required>
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary btn-lg" id="saveBtn">Guardar Precio</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<script>
  document.getElementById('priceForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('saveBtn');
    const msg = document.getElementById('priceMessage');
    const monto = parseFloat(document.getElementById('precioInput').value);

    btn.disabled = true;
    btn.textContent = 'Guardando...';
    msg.classList.add('d-none');

    try {
      const res = await fetch('./api/index.php?action=actualizar-precio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monto: monto })
      });
      const data = await res.json();
      msg.textContent = data.success ? 'Precio actualizado correctamente' : 'Error al actualizar';
      msg.className = 'alert py-2 ' + (data.success ? 'alert-success' : 'alert-danger');
      msg.classList.remove('d-none');
    } catch(err) {
      msg.textContent = 'Error de conexión';
      msg.className = 'alert py-2 alert-danger';
      msg.classList.remove('d-none');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Guardar Precio';
    }
  });
</script>

<?php require 'include/footer.php'; ?>
