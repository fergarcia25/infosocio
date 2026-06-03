<?php
function encode_data($cuit, $names, $surnames, $age, $prov, $city, $sex) {
    $data = $cuit . "_" . $names . "_" . $surnames . "_" . $age . "_" . $prov . "_" . $city . "_" . $sex;
    $key = "83f675ba6d25eba3e5547b18921ce815";
    $iv = openssl_random_pseudo_bytes(16);
    $data_cifrada = openssl_encrypt($data, 'AES-256-CBC', $key, 0, $iv);
    $resultado = base64_encode($iv . $data_cifrada);
    return strtr($resultado, '+/', '-_');
}

function encode_nro_pedido($nro_pedido) {
    $key = "83f675ba6d25eba3e5547b18921ce815";
    $iv = openssl_random_pseudo_bytes(16);
    $data_cifrada = openssl_encrypt($nro_pedido, 'AES-256-CBC', $key, 0, $iv);
    $resultado = base64_encode($iv . $data_cifrada);
    return strtr($resultado, '+/', '-_');
}

function decode_data($hash) {
    $key = "83f675ba6d25eba3e5547b18921ce815";
    $data_cifrada = strtr($hash ?? '', '-_', '+/');
    $data_decoded = base64_decode($data_cifrada);
    $iv = substr($data_decoded, 0, 16);
    $data_codificada = substr($data_decoded, 16);
    $data_decodificada = openssl_decrypt($data_codificada, 'AES-256-CBC', $key, 0, $iv);
    return $data_decodificada;
}

function generarNumPedido($long) {
    $codigo = '';
    for ($i = 0; $i < $long; $i++) {
        $aleatorio = mt_rand(0, 9);
        $codigo .= $aleatorio;
    }
    return $codigo;
}

function getCredits() {
    $url = 'http://138.99.6.135:3000/getCredits';
    $email = $_SESSION["email"];
    
    $data = array(
        'email' => $email
    );

    $data_json = json_encode($data);

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    $response = curl_exec($ch);
    $responseData = json_decode($response, true);
    return $responseData["available_credits"];
}

function update_mp_email($pedido, $email) {
    $url = 'http://138.99.6.135/datuar/datuar/api.php?action=update_mp_email';

    $data = array(
        'number' => $pedido,
        'email_mp' => $email
    );

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($ch);
}

function buscar_info($criterio) {
    $url = 'http://138.99.6.135:3000/busquedaInfoexp';
    $data = array(
        'criterio' => $criterio
    );
    
    $data_json = json_encode($data);

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    $response = curl_exec($ch);
    return $response;
}

function existe_codigo($nro_pedido) {
    $url = 'http://138.99.6.135:3000/buscarNumero';
    $data = array(
        'number' => $nro_pedido
    );
    
    $data_json = json_encode($data);

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    $response = curl_exec($ch);
    $res_json = json_decode($response, true);
    
    if ($res_json["count"] == 1) {
        return true;
    } else {
        return false;
    }
}

function venta_pagada($nro_pedido) {
    $url = 'http://138.99.6.135/datuar/datuar/api.php?action=sale_payed';

    $data = array(
        'number' => $nro_pedido
    );

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($ch);

    if ($response == 1) {
        return true;
    } else {
        return false;
    }
}

function get_report($nro_pedido) {
    $url = 'http://138.99.6.135/datuar/datuar/api.php?action=get_report';

    $data = array(
        'number' => $nro_pedido
    );

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($ch);
    return $response;
}

function insert_venta($preference_id, $nro_pedido, $cuit, $payment_status, $report_sent, $phone, $mail, $hash, $doble_hash) {
    $url = 'http://138.99.6.135:3000/guardarVenta';

    $data = array(
        'preference_id' => $preference_id,
        'number' => $nro_pedido,
        'cuit' => str_replace("-", "", $cuit),
        'pay_status' => $payment_status,
        'report_sent' => $report_sent,
        'phone' => $phone,
        'email' => $mail,
        'hash' => $hash,
        'doble_hash' => $doble_hash,
    );
    
    $data_json = json_encode($data);

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    $response = curl_exec($ch);
}

function update_venta_status($nro_pedido, $payment_status) {
    $url = 'http://138.99.6.135/datuar/datuar/api.php?action=update_sale_status';
    $data = array(
        'number' => $nro_pedido,
        'pay_status' => $payment_status
    );

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($ch);
}

