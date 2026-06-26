<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../../web/src/utils/functions.php';
require_once __DIR__ . '/../../web/src/utils/excluidos.php';

$criterio = $_REQUEST['criterio'] ?? '';
$provincia = $_REQUEST['provincia'] ?? '';
$municipio = $_REQUEST['municipio'] ?? '';
$ciudad = $_REQUEST['ciudad'] ?? '';

if (empty($criterio)) {
    echo json_encode(['success' => false, 'message' => 'Criterio de búsqueda requerido']);
    exit;
}

$criterio = htmlspecialchars($criterio, ENT_QUOTES, 'UTF-8');
$criterio = str_replace('.', '', $criterio);
$criterio = trim($criterio);

$apiBase = 'http://181.117.245.41:5000';
$token = '9803f8bf19792f13a0f0e70fef24956b';
$result = null;

// Nombre
if (preg_match("/^\pL+(?>[- ']\pL+)*$/u", $criterio)) {
    $criterioClean = str_replace('-', ' ', $criterio);
    $criterio = clear_name($criterio);
    $words = explode('-', $criterio);
    $words = json_encode($words);

    $ch = curl_init();

    if ($provincia !== '' && $municipio === '' && $ciudad === '') {
        $prov = clear_provincia($provincia);
        curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_fullname_with_prov');
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'fullname=' . $words . '&provincia=' . $prov);
    } elseif ($provincia !== '' && $municipio !== '' && $ciudad === '') {
        $prov = clear_provincia($provincia);
        $muni = clear_municipio($municipio);
        curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_fullname_w_prov_muni');
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'fullname=' . $words . '&provincia=' . $prov . '&municipio=' . $muni);
    } elseif ($provincia !== '' && $municipio !== '' && $ciudad !== '') {
        $prov = clear_provincia($provincia);
        $muni = clear_municipio($municipio);
        $city = clear_ciudad($ciudad);
        curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_fullname_w_prov_muni_city');
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'fullname=' . $words . '&provincia=' . $prov . '&municipio=' . $muni . '&ciudad=' . $city);
    } else {
        curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_fullname');
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'fullname=' . $words);
    }

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Token: ' . $token,
        'Content-Type: application/x-www-form-urlencoded',
    ]);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo json_encode(['success' => false, 'message' => 'Error en el servidor externo', 'detail' => curl_error($ch)]);
        exit;
    }
    curl_close($ch);
}

// DNI (6-8 digits)
if (preg_match("/^\d+$/", $criterio) && strlen($criterio) >= 6 && strlen($criterio) <= 8) {
    $ch = curl_init();

    if ($provincia !== '' && $municipio === '' && $ciudad === '') {
        $prov = clear_provincia($provincia);
        curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_dni_with_prov');
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'dni=' . $criterio . '&provincia=' . $prov);
    } elseif ($provincia !== '' && $municipio !== '' && $ciudad === '') {
        $prov = clear_provincia($provincia);
        $muni = clear_municipio($municipio);
        curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_dni_w_prov_muni');
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'dni=' . $criterio . '&provincia=' . $prov . '&municipio=' . $muni);
    } elseif ($provincia !== '' && $municipio !== '' && $ciudad !== '') {
        $prov = clear_provincia($provincia);
        $muni = clear_municipio($municipio);
        $city = clear_ciudad($ciudad);
        curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_dni_w_prov_muni_city');
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'dni=' . $criterio . '&provincia=' . $prov . '&municipio=' . $muni . '&ciudad=' . $city);
    } else {
        curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_dni');
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'dni=' . $criterio);
    }

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Token: ' . $token,
        'Content-Type: application/x-www-form-urlencoded',
    ]);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo json_encode(['success' => false, 'message' => 'Error en el servidor externo', 'detail' => curl_error($ch)]);
        exit;
    }
    curl_close($ch);
}

