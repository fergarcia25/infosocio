<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/utils/functions.php';
require_once __DIR__ . '/utils/excluidos.php';

function RiesgoOnline($dni) {
    $url = 'https://serviciosweb.afip.gob.ar/Publico/Turnos/Turnos.aspx/getCiudadano';

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $headers = [
        'Accept: application/json, text/javascript, */*; q=0.01',
        'Accept-Language: es-419,es;q=0.9',
        'Connection: keep-alive',
        'Content-Type: application/json; charset=UTF-8',
        'Cookie: f5avraaaaaaaaaaaaaaaa_session_=DOEFCKKNCLCHCKGJOEHBMOCMDKNCABPNJHJLHBFJJLHBNIICNLJJOJIIJCICEDCPHHADBFHDGKCGJMEJMCAABDNENFNIIDAPHFIPHNIAIPCFHKDMBFDPOLIIOAKDEMNF; f5_cspm=1234; ASP.NET_SessionId=2aikk255yp2ebe3msf0wwz45; __utma=151131451.1031285983.1689803552.1689803552.1689803552.1; __utmc=151131451; __utmz=151131451.1689803552.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmt=1; _ga=GA1.1.1069293640.1689803552; TS019ae727=01439f1ddfe625a05c9e00358d7b381b11da717a589ab9bb85e15a8587883df0680261a601f99e48d13923af24b2e4946e4475ee41892bcbf442e9085fe1fe63053acbdeedaa7ff93025be6d252752ff20654024a5a3a7951130d398d5d402897f6c767a10deeaeeb4d0ab15276578bad3dd7961a1; __utmb=151131451.3.10.1689803552; _ga_Z17TMMB3NZ=GS1.1.1689803552.1.1.1689803600.0.0.0',
        'Origin: https://serviciosweb.afip.gob.ar',
        'Referer: https://serviciosweb.afip.gob.ar/Publico/Turnos/Turnos.aspx',
        'Sec-Fetch-Dest: empty',
        'Sec-Fetch-Mode: cors',
        'Sec-Fetch-Site: same-origin',
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'X-Requested-With: XMLHttpRequest',
        'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        'sec-ch-ua-mobile: ?0',
        'sec-ch-ua-platform: "Windows"',
    ];
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

    if (strlen($dni) <= 8) {
        $data = '{"tipoDoc":"96","NroDoc":"' . $dni . '","NroDocRep":""}';
    } else {
        $data = '{"tipoDoc":"0","NroDoc":"' . $dni . '","NroDocRep":""}';
    }

    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

    $resp = curl_exec($curl);
    curl_close($curl);
    $data = json_decode($resp, true);

    $numeroCuit = null;
    $Nombre = null;
    $dataArray = [];

    if (isset($data['d']['Ciudadano'])) {
        $numeroCuit = $data['d']['Ciudadano']['NroCUIT'];
        $Nombre = $data['d']['Ciudadano']['NombORS'];
    } elseif (isset($data['d']['ciudadanos'])) {
        foreach ($data['d']['ciudadanos'] as $ciudadano) {
            $dataArray[] = [
                'Cuits' => $ciudadano['NroCUIT'],
                'Nombres' => $ciudadano['Denominacion'],
            ];
        }
    }

    return [
        'Cuil' => $numeroCuit,
        'Nombre' => $Nombre,
        'Otros' => $dataArray,
    ];
}

function determinarSexoPorCuil($cuil) {
    if (strlen($cuil) != 11) {
        return 'N';
    }
    $prefix = substr($cuil, 0, 2);
    switch ($prefix) {
        case '20': return 'M';
        case '27': return 'F';
        case '23': return 'X';
        default: return 'N';
    }
}

$criterio = $_REQUEST['criterio'] ?? '';

if (empty($criterio)) {
    echo json_encode(['success' => false, 'message' => 'Criterio de búsqueda requerido']);
    exit;
}

$criterio = htmlspecialchars($criterio, ENT_QUOTES, 'UTF-8');
$criterio = str_replace('.', '', $criterio);
$criterio = trim($criterio);

$onlyDigits = preg_replace('/[^0-9]/', '', $criterio);

