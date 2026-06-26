<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

class PrecioController {
    public function show() {
        checkAuth();
        $db = getDB();
        $stmt = $db->query("SELECT id, monto, updated_at FROM precio ORDER BY id DESC LIMIT 1");
        $precio = $stmt->fetch();
        return ['success' => true, 'data' => $precio];
    }

    public function showPublic() {
        $db = getDB();
        $stmt = $db->query("SELECT monto FROM precio ORDER BY id DESC LIMIT 1");
        $precio = $stmt->fetch();
        $monto = $precio ? (float)$precio['monto'] : 15200;
        return ['success' => true, 'monto' => $monto];
    }

    public function update() {
        checkAuth();
        $input = json_decode(file_get_contents('php://input'), true);
        $monto = $input['monto'] ?? null;

        if (!$monto || $monto <= 0) {
            return ['success' => false, 'message' => 'Monto inválido'];
        }

        $db = getDB();
        $stmt = $db->prepare("UPDATE precio SET monto = ? WHERE id = 1");
        $stmt->execute([$monto]);

        return ['success' => true, 'message' => 'Precio actualizado'];
    }
}
