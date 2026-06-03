<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/mercadopago.php';

class PaymentController {
    public function createPreference() {
        $input = json_decode(file_get_contents('php://input'), true);

        $cdu = $input['cdu'] ?? '';
        $nombre = $input['nombre'] ?? 'Informe';
        $email = $input['email'] ?? '';
        $whatsapp = $input['whatsapp'] ?? '';

        if (empty($cdu) || empty($email)) {
            return ['success' => false, 'error' => 'Faltan datos requeridos (cdu, email)'];
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'error' => 'Email inválido'];
        }

        $db = getDB();

        $stmt = $db->query("SELECT monto FROM precio ORDER BY id DESC LIMIT 1");
        $precio = $stmt->fetch();
        $precio_informe = $precio ? (float)$precio['monto'] : 15200;

        $access_token = MP_ACCESS_TOKEN;

        $protocolo = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'];
        $base_url = $protocolo . '://' . $host;

        $es_local = in_array($host, ['localhost', '127.0.0.1']) || $protocolo === 'http';
        if ($es_local) {
            $url_success = 'https://www.google.com/?q=exito';
            $url_failure = 'https://www.google.com/?q=fallo';
            $url_pending = 'https://www.google.com/?q=pendiente';
        } else {
            $url_success = $base_url . '/web/exito.php';
            $url_failure = $base_url . '/web/fallo.php';
            $url_pending = $base_url . '/web/pendiente.php';
        }

        $data = [
            'items' => [
                [
                    'title' => 'Informe Completo Verificado - ' . htmlspecialchars($nombre),
                    'description' => 'Informe de datos para DNI/CUIL: ' . htmlspecialchars($cdu),
                    'quantity' => 1,
                    'unit_price' => $precio_informe,
                    'currency_id' => 'ARS',
                ],
            ],
            'payer' => [
                'email' => $email,
            ],
            'external_reference' => $cdu,
            'back_urls' => [
                'success' => $url_success,
                'failure' => $url_failure,
                'pending' => $url_pending,
            ],
            'auto_return' => 'approved',
        ];

        $ch = curl_init('https://api.mercadopago.com/checkout/preferences');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $access_token,
            'Content-Type: application/json',
        ]);

        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $mp_data = json_decode($response, true);

        if ($http_code !== 200 && $http_code !== 201) {
            $error_msg = $mp_data['message'] ?? 'Error al crear preferencia en MercadoPago';
            return ['success' => false, 'error' => $error_msg];
        }

        $init_point = $mp_data['init_point'];
        $mp_id = $mp_data['id'] ?? '';

        try {
            $stmt = $db->prepare(
                "INSERT INTO solicitudes (dni, cuil, nombre, email_destino, whatsapp, monto, pago_estado, estado, mp_preference_id, mp_init_point)
                 VALUES (?, ?, ?, ?, ?, ?, 'pendiente', 'pendiente', ?, ?)"
            );
            $stmt->execute([
                $cdu,
                $cdu,
                $nombre,
                $email,
                $whatsapp,
                $precio_informe,
                $mp_id,
                $init_point,
            ]);
        } catch (Exception $e) {
            error_log("Error guardando solicitud en MySQL: " . $e->getMessage());
        }

        return ['success' => true, 'init_point' => $init_point];
    }
}
