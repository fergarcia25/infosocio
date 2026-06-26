<?php
$currentPage = $_GET['page'] ?? 'dashboard';
$navItems = [
  'dashboard' => ['label' => 'Dashboard', 'icon' => 'bi-speedometer2'],
  'solicitudes' => ['label' => 'Solicitudes', 'icon' => 'bi-inbox'],
  'precio' => ['label' => 'Precio Informe', 'icon' => 'bi-tag'],
  'generar-informe' => ['label' => 'Generar Informe', 'icon' => 'bi-file-earmark-pdf'],
];
?>
<div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <img src="assets/images/logo-full.png" alt="InfoSocio" class="img-fluid" style="max-height:90px">
  </div>
  <nav class="mt-3">
    <?php foreach ($navItems as $page => $item): ?>
      <a href="index.php?page=<?= $page ?>"
         class="nav-link <?= $currentPage === $page ? 'active' : '' ?>"
         onclick="closeSidebar()">
        <i class="bi <?= $item['icon'] ?>"></i>
        <span><?= $item['label'] ?></span>
      </a>
    <?php endforeach; ?>
  </nav>
</aside>
