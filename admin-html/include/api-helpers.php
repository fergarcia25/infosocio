<?php
require_once __DIR__ . '/../api/config/database.php';
require_once __DIR__ . '/../api/middleware/auth.php';

function apiCallGet($action, $params = []) {
  switch ($action) {
    case 'dashboard': return getDbStats();
    case 'solicitudes': return getSolicitudes($params);
    case 'solicitud': return getSolicitud($params['id'] ?? null);
    case 'precio': return getPrecio();
    default: return ['success' => false, 'message' => 'Acción no válida'];
  }
}

function apiCallPost($action, $data = []) {
  return ['success' => false, 'message' => 'No implementado'];
}

function apiCallPut($action, $data = []) {
  return ['success' => false, 'message' => 'No implementado'];
}

function getDbStats() {
  checkAuth();
  $db = getDB();

  $totales = $db->query("SELECT COUNT(*) as total FROM solicitudes")->fetch();
  $pendientes = $db->query("SELECT COUNT(*) as total FROM solicitudes WHERE estado = 'pendiente'")->fetch();
  $finalizadas = $db->query("SELECT COUNT(*) as total FROM solicitudes WHERE estado = 'finalizado'")->fetch();
  $ingresos = $db->query("SELECT COALESCE(SUM(precio), 0) as total FROM solicitudes WHERE pago_estado = 'aprobado'")->fetch();

  $rows = $db->query("
    SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as dia, COUNT(*) as total
    FROM solicitudes
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 10 DAY)
    GROUP BY dia
  ")->fetchAll();

  $lookup = [];
  foreach ($rows as $r) {
    $lookup[$r['dia']] = $r['total'];
  }

  $diario = [];
  for ($i = 9; $i >= 0; $i--) {
    $date = date('Y-m-d', strtotime("-$i days"));
    $diario[] = [
      'dia' => $date,
      'total' => $lookup[$date] ?? '0',
    ];
  }

  return [
    'success' => true,
    'data' => [
      'totales' => $totales['total'],
      'pendientes' => $pendientes['total'],
      'finalizadas' => $finalizadas['total'],
      'ingresos' => $ingresos['total'],
      'diario' => $diario,
    ]
  ];
}

function getSolicitudes($params = []) {
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

function getSolicitud($id) {
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

function getPrecio() {
  checkAuth();
  $db = getDB();
  $stmt = $db->query("SELECT id, monto, updated_at FROM precio ORDER BY id DESC LIMIT 1");
  $precio = $stmt->fetch();
  return ['success' => true, 'data' => $precio];
}