function update_data_contact($nro_pedido, $email, $whatsapp) {
    $url = 'http://138.99.6.135/datuar/datuar/api.php?action=update_data_contact';

    $data = array(
        'number' => $nro_pedido,
        'email' => $email,
        'phone' => $whatsapp
    );

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($ch);
}

function enviar_informe($nro_pedido) {
    $url = 'http://138.99.6.135/datuar/datuar/api.php?action=send_report';

    $data = array(
        'number' => $nro_pedido
    );

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_TIMEOUT, 1); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($ch);
}

function existe_data_contacto($nro_pedido) {
    $url = 'http://138.99.6.135/datuar/datuar/api.php?action=check_contact_data';

    $data = array(
        'number' => $nro_pedido
    );

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($ch);
    
    if ($response == 1) {
        return true;
    } else {
        return false;
    }
}

function check_cert_sent($nro_pedido) {
    $url = 'http://138.99.6.135/datuar/datuar/api.php?action=check_cert_sent';

    $data = array(
        'number' => $nro_pedido
    );

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($ch);
    
    if ($response == "Sin enviar" || $response == "") {
        return false;
    } else {
        return true;
    }
}

function clear_provincia($provincia) {
    if ($provincia == "CABA") {
        $provincia = "Ciudad de buenos aires";
    }
    
    $unwanted_array = array(    'Š'=>'S', 'š'=>'s', 'Ž'=>'Z', 'ž'=>'z', 'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E',
                            'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O', 'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ù'=>'U',
                            'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Þ'=>'B', 'ß'=>'Ss', 'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c',
                            'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ñ'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o',
                            'ö'=>'o', 'ø'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'þ'=>'b', 'ÿ'=>'y' );
    $str = strtr($provincia, $unwanted_array);
    $str = ucfirst(strtolower($str));
    return $str;
}


function tel_argentino($tel) {
    $re = '/^(?:((?P<p1>(?:\( ?)?+)(?:\+|00)?(54)(?<p2>(?: ?\))?+)(?P<sep>(?:[-.]| (?:[-.] )?)?+)(?:(?&p1)(9)(?&p2)(?&sep))?|(?&p1)(0)(?&p2)(?&sep))?+(?&p1)(11|([23]\d{2}(\d)??|(?(-10)(?(-5)(?!)|[68]\d{2})|(?!))))(?&p2)(?&sep)(?(-5)|(?&p1)(15)(?&p2)(?&sep))?(?:([3-6])(?&sep)|([12789]))(\d(?(-5)|\d(?(-6)|\d)))(?&sep)(\d{4})|(1\d{2}|911))$/D';
    if (preg_match($re,$tel,$match)) {
        list(
            ,$internacional_completo,,$internacional,,,$internacional_celu,$prefijo_acceso,$area,,,
            $prefijo_celu,$local_1a,$local_1b,$local_1c,$local_2,$numero_social
        ) = array_pad($match,20,'');

        $local_1 = $local_1a . $local_1b . $local_1c;
        $local = $local_1 . $local_2;
        $es_fijo = !($internacional_celu || $prefijo_celu);
        $numero = $area.$local.$numero_social;
        $completo = $internacional.$internacional_celu.$area.$prefijo_celu.$local.$numero_social;

        return compact(
                   'numero','completo','internacional','internacional_celu','area',
                   'prefijo_celu','local','local_1','local_2','numero_social','es_fijo'
               );
    }
    return false;
}

function clear_name($name) {
    /*
    $clean_name = rtrim($name);
    $clean_name = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $clean_name);
    return $clean_name;
    */
    $unwanted_array = array(    'Š'=>'S', 'š'=>'s', 'Ž'=>'Z', 'ž'=>'z', 'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E',
                            'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O', 'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ù'=>'U',
                            'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Þ'=>'B', 'ß'=>'Ss', 'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c',
                            'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ñ'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o',
                            'ö'=>'o', 'ø'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'þ'=>'b', 'ÿ'=>'y' );
    $str = strtr($name, $unwanted_array);
    return $str;
}

function clear_municipio($municipio) {
    $muni = rtrim($municipio);
    $muni = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $muni);
    return $muni;
}

