<?php
function renderTable($columns, $data, $actionFn = null) {
  ?>
  <div class="table-responsive">
    <table class="table table-hover align-middle">
      <thead class="table-light">
        <tr>
          <?php foreach ($columns as $col): ?>
            <th class="fw-semibold"><?= htmlspecialchars($col['label']) ?></th>
          <?php endforeach; ?>
          <?php if ($actionFn): ?>
            <th class="fw-semibold">Acciones</th>
          <?php endif; ?>
        </tr>
      </thead>
      <tbody>
        <?php if (empty($data)): ?>
          <tr>
            <td colspan="<?= count($columns) + ($actionFn ? 1 : 0) ?>" class="text-center text-muted py-4">
              No hay datos disponibles
            </td>
          </tr>
        <?php else: ?>
          <?php foreach ($data as $row): ?>
            <tr>
              <?php foreach ($columns as $col): ?>
                <td>
                  <?php
                  if (isset($col['render'])) {
                    $render = $col['render'];
                    echo $render($row[$col['key']] ?? '', $row);
                  } else {
                    echo htmlspecialchars($row[$col['key']] ?? '');
                  }
                  ?>
                </td>
              <?php endforeach; ?>
              <?php if ($actionFn): ?>
                <td class="table-actions"><?= $actionFn($row) ?></td>
              <?php endif; ?>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
  <?php
}
