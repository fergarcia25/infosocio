<?php
$base = '/admin';
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);

// Strip base path
$adminPath = strpos($path, $base) === 0 ? substr($path, strlen($base)) : $path;
$adminPath = $adminPath ?: '/';

// API passthrough
if (strpos($adminPath, '/api/') === 0) {
    $apiFile = __DIR__ . $adminPath;
    if (file_exists($apiFile) && is_file($apiFile)) {
        require $apiFile;
        return;
    }
    http_response_code(404);
    echo 'API endpoint not found';
    return;
}

// Serve dist/index.html for the admin root
if ($adminPath === '/' || $adminPath === '') {
    readfile(__DIR__ . '/dist/index.html');
    return;
}

// Serve existing static files from dist/
$distFile = __DIR__ . '/dist' . $adminPath;
if (file_exists($distFile) && is_file($distFile)) {
    $mime = [
        'js' => 'application/javascript',
        'css' => 'text/css',
        'html' => 'text/html',
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

// SPA fallback: serve the app for any unmatched route
readfile(__DIR__ . '/dist/index.html');
