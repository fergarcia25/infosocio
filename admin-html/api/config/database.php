<?php
// Database configuration

// ENTORNO: STAGING Hostinger
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'infosocio');
/*
// ENTORNO: STAGING Hostinger
define('DB_HOST', 'localhost');
define('DB_NAME', 'u653101286_infosocio');
define('DB_USER', 'u653101286_infosocio');
define('DB_PASS', '?FUI~f6#h0');
*/
/*
// ENTORNO: PRODUCTION Beahost.com
---
DB: infosoci_db_infosocio
DB user: infosoci_db_infosocio
DB user password : wtx0=SzAPMN+4v(S
---

define('DB_HOST', 'localhost');
define('DB_NAME', 'infosoci_db_infosocio');
define('DB_USER', 'infosoci_db_infosocio');
define('DB_PASS', 'wtx0=SzAPMN+4v(S');
*/
function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $e->getMessage()]);
            exit;
        }
    }
    return $pdo;
}
