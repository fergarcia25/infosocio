<?php
// Enable CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/controllers/AuthController.php';
require_once __DIR__ . '/controllers/SolicitudesController.php';
require_once __DIR__ . '/controllers/PrecioController.php';
require_once __DIR__ . '/controllers/DashboardController.php';

$action = $_GET['action'] ?? '';

// Start session for auth
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

try {
    switch ($action) {
        // Auth
        case 'login':
            $ctrl = new AuthController();
            echo json_encode($ctrl->login());
            break;
        case 'logout':
            $ctrl = new AuthController();
            echo json_encode($ctrl->logout());
            break;
        case 'check-auth':
            $ctrl = new AuthController();
            echo json_encode($ctrl->check());
            break;

        // Solicitudes
        case 'solicitudes':
            $ctrl = new SolicitudesController();
            $params = array_intersect_key($_GET, array_flip(['search', 'estado', 'pago_estado', 'fecha_desde', 'fecha_hasta']));
            echo json_encode($ctrl->index($params));
            break;
        case 'solicitud':
            $id = $_GET['id'] ?? null;
            if (!$id) {
                echo json_encode(['success' => false, 'message' => 'ID requerido']);
                break;
            }
            $ctrl = new SolicitudesController();
            echo json_encode($ctrl->show($id));
            break;
        case 'actualizar-solicitud':
            $input = json_decode(file_get_contents('php://input'), true);
            $id = $input['id'] ?? null;
            if (!$id) {
                echo json_encode(['success' => false, 'message' => 'ID requerido']);
                break;
            }
            $ctrl = new SolicitudesController();
            echo json_encode($ctrl->update($id));
            break;

        // Precio
        case 'precio':
            $ctrl = new PrecioController();
            echo json_encode($ctrl->show());
            break;
        case 'actualizar-precio':
            $ctrl = new PrecioController();
            echo json_encode($ctrl->update());
            break;

        // Dashboard
        case 'dashboard':
            $ctrl = new DashboardController();
            echo json_encode($ctrl->stats());
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Acción no válida']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
