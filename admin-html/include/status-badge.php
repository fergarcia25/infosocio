<?php
function statusBadge($status) {
  $map = [
    'pendiente' => ['bg' => 'bg-warning text-dark', 'text' => 'Pendiente'],
    'rechazado' => ['bg' => 'bg-danger', 'text' => 'Rechazado'],
    'finalizado' => ['bg' => 'bg-success', 'text' => 'Finalizado'],
    'aprobado' => ['bg' => 'bg-success', 'text' => 'Aprobado'],
  ];
  $s = $map[$status] ?? ['bg' => 'bg-secondary', 'text' => $status];
  echo '<span class="badge badge-estado ' . $s['bg'] . '">' . htmlspecialchars($s['text']) . '</span>';
}