// CUIT (10-13 digits, with or without dashes)
if ((substr_count($criterio, '-') === 2 && strlen($criterio) >= 12 && strlen($criterio) <= 13) ||
    (preg_match("/^\d+$/", $criterio) && strlen($criterio) >= 10 && strlen($criterio) <= 11)) {
    
    $criterioClean = $criterio;
    $criterio = str_replace('-', '', $criterio);
    
    if (ctype_digit($criterio) && strlen($criterio) >= 10 && strlen($criterio) <= 11) {
        $dni = substr($criterio, 2);
        $dni = substr($dni, 0, -1);
        
        $ch = curl_init();

        if ($provincia !== '' && $municipio === '' && $ciudad === '') {
            $prov = clear_provincia($provincia);
            curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_dni_with_prov');
            curl_setopt($ch, CURLOPT_POSTFIELDS, 'dni=' . $dni . '&provincia=' . $prov);
        } elseif ($provincia !== '' && $municipio !== '' && $ciudad === '') {
            $prov = clear_provincia($provincia);
            $muni = clear_municipio($municipio);
            curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_dni_w_prov_muni');
            curl_setopt($ch, CURLOPT_POSTFIELDS, 'dni=' . $dni . '&provincia=' . $prov . '&municipio=' . $muni);
        } elseif ($provincia !== '' && $municipio !== '' && $ciudad !== '') {
            $prov = clear_provincia($provincia);
            $muni = clear_municipio($municipio);
            $city = clear_ciudad($ciudad);
            curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_dni_w_prov_muni_city');
            curl_setopt($ch, CURLOPT_POSTFIELDS, 'dni=' . $dni . '&provincia=' . $prov . '&municipio=' . $muni . '&ciudad=' . $city);
        } else {
            curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_dni');
            curl_setopt($ch, CURLOPT_POSTFIELDS, 'dni=' . $dni);
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Token: ' . $token,
            'Content-Type: application/x-www-form-urlencoded',
        ]);

        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo json_encode(['success' => false, 'message' => 'Error en el servidor externo', 'detail' => curl_error($ch)]);
            exit;
        }
        curl_close($ch);
    }
}

if (!isset($result) || $result === false) {
    echo json_encode(['success' => false, 'message' => 'No se pudo realizar la búsqueda']);
    exit;
}

if ($result === 'Results not found') {
    echo json_encode([
        'success' => true,
        'total' => 0,
        'results' => [],
        'counts' => [
            'men' => 0,
            'women' => 0,
            'firstAge' => 0,
            'secondAge' => 0,
            'thirdAge' => 0,
        ],
    ]);
    exit;
}

$data = json_decode($result, true);
if ($data === null) {
    echo json_encode(['success' => false, 'message' => 'Error al procesar la respuesta']);
    exit;
}

// Filter excluded, calculate CUIT, separate by gender/age
$filtered = [];
$resultMen = [];
$resultWom = [];
$resultFirstAge = [];
$resultSecondAge = [];
$resultThirdAge = [];

foreach ($data as $person) {
    $source = $person['_source'] ?? [];
    $dni = $source['NRODNI'] ?? '';
    $sexo = $source['SEXO'] ?? '';
    $fechanac = $source['FECHANAC'] ?? '';

    if ($dni === '' || $sexo === '') continue;

    $cuit = calculate_cuit($dni, $sexo);
    $cuitPlain = str_replace('-', '', $cuit);

    if (in_array($cuitPlain, $excluidos)) continue;

    $edad = calculate_age($fechanac);

    $item = [
        'nrodni' => $dni,
        'nombres' => $source['NOMBRES'] ?? '',
        'apellidos' => $source['APELLIDOS'] ?? '',
        'sexo' => $sexo,
        'fechanac' => $fechanac,
        'edad' => (int)$edad,
        'provincia' => $source['PROVINCIA'] ?? '',
        'ciudad' => $source['CIUDAD'] ?? '',
        'cuit' => $cuit,
    ];

    $filtered[] = $item;

    if ($sexo === 'F') {
        $resultWom[] = $item;
    } else {
        $resultMen[] = $item;
    }

    if ($edad >= 18 && $edad <= 30) {
        $resultFirstAge[] = $item;
    } elseif ($edad > 30 && $edad <= 50) {
        $resultSecondAge[] = $item;
    } elseif ($edad > 50 && $edad <= 100) {
        $resultThirdAge[] = $item;
    }
}

echo json_encode([
    'success' => true,
    'total' => count($filtered),
    'results' => $filtered,
    'counts' => [
        'men' => count($resultMen),
        'women' => count($resultWom),
        'firstAge' => count($resultFirstAge),
        'secondAge' => count($resultSecondAge),
        'thirdAge' => count($resultThirdAge),
    ],
]);
