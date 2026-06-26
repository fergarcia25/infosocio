<?php

function getApiBaseUrl() {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    return "$scheme://$host";
}

function searchApiFetch($url) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($httpCode !== 200) {
        throw new Exception("Error del servidor ($httpCode)");
    }
    $data = json_decode($response, true);
    if ($data === null) {
        throw new Exception('Error al procesar la respuesta de la API');
    }
    return $data;
}

function searchPeople($criterio, $provincia = '', $municipio = '', $ciudad = '') {
    $params = http_build_query([
        'criterio' => $criterio,
        'provincia' => $provincia,
        'municipio' => $municipio,
        'ciudad' => $ciudad,
    ]);

    $baseUrl = getApiBaseUrl();
    $apiUrl = "$baseUrl/admin/api/buscar-basic.php?$params";

    try {
        $primary = searchApiFetch($apiUrl);
    } catch (Exception $e) {
        error_log('[searchApi] Error en fetch: ' . $e->getMessage());
        $primary = null;
    }

    if ($primary && !empty($primary['success']) && !empty($primary['results'])) {
        return $primary;
    }

    if ($primary && !empty($primary['success'])) {
        return $primary;
    }

    $message = isset($primary['message']) ? $primary['message'] : 'Error en la búsqueda';
    throw new Exception($message);
}
