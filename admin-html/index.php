<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

$page = $_GET['page'] ?? 'dashboard';

// Logout
if (isset($_GET['logout']) && $_GET['logout'] === '1') {
  if (session_status() === PHP_SESSION_NONE) session_start();
  $_SESSION = [];
  session_destroy();
  header('Location: index.php?page=login');
  exit;
}

// Auth check — check session directly
$publicPages = ['login'];
if (!in_array($page, $publicPages)) {
  if (!isset($_SESSION['admin_user'])) {
    header('Location: index.php?page=login');
    exit;
  }
}

// Route
switch ($page) {
  case 'login':
    require 'login.php';
    break;
  case 'dashboard':
    require 'dashboard.php';
    break;
  case 'solicitudes':
    require 'solicitudes.php';
    break;
  case 'solicitud':
    require 'solicitud.php';
    break;
  case 'precio':
    require 'precio.php';
    break;
  case 'generar-informe':
    require 'generar-informe.php';
    break;
  default:
    header('Location: index.php?page=dashboard');
    break;
}
