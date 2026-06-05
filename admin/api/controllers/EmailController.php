<?php

class EmailController {
    public function send() {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input || !isset($input['form']) || !isset($input['data'])) {
            return ['success' => false, 'message' => 'Datos inválidos'];
        }

        $to = 'contacto@estudiochento.com';
        $formName = htmlspecialchars($input['form']);
        $data = $input['data'];

        $rows = '';
        foreach ($data as $label => $value) {
            $label = htmlspecialchars($label);
            $value = htmlspecialchars($value);
            $rows .= "
                <tr>
                    <td style='padding:10px 16px;border-bottom:1px solid #eee;font-weight:600;color:#333;background:#f9f9f9;width:180px'>{$label}</td>
                    <td style='padding:10px 16px;border-bottom:1px solid #eee;color:#555'>{$value}</td>
                </tr>";
        }

        $html = "
        <div style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto'>
            <div style='background:linear-gradient(135deg,#b71c1c,#c62828);padding:24px 32px;border-radius:12px 12px 0 0'>
                <h1 style='color:#fff;margin:0;font-size:22px'>{$formName}</h1>
            </div>
            <div style='background:#fff;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 12px 12px;padding:8px'>
                <table style='width:100%;border-collapse:collapse'>
                    <tbody>{$rows}</tbody>
                </table>
            </div>
            <p style='color:#999;font-size:12px;text-align:center;margin-top:12px'>Enviado desde InfoSocio</p>
            <p style='color:#bbb;font-size:11px;text-align:center;margin-top:4px'>" . date('d/m/Y H:i') . " | &copy; 2026 InfoSocio</p>
        </div>";

        $subject = "=?UTF-8?B?" . base64_encode("Nuevo formulario: {$formName}") . "?=";
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $headers .= "From: InfoSocio Web <no-reply@infosocio.com>\r\n";
        $headers .= "Reply-To: " . (isset($data['Email']) ? $data['Email'] : 'no-reply@infosocio.com') . "\r\n";

        $ok = mail($to, $subject, $html, $headers);

        return [
            'success' => $ok,
            'message' => $ok ? 'Email enviado correctamente' : 'Error al enviar el email'
        ];
    }
}
