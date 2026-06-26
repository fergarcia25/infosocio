<?php
$currentPage = $_GET['page'] ?? 'dashboard';
$user = $_SESSION['admin_user'] ?? null;
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>InfoSocio Admin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&family=Roboto:wght@100..900&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/admin.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
</head>
<body>
<div class="admin-layout">
<?php require 'sidebar.php'; ?>
<div class="main-content">
  <header class="admin-header">
    <div class="d-flex align-items-center gap-2">
      <span class="text-muted small fw-bold">
        <i class="bi bi-person fs-5"></i> <?= htmlspecialchars($user['username'] ?? 'Admin') ?>
      </span>
    </div>
    <div class="d-flex align-items-center gap-3">
      <a href="index.php?page=login&logout=1" class="btn btn-outline-danger btn-sm">
        <i class="bi bi-box-arrow-right me-1"></i>Salir
      </a>
      <button class="btn btn-outline-secondary btn-sm sidebar-toggler d-lg-none" onclick="toggleSidebar()">
        <i class="bi bi-list fs-5"></i>
      </button>
    </div>
  </header>
