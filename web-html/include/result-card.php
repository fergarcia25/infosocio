<?php
  $nombreCompleto = ($result['apellidos'] ?? '') . ', ' . ($result['nombres'] ?? '');
  $nameParts = explode(',', $nombreCompleto);
  $firstName = trim($nameParts[0] ?? $nombreCompleto);
  $lastName = trim($nameParts[1] ?? '');
  $sexoLabel = ($result['sexo'] ?? '') === 'M' ? 'Masculino' : (($result['sexo'] ?? '') === 'F' ? 'Femenino' : '-');
?>
<div class="card h-100" style="border: 1px solid #e7e7e7; border-radius: 10px; box-shadow: 0 1px 12px rgba(0,0,0,0.1);">
  <div class="card-body d-flex flex-column">
    <div class="d-flex align-items-center gap-2 mb-3">
      <i class="bi bi-person" style="color: #000; font-size: 1.1rem;"></i>
      <h3 class="mb-0" style="font-size: 1.2rem; word-break: break-word; color: #b71c1c;">
        <?php echo $firstName; ?>
        <?php if ($lastName): ?><span class="small ps-2" style="color: #000;"><?php echo $lastName; ?></span><?php endif; ?>
      </h3>
    </div>

    <div style="border-radius: 8px; padding: 0;">
      <div class="row g-2">
        <div class="col-6">
          <div style="background-color: rgb(249 249 249); border-radius: 6px; padding: 6px 12px;">
            <div class="text-muted" style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px;">DNI</div>
            <div class="fw-bold"><?php echo $result['nrodni'] ?? '-'; ?></div>
          </div>
        </div>
        <div class="col-6">
          <div style="background-color: rgb(249 249 249); border-radius: 6px; padding: 6px 12px;">
            <div class="text-muted" style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px;">CUIT</div>
            <div class="fw-bold"><?php echo $result['cuit'] ?? '-'; ?></div>
          </div>
        </div>
        <div class="col-6">
          <div style="background-color: rgb(249 249 249); border-radius: 6px; padding: 6px 12px;">
            <div class="text-muted" style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px;">Edad</div>
            <div class="fw-bold"><?php echo isset($result['edad']) ? $result['edad'] . ' años' : '-'; ?></div>
          </div>
        </div>
        <div class="col-6">
          <div style="background-color: rgb(249 249 249); border-radius: 6px; padding: 6px 12px;">
            <div class="text-muted" style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px;">Sexo</div>
            <div class="fw-bold"><?php echo $sexoLabel; ?></div>
          </div>
        </div>
        <div class="col-6">
          <div style="background-color: rgb(249 249 249); border-radius: 6px; padding: 6px 12px;">
            <div class="text-muted" style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px;">Provincia</div>
            <div class="fw-bold"><?php echo $result['provincia'] ?? '-'; ?></div>
          </div>
        </div>
        <div class="col-6">
          <div style="background-color: rgb(249 249 249); border-radius: 6px; padding: 6px 12px;">
            <div class="text-muted" style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px;">Ciudad</div>
            <div class="fw-bold"><?php echo $result['ciudad'] ?? '-'; ?></div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-end mt-3">
      <a href="solicitar?userId=<?php echo urlencode($result['id'] ?? ''); ?>" class="about-btn-primary">
        <i class="bi bi-file-earmark-text me-1"></i>
        Solicitar Informe
      </a>
    </div>
  </div>
</div>
