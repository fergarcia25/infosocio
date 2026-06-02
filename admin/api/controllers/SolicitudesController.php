<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

class SolicitudesController {
    public function index($params = []) {
        checkAuth();
        $db = getDB();

        $where = [];
        $bind = [];

        if (!empty($params['search'])) {
            $search = '%' . $params['search'] . '%';
            $where[] = "(nombre LIKE ? OR dni LIKE ? OR cuil LIKE ? OR email_destino LIKE ?)";
            $bind = array_merge($bind, [$search, $search, $search, $search]);
        }

        if (!empty($params['estado'])) {
            $where[] = "estado = ?";
            $bind[] = $params['estado'];
        }

        if (!empty($params['pago_estado'])) {
            $where[] = "pago_estado = ?";
            $bind[] = $params['pago_estado'];
        }

        if (!empty($params['fecha_desde'])) {
            $where[] = "created_at >= ?";
            $bind[] = $params['fecha_desde'] . ' 00:00:00';
        }

        if (!empty($params['fecha_hasta'])) {
            $where[] = "created_at <= ?";
            $bind[] = $params['fecha_hasta'] . ' 23:59:59';
        }

        $sql = "SELECT * FROM solicitudes";
        if (count($where) > 0) {
            $sql .= " WHERE " . implode(" AND ", $where);
        }
        $sql .= " ORDER BY created_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($bind);
        return ['success' => true, 'data' => $stmt->fetchAll()];
    }

    public function show($id) {
        checkAuth();
        $db = getDB();
        $stmt = $db->prepare("SELECT * FROM solicitudes WHERE id = ?");
        $stmt->execute([$id]);
        $solicitud = $stmt->fetch();
        if (!$solicitud) {
            return ['success' => false, 'message' => 'Solicitud no encontrada'];
        }
        return ['success' => true, 'data' => $solicitud];
    }

    public function update($id) {
        checkAuth();
        $input = json_decode(file_get_contents('php://input'), true);
        $estado = $input['estado'] ?? null;

        if (!in_array($estado, ['pendiente', 'rechazado', 'finalizado'])) {
            return ['success' => false, 'message' => 'Estado inválido'];
        }

        $db = getDB();
        $stmt = $db->prepare("UPDATE solicitudes SET estado = ? WHERE id = ?");
        $stmt->execute([$estado, $id]);

        if ($stmt->rowCount() === 0) {
            return ['success' => false, 'message' => 'Solicitud no encontrada'];
        }

        return ['success' => true, 'message' => 'Estado actualizado'];
    }
}