// For numeric criteria (DNI/CUIT), use RiesgoOnline
if (preg_match("/^\d+$/", $onlyDigits) && strlen($onlyDigits) >= 6) {
    $denis = $onlyDigits;

    // If CUIT (10-11 digits), extract DNI
    if (strlen($denis) >= 10) {
        $denis = substr($denis, 2);
        $denis = substr($denis, 0, -1);
    }

    // Excluidos check on the CUIT
    $fullCuit = $onlyDigits;
    if (in_array($fullCuit, $excluidos)) {
        echo json_encode([
            'success' => true,
            'total' => 0,
            'results' => [],
            'counts' => ['men' => 0, 'women' => 0, 'firstAge' => 0, 'secondAge' => 0, 'thirdAge' => 0],
        ]);
        exit;
    }

    $Renaper = RiesgoOnline($denis);

    $results = [];
    $menCount = 0;
    $womenCount = 0;

    if (!empty($Renaper['Cuil']) || !empty($Renaper['Nombre'])) {
        $cuil = $Renaper['Cuil'];
        $nombreCompleto = $Renaper['Nombre'];
        $sexo = determinarSexoPorCuil($cuil);

        if (strlen($cuil) >= 10) {
            $dni = substr($cuil, 2);
            $dni = substr($dni, 0, -1);
        } else {
            $dni = $denis;
        }

        $cuitFormatted = calculate_cuit($dni, $sexo);

        if (!in_array(str_replace('-', '', $cuitFormatted), $excluidos)) {
            $results[] = [
                'nrodni' => $dni,
                'nombres' => $nombreCompleto,
                'apellidos' => '',
                'sexo' => $sexo,
                'fechanac' => '',
                'edad' => 0,
                'provincia' => '',
                'ciudad' => '',
                'cuit' => $cuitFormatted,
            ];
            if ($sexo === 'F') $womenCount++;
            else $menCount++;
        }
    }

    // If multiple results from Otros
    if (empty($results) && !empty($Renaper['Otros'])) {
        foreach ($Renaper['Otros'] as $persona) {
            $cuil = $persona['Cuits'];
            $nombreCompleto = $persona['Nombres'];
            $sexo = determinarSexoPorCuil($cuil);

            if (strlen($cuil) >= 10) {
                $dni = substr($cuil, 2);
                $dni = substr($dni, 0, -1);
            } else {
                $dni = $denis;
            }

            $cuitFormatted = calculate_cuit($dni, $sexo);

            if (!in_array(str_replace('-', '', $cuitFormatted), $excluidos)) {
                $results[] = [
                    'nrodni' => $dni,
                    'nombres' => $nombreCompleto,
                    'apellidos' => '',
                    'sexo' => $sexo,
                    'fechanac' => '',
                    'edad' => 0,
                    'provincia' => '',
                    'ciudad' => '',
                    'cuit' => $cuitFormatted,
                ];
                if ($sexo === 'F') $womenCount++;
                else $menCount++;
            }
        }
    }

    echo json_encode([
        'success' => true,
        'total' => count($results),
        'results' => $results,
        'counts' => [
            'men' => $menCount,
            'women' => $womenCount,
            'firstAge' => 0,
            'secondAge' => 0,
            'thirdAge' => 0,
        ],
    ]);
    exit;
}

// For non-numeric criteria (name), use the old API approach
$apiBase = 'http://181.117.245.41:5000';
$token = '9803f8bf19792f13a0f0e70fef24956b';

$result = null;

if (preg_match("/^\pL+(?>[- ']\pL+)*$/u", $criterio)) {
    $criterioClean = str_replace('-', ' ', $criterio);
    $criterio = clear_name($criterio);
    $words = explode('-', $criterio);
    $words = json_encode($words);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiBase . '/search_by_fullname');
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'fullname=' . $words);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Token: ' . $token,
        'Content-Type: application/x-www-form-urlencoded',
    ]);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo json_encode(['success' => false, 'message' => 'Error en API básica', 'detail' => curl_error($ch)]);
        exit;
    }
    curl_close($ch);
}

if ($result === null || $result === false) {
    echo json_encode([
        'success' => true,
        'total' => 0,
        'results' => [],
        'counts' => ['men' => 0, 'women' => 0, 'firstAge' => 0, 'secondAge' => 0, 'thirdAge' => 0],
    ]);
    exit;
}

if ($result === 'Results not found') {
    echo json_encode([
        'success' => true,
        'total' => 0,
        'results' => [],
        'counts' => ['men' => 0, 'women' => 0, 'firstAge' => 0, 'secondAge' => 0, 'thirdAge' => 0],
    ]);
    exit;
}

$data = json_decode($result, true);
if ($data === null) {
    echo json_encode(['success' => false, 'message' => 'Error al procesar la respuesta']);
    exit;
}

$filtered = [];
$resultMen = [];
$resultWom = [];

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
        'provincia' => $source['PROVINCIA'] ?? $source['provincia'] ?? '',
        'ciudad' => $source['CIUDAD'] ?? $source['ciudad'] ?? '',
        'cuit' => $cuit,
    ];

    $filtered[] = $item;

    if ($sexo === 'F') {
        $resultWom[] = $item;
    } else {
        $resultMen[] = $item;
    }
}

echo json_encode([
    'success' => true,
    'total' => count($filtered),
    'results' => $filtered,
    'counts' => [
        'men' => count($resultMen),
        'women' => count($resultWom),
        'firstAge' => 0,
        'secondAge' => 0,
        'thirdAge' => 0,
    ],
]);
