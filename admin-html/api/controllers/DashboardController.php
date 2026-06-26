<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

class DashboardController {
    public function stats() {
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
}
