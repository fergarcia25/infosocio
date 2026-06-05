<?php
$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);

// Si es una ruta de /admin/, no hacer nada (lo maneja admin/.htaccess)
if (strpos($path, '/admin/') === 0 || $path === '/admin') {
    return false;
}

// Servir archivos existentes directamente
$filePath = __DIR__ . $path;
if (file_exists($filePath) && is_file($filePath)) {
    return false;
}

// SPA fallback: servir la app web
readfile(__DIR__ . '/dist/index.html');
