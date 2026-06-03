<?php

// Configuración base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'infosocio');

/*
// Configuración base de datos prod
define('DB_HOST', 'localhost');
define('DB_USER', 'datuarco_developer');
define('DB_PASS', 'R=xWzZ4%owchnW=#');
define('DB_NAME', 'datuarco_api');

// Datos de conexión (ya existentes en tu archivo)
$DB_HOST = "localhost";
$DB_USER = "datuarco_developer";
$DB_PASS = "R=xWzZ4%owchnW=#";
$DB_NAME = "datuarco_api";
*/

// Datos de conexión (local)
$DB_HOST = "localhost";
$DB_USER = "root";
$DB_PASS = "";
$DB_NAME = "infosocio";

// Conectar
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consultar precio
$sql = "SELECT precio FROM precio WHERE clave='PRECIO-INFORME' LIMIT 1";
$res = $conn->query($sql);

if ($res && $row = $res->fetch_assoc()) {
    define('PRECIO_INFORME', (float)$row['precio']);
} else {
    define('PRECIO_INFORME', 15200);
}

/*
// Conexión
$db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Verificar conexión
if ($db->connect_error) {
    die("Error de conexión: " . $db->connect_error);
} 
*/

// ===============================================
// 🔧 CONFIGURACIÓN GENERAL DE MERCADO PAGO
// ===============================================

// ===============================================
// 💵 CONFIGURACIONES DE PRODUCTO
// ===============================================


// ===============================================
// 📡 CORS Y RESPUESTA BASE
// ===============================================
/*
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
*/
?>