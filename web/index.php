<?php
$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);

$base = '/web';
if (strpos($path, $base) === 0) {
    $webPath = substr($path, strlen($base));
} else {
    $webPath = $path;
}

if ($webPath === '' || $webPath === '/') {
    readfile(__DIR__ . '/dist/index.html');
    return;
}

$distFile = __DIR__ . '/dist' . $webPath;
if (file_exists($distFile) && is_file($distFile)) {
    $mime = [
        'js' => 'application/javascript',
        'css' => 'text/css',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'ico' => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
        'json' => 'application/json',
        'map' => 'application/json',
        'webp' => 'image/webp',
    ];
    $ext = strtolower(pathinfo($distFile, PATHINFO_EXTENSION));
    if (isset($mime[$ext])) {
        header('Content-Type: ' . $mime[$ext]);
    }
    readfile($distFile);
    return;
}

readfile(__DIR__ . '/dist/index.html');