function clear_ciudad($ciudad) {
    $city = rtrim($ciudad);
    $city = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $city);
    return $city;
}
/*
function calculate_cuit($dni, $sexo) {
    // Verificar que el DNI sea un número válido y que el sexo sea 'M' o 'F'
    if (!is_numeric($dni) || $dni < 1 || $dni > 99999999 || ($sexo !== 'M' && $sexo !== 'F')) {
        return false; // DNI o sexo no válidos
    }

    // Agregar un 20 o 27 al principio del DNI dependiendo del sexo
    $dniCompleto = ($sexo === 'M') ? "20-" . str_pad($dni, 8, "0", STR_PAD_LEFT) : "27-" . str_pad($dni, 8, "0", STR_PAD_LEFT);

    // Calcular el dígito verificador
    $suma = 0;
    $multiplicadores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

    for ($i = 0; $i < 10; $i++) {
        $suma += $dniCompleto[$i] * $multiplicadores[$i];
    }

    $resto = $suma % 11;
    $digitoVerificador = ($resto == 0) ? 0 : (11 - $resto);

    // Construir el CUIT completo
    $cuit = $dniCompleto . "-" . $digitoVerificador;

    return $cuit;
}


function calculate_cuit($dni, $sexo) {
    if ($sexo == "M") {
        $operador = "20";
    } else {
        $operador = "27";
    }
    
    if (strlen($dni) == 7) {
        $dni = "0" . $dni;
    }
    
    $dni_split = str_split($dni);
    $operador_split = str_split($operador);
    
    $s1 = $operador_split[0] * 5;
    $s2 = $operador_split[1] * 4;
    $s3 = $dni_split[0] * 3;
    $s4 = $dni_split[1] * 2;
    $s5 = $dni_split[2] * 7; 
    $s6 = $dni_split[3] * 6;
    $s7 = $dni_split[4] * 5;
    $s8 = $dni_split[5] * 4;
    $s9 = $dni_split[6] * 3;
    $s0 = $dni_split[7] * 2;
    
    $suma = $s1+$s2+$s3+$s4+$s5+$s6+$s7+$s8+$s9+$s0;
    $resultado = $suma % 11;
    
    if ($resultado == 0) {
        $verificador = 0;
    } elseif ($resultado == 1) {
        if ($sexo == "M") {
            $operador = 23;
            $verificador = 9;
        } else {
            $operador = 23;
            $verificador = 4;
        }
    } else {
        $verificador = 11 - $resultado;
    }
    
    $cuil = $operador . "-" . $dni . "-" . $verificador;

    return $cuil;
}

*/

function calculate_cuit($dni, $sexo) {
    if ($sexo == "M") {
        $operador = "20";
    } else {
        $operador = "27";
    }
    
    if (strlen($dni) == 7) {
        $dni = "0" . $dni;
    }
    
    $dni_split = str_split($dni);
    $operador_split = str_split($operador);
    
    $s1 = intval($operador_split[0]) * 5;
    $s2 = intval($operador_split[1]) * 4;
    $s3 = intval($dni_split[0]) * 3;
    $s4 = intval($dni_split[1]) * 2;
    $s5 = intval($dni_split[2]) * 7; 
    $s6 = intval($dni_split[3]) * 6;
    $s7 = intval($dni_split[4]) * 5;
    $s8 = intval($dni_split[5]) * 4;
    $s9 = intval($dni_split[6]) * 3;
    $s0 = intval($dni_split[7]) * 2;
    
    $suma = $s1 + $s2 + $s3 + $s4 + $s5 + $s6 + $s7 + $s8 + $s9 + $s0;
    $resultado = $suma % 11;
    
    if ($resultado == 0) {
        $verificador = 0;
    } elseif ($resultado == 1) {
        if ($sexo == "M") {
            $operador = 23;
            $verificador = 9;
        } else {
            $operador = 23;
            $verificador = 4;
        }
    } else {
        $verificador = 11 - $resultado;
    }
    
    $cuil = $operador . "-" . $dni . "-" . $verificador;

    return $cuil;
}


function calculate_age($birthdate) {
    $currentDate = date("d-m-Y");
    $age = date_diff(date_create($birthdate), date_create($currentDate));
    return $age->format("%y");
}

?>
