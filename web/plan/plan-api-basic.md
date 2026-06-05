<?php
session_start();

/*
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
*/

require("utils/functions.php");
require("utils/excluidos.php");


if (!isset($_REQUEST["criterio"]) || empty($_REQUEST["criterio"])) {
  header("Location: ./");
  return;
}

if (isset($_SESSION["email"])) {
    $credits = getCredits();
    $_SESSION["creditos"] = $credits;
}

// SQLi, xss, etc
if ($_SERVER['REQUEST_METHOD'] == "GET") {
 $criterio = substr($_REQUEST["criterio"], strpos($_REQUEST["criterio"], "/"));
 //$criterio = filter_var($criterio, FILTER_SANITIZE_STRING);
 $criterio = htmlspecialchars($criterio, ENT_QUOTES, 'UTF-8');
 $criterio = substr($criterio, 0, -4);

 $criterio_clean = str_replace("-", " ", $criterio);
} else {
 //$criterio = filter_var($_REQUEST["criterio"], FILTER_SANITIZE_STRING);
 $criterio = rtrim($_REQUEST["criterio"]);
 $criterio = htmlspecialchars($criterio, ENT_QUOTES, 'UTF-8');
 $criterio = str_replace(" ", "-", $criterio);
}

$criterio = str_replace('.', '', $criterio);

if (preg_match("/^\pL+(?>[- ']\pL+)*$/u", $criterio)) {
    $criterio_clean = str_replace("-", " ", $criterio);
    $criterio = clear_name($criterio);
    
    $words = explode('-', $criterio);
    $words = json_encode($words);
    $ch = curl_init();

    if (($_REQUEST['selected_provincia'] != '') && ($_REQUEST['selected_municipio'] == '') && ($_REQUEST['selected_ciudad'] == '')) {
        $provincia = $_REQUEST["selected_provincia"];
        $provincia = clear_provincia($provincia);

        curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_fullname_with_prov');
        curl_setopt($ch, CURLOPT_POSTFIELDS, "fullname=" . $words . "&provincia=" . $provincia);
    } else if (($_REQUEST['selected_provincia'] != '') && ($_REQUEST['selected_municipio'] != '') && ($_REQUEST['selected_ciudad'] == '')) {
        $provincia = $_REQUEST["selected_provincia"];
        $provincia = clear_provincia($provincia);

        $municipio = $_REQUEST["selected_municipio"];
        $municipio = clear_municipio($municipio);

        curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_fullname_w_prov_muni');
        curl_setopt($ch, CURLOPT_POSTFIELDS, "fullname=" . $words . "&provincia=" . $provincia . "&municipio=" . $municipio);
    } else if (($_REQUEST['selected_provincia'] != '') && ($_REQUEST['selected_municipio'] != '') && ($_REQUEST['selected_ciudad'] != '')) {
        $provincia = $_REQUEST["selected_provincia"];
        $provincia = clear_provincia($provincia);

        $municipio = $_REQUEST["selected_municipio"];
        $municipio = clear_municipio($municipio);

        $ciudad = $_REQUEST["selected_ciudad"];
        $ciudad = clear_ciudad($ciudad);
        curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_fullname_w_prov_muni_city');
        curl_setopt($ch, CURLOPT_POSTFIELDS, "fullname=" . $words . "&provincia=" . $provincia . "&municipio=" . $municipio . "&ciudad=" . $ciudad);
    } else {
        curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_fullname');
        curl_setopt($ch, CURLOPT_POSTFIELDS, "fullname=" . $words);
    }
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);

    $headers = array();
    $headers[] = 'Token: 9803f8bf19792f13a0f0e70fef24956b';
    $headers[] = 'Content-Type: application/x-www-form-urlencoded';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'Error en el servidor. Contacte con el administrador de red.';
    }
    curl_close($ch);
}

// DNI 
if (preg_match("/^\d+$/", $criterio) && (strlen($criterio) == 8 || strlen($criterio) == 7 || strlen($criterio) == 6)) {
    $criterio_clean = $criterio;
    $ch = curl_init();

    if (($_REQUEST['selected_provincia'] != '') && ($_REQUEST['selected_municipio'] == '') && ($_REQUEST['selected_ciudad'] == '')) {
        $provincia = $_REQUEST["selected_provincia"];
        $provincia = clear_provincia($provincia);
        curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_dni_with_prov');
        curl_setopt($ch, CURLOPT_POSTFIELDS, "dni=" . $criterio . "&provincia=" . $provincia);
    } else if (($_REQUEST['selected_provincia'] != '') && ($_REQUEST['selected_municipio'] != '') && ($_REQUEST['selected_ciudad'] == '')) {
        $provincia = $_REQUEST["selected_provincia"];
        $provincia = clear_provincia($provincia);

        $municipio = $_REQUEST["selected_municipio"];
        $municipio = clear_municipio($municipio);

        curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_dni_w_prov_muni');
        curl_setopt($ch, CURLOPT_POSTFIELDS, "dni=" . $criterio . "&provincia=" . $provincia . "&municipio=" . $municipio);
    } else if (($_REQUEST['selected_provincia'] != '') && ($_REQUEST['selected_municipio'] != '') && ($_REQUEST['selected_ciudad'] != '')) {
        $provincia = $_REQUEST["selected_provincia"];
        $provincia = clear_provincia($provincia);

        $municipio = $_REQUEST["selected_municipio"];
        $municipio = clear_municipio($municipio);

        $ciudad = $_REQUEST["selected_ciudad"];
        $ciudad = clear_ciudad($ciudad);
        curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_dni_w_prov_muni_city');
        curl_setopt($ch, CURLOPT_POSTFIELDS, "dni=" . $criterio . "&provincia=" . $provincia . "&municipio=" . $municipio . "&ciudad=" . $ciudad);
    } else {
        curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_dni');    
        curl_setopt($ch, CURLOPT_POSTFIELDS, "dni=" . $criterio);
    }

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);

    $headers = array();
    $headers[] = 'Token: 9803f8bf19792f13a0f0e70fef24956b';
    $headers[] = 'Content-Type: application/x-www-form-urlencoded';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'Error en el servidor. Contacte con el administrador de red.';
    }
    curl_close($ch);
}

// CUIT W -
if (preg_match("/^\d+$/", $criterio) && (strlen($criterio) == 11 || strlen($criterio) == 10)) {
    $criterio_clean = $criterio;
    $criterio = substr($criterio, 2);
    $criterio = substr($criterio, 0, -1);
    $ch = curl_init();

    if (($_REQUEST['selected_provincia'] != '') && ($_REQUEST['selected_municipio'] == '') && ($_REQUEST['selected_ciudad'] == '')) {
        $provincia = $_REQUEST["selected_provincia"];
        $provincia = clear_provincia($provincia);
        curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_dni_with_prov');
        curl_setopt($ch, CURLOPT_POSTFIELDS, "dni=" . $criterio . "&provincia=" . $provincia);
    } else if (($_REQUEST['selected_provincia'] != '') && ($_REQUEST['selected_municipio'] != '') && ($_REQUEST['selected_ciudad'] == '')) {
        $provincia = $_REQUEST["selected_provincia"];
        $provincia = clear_provincia($provincia);

        $municipio = $_REQUEST["selected_municipio"];
        $municipio = clear_municipio($municipio);

        curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_dni_w_prov_muni');
        curl_setopt($ch, CURLOPT_POSTFIELDS, "dni=" . $criterio . "&provincia=" . $provincia . "&municipio=" . $municipio);
    } else if (($_REQUEST['selected_provincia'] != '') && ($_REQUEST['selected_municipio'] != '') && ($_REQUEST['selected_ciudad'] != '')) {
        $provincia = $_REQUEST["selected_provincia"];
        $provincia = clear_provincia($provincia);

        $municipio = $_REQUEST["selected_municipio"];
        $municipio = clear_municipio($municipio);

        $ciudad = $_REQUEST["selected_ciudad"];
        $ciudad = clear_ciudad($ciudad);
        curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_dni_w_prov_muni_city');
        curl_setopt($ch, CURLOPT_POSTFIELDS, "dni=" . $criterio . "&provincia=" . $provincia . "&municipio=" . $municipio . "&ciudad=" . $ciudad);
    } else {
        curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_dni');    
        curl_setopt($ch, CURLOPT_POSTFIELDS, "dni=" . $criterio);
    }
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);

    $headers = array();
    $headers[] = 'Token: 9803f8bf19792f13a0f0e70fef24956b';
    $headers[] = 'Content-Type: application/x-www-form-urlencoded';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error en el servidor. Contacte con el administrador de red.';
    }
    curl_close($ch);
}

// CUIT - 
if (substr_count($criterio, '-') == 2 && (strlen($criterio) == 13 || strlen($criterio) == 12)) {
    $criterio = str_replace("-", "", $criterio);

    if (ctype_digit($criterio)) {
        $criterio_clean = $criterio;
        if (preg_match("/^\d+$/", $criterio)) {
        $criterio = substr($criterio, 2);
        $criterio = substr($criterio, 0, -1);
        
        $ch = curl_init();

        if (($_REQUEST['selected_provincia'] != '') && ($_REQUEST['selected_municipio'] == '') && ($_REQUEST['selected_ciudad'] == '')) {
            $provincia = $_REQUEST["selected_provincia"];
            $provincia = clear_provincia($provincia);
            curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_dni_with_prov');
            curl_setopt($ch, CURLOPT_POSTFIELDS, "dni=" . $criterio . "&provincia=" . $provincia);
        } else if (($_REQUEST['selected_provincia'] != '') && ($_REQUEST['selected_municipio'] != '') && ($_REQUEST['selected_ciudad'] == '')) {
            $provincia = $_REQUEST["selected_provincia"];
            $provincia = clear_provincia($provincia);

            $municipio = $_REQUEST["selected_municipio"];
            $municipio = clear_municipio($municipio);

            curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_dni_w_prov_muni');
            curl_setopt($ch, CURLOPT_POSTFIELDS, "dni=" . $criterio . "&provincia=" . $provincia . "&municipio=" . $municipio);
        } else if (($_REQUEST['selected_provincia'] != '') && ($_REQUEST['selected_municipio'] != '') && ($_REQUEST['selected_ciudad'] != '')) {
            $provincia = $_REQUEST["selected_provincia"];
            $provincia = clear_provincia($provincia);

            $municipio = $_REQUEST["selected_municipio"];
            $municipio = clear_municipio($municipio);

            $ciudad = $_REQUEST["selected_ciudad"];
            $ciudad = clear_ciudad($ciudad);
            curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_dni_w_prov_muni_city');
            curl_setopt($ch, CURLOPT_POSTFIELDS, "dni=" . $criterio . "&provincia=" . $provincia . "&municipio=" . $municipio . "&ciudad=" . $ciudad);
        } else {
            curl_setopt($ch, CURLOPT_URL, 'http://181.117.245.41:5000/search_by_dni');    
            curl_setopt($ch, CURLOPT_POSTFIELDS, "dni=" . $criterio);
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);

        $headers = array();
        $headers[] = 'Token: 9803f8bf19792f13a0f0e70fef24956b';
        $headers[] = 'Content-Type: application/x-www-form-urlencoded';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error en el servidor. Contacte con el administrador de red.';
        }
        curl_close($ch);
    }
    }
}

if (isset($result)) {
    if ($result == "Results not found") {
        $data = array();
        $result_men = array();
        $result_wom = array();
        $result_pagination = array();
        $count_wom = 0;
        $count_men = 0;
        
        $result_first_age = array();
        $result_second_age = array();
        $result_third_age = array();
        
        $count_firstage = 0;
        $count_secondage = 0;
        $count_thirdage = 0;
    } else {
        $data = json_decode($result, true);
        
        foreach ($data as $key => $person) {
            $cuit = calculate_cuit($person["_source"]['NRODNI'], $person["_source"]['SEXO']);
            $cuit = str_replace("-", "", $cuit);
            
            if (in_array($cuit, $excluidos)) {
                unset($data[$key]);
            }
        }
        
        $result_pagination = array_chunk($data, 10, true);
        
        $result_men = array();
        $result_wom = array();
        
        foreach($data as $person) {
            $sexo = $person["_source"]["SEXO"];
            $cuit = calculate_cuit($person["_source"]['NRODNI'], $person["_source"]['SEXO']);
            $cuit = str_replace("-", "", $cuit);
            
            if (!in_array($cuit, $excluidos)) {
                if ($sexo == "F") {
                    array_push($result_wom, $person);
                } else {
                    array_push($result_men, $person);
                }
            }
        }
        
        $count_wom = count($result_wom);
        $count_men = count($result_men);
        
        $result_wom = array_chunk($result_wom, 10, true);
        $result_men = array_chunk($result_men, 10, true);
        
        $result_first_age = array();
        $result_second_age = array();
        $result_third_age = array();
        
        foreach($data as $person) {
            $edad = calculate_age($person["_source"]['FECHANAC']);
            $cuit = calculate_cuit($person["_source"]['NRODNI'], $person["_source"]['SEXO']);
            $cuit = str_replace("-", "", $cuit);
            
            if (!in_array($cuit, $excluidos)) {
                if ($edad >= 18 && $edad <= 30) {
                    array_push($result_first_age, $person);
                } else if ($edad > 30 && $edad <= 50) {
                    array_push($result_second_age, $person);
                } else if ($edad > 50 && $edad <= 100) {
                    array_push($result_third_age, $person);
                }
            }
        }
        
        $count_firstage = count($result_first_age);
        $count_secondage = count($result_second_age);
        $count_thirdage = count($result_third_age);
        
        $result_first_age = array_chunk($result_first_age, 10, true);
        $result_second_age = array_chunk($result_second_age, 10, true);
        $result_third_age = array_chunk($result_third_age, 10, true);
    }
} else {
    $data = array();
    $result_men = array();
    $result_wom = array();
    $result_pagination = array();
    $count_wom = 0;
    $count_men = 0;
    
    $result_first_age = array();
    $result_second_age = array();
    $result_third_age = array();
    
    $count_firstage = 0;
    $count_secondage = 0;
    $count_thirdage = 0;
}

/*
if (count($data) == 0) {
    if (preg_match("/^\d+$/", $criterio) && (strlen($criterio) == 8 || strlen($criterio) == 7 || strlen($criterio) == 6)) {
        $b = buscar_info($criterio);
        $json = json_decode($b, true);
        print_r($json);
        $e = array();
        
        foreach ($json["data"] as $person) {
            $e["_source"]['NRODNI'] = $person["numero_documento"];
            $e["_source"]['SEXO'] = $person["sexo"];
            $e["_source"]['PROVINCIA'] = $person["provincia"];
            $e["_source"]['CIUDAD'] = "-";
            $e["_source"]['FECHANAC'] = date("Y-m-d", strtotime($person["fecha_nacimiento"]));
        }
        array_push($data, $e);
    }
}
*/

$provincias = ["174" => "CABA", "168" => "Buenos Aires", "169" => "Catamarca", "170" => "Chaco", "171" => "Chubut", "172" => "Córdoba", "173" => "Corrientes", "175" => "Entre Ríos", "176" => "Formosa", "177" => "Jujuy", "178" => "La Pampa", "179" => "La Rioja", "180" => "Mendoza", "181" => "Misiones", "182" => "Neuquén", "183" => "Río Negro", "184" => "Salta", "185" => "San Juan", "186" => "San Luis", "187" => "Santa Cruz", "188" => "Santa Fe", "189" => "Santiago del Estero", "190" => "Tierra del Fuego", "191" => "Tucumán"];
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DATUAR - Resultados</title>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Nice Select CSS -->
    <link rel="stylesheet" href="/css/nice-select.css">
    <link rel="icon" type="image/png" href="/favicon.png">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/stylex.css">
    <link rel="stylesheet" href="/css/responsive.css">
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <style>
        .navbar-nav li {
            line-height: 40px;
        }
    </style>
</head>
<body>
 <section class="custom-social-proof" id="getfomo" style="display:none;">
        <div class="custom-notification">
            <div class="custom-notification-container">
                <div class="custom-notification-image-wrapper">
                    <img id="rimage" style="width: 35px;margin-left: 10px;" src="">
                </div>
                <div class="custom-notification-content-wrapper">
                    <p class="custom-notification-content">
                        <span id="rperson"></span> de <strong><span id="rlocation"></span></strong> solicitó un <strong>Informe para </strong> <span id="rwords"></span>
                        <small>hace <span id="rtime"></span></small>
                    </p>
                </div>
            </div>
            <div class="custom-close"></div>
        </div>
    </section>
    <a href="https://wa.me/5491121638222?text=Hola%2C+deseo+mas+Información" class="whatsapp" target="_blank"> <i class="fa fa-whatsapp whatsapp-icon"></i></a>
    <!-- nav -->
    <div class="wrap_nav">
        <nav id="site_nav" class="navbar navbar-expand-lg bg_royal_blue">
            <div class="container-lg px-4">
                <a class="navbar-brand site_logo" href="/"><img src="/img/logo.png" alt=""></a>
                <button class="navbar-toggler px-2 py-1 border-0 shadow-none text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <div class="offcanvas offcanvas-start" id="offcanvas">
                    <div class="p-4 mb-2 d-lg-none d-flex justify-content-end">
                        <button type="button" class="border-0 shadow-none bg-transparent text-white fs-4" data-bs-dismiss="offcanvas" aria-label="Close"><i class="fa-regular fa-circle-xmark"></i></button>
                    </div>
                    <ul class="navbar-nav nav_collapse_ul nav_ul ms-auto">
                        <li class="nav-item ms-lg-3">
                            <a class="nav-link" href="/">Principal</a>
                        </li>
                        <li class="nav-item ms-lg-3">
                            <a class="nav-link" href="/nosotros">Nosotros</a>
                        </li>
                        
                        <li class="nav-item ms-lg-3">
                            <a class="nav-link" href="/paquetes">Planes</a>
                        </li>
                        
                        <li class="nav-item ms-lg-3">
                            <a class="nav-link" href="/informes">Servicios</a>
                        </li>
                        
                        <?php
                        if (!isset($_SESSION["username"])) {
                            echo '<li class="nav-item ms-lg-3">';
                            echo '<a class="nav-link" href="/login"><img height="30" class="me-2" src="/img/user-icon.png" alt=""> Iniciar Sesión</a>';
                            echo '</li>';
                        } else {
                            echo '<li class="nav-item ms-lg-3 no-click">
                            <a class="nav-link" href="#"><i style="font-size: 20px; color: #52cec4" class="fa-solid fa-coins"></i> Cr&eacute;ditos: ' . $_SESSION['creditos'] .'</a>
                            </li>';
                            echo '<li class="nav-item dropdown">';
                            echo '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">';
                            echo '<img height="30" class="me-2" src="img/user-icon.png" alt=""> ' . $_SESSION["email"] . '</a>';
                            echo '<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">';
                            echo '<li><a class="dropdown-item" href="/misinformes">Mis informes</a></li>';
                            
                            // Verificar si $_SESSION["oauth"] está seteado
                            if (!isset($_SESSION["oauth"])) {
                                echo '<li><a class="dropdown-item" href="/change_password_auth">Cambiar contrase&ntilde;a</a></li>';
                            }
                            
                            echo '<li><a class="dropdown-item" href="/logout">Cerrar sesi&oacute;n</a></li>';
                            echo '</ul>';
                            echo '</li>';
                        }
                        ?>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    
    <!-- home-banner -->
    <div class="bg_cyan d-flex">
        <div class="container-lg px-4 position-relative z-1 d-flex flex-column justify-content-end flex-grow-1">
            <form class="hero_form hero_form2 bg-transparent" action="/buscar" method="POST">
                <div class="hero_form_row">
                    <div class="box_mx buscar_box_md">
                        <input style="text-align: center; font-weight: bold;" type="text" id="criterio" class="inp_box buscar_inp" value="<?php echo $criterio_clean; ?>" name="criterio" autocomplete="off">
                        <span class="inp_placeholder">Nombre, DNI, CUIT ó CUIL...</span>
                    </div>
                    <div class="box_sm wrapper_provincias">
                        <select class="nice_select" id="provincias_select">
                            <option data-display="Provincia" selected disabled>Provincia</option>
                            <?php foreach($provincias as $key => $value) {
                                if (isset($_REQUEST["selected_provincia_i"])) {
                                    if ($key == $_REQUEST["selected_provincia_i"]) {
                                        echo "<option value='" . $key . "' selected>" . $value . "</option>";
                                    } else {
                                        echo "<option value='" . $key . "'>" . $value . "</option>";
                                    }
                                } else {
                                    echo "<option value='" . $key . "'>" . $value . "</option>";
                                }
                            }
                            ?>
                        </select>
                        <input type="hidden" id="selected_provincia" value="<?php echo $_REQUEST['selected_provincia']; ?>" name="selected_provincia">
                        <input type="hidden" id="selected_provincia_i" value="<?php echo $_REQUEST['selected_provincia_i']; ?>" name="selected_provincia_i">
                    </div>
                    <div class="box_sm wrapper_municipios">
                        <select class="nice_select" id="municipios_select">
                            <option data-display="Ciudad" disabled selected>Ciudad</option>
                            <?php
                             if(isset($_REQUEST["selected_municipio_i"])) {
                                $json = file_get_contents('data/municipios.json');
                                $json_data = json_decode($json,true);

                                foreach($json_data as $muni) {
                                    if ($muni["idpcia"] == $_REQUEST["selected_provincia_i"] && $muni["descripcion"] != "Sin informar") {
                                        if ($muni["idmuni"] == $_REQUEST["selected_municipio_i"]) {
                                            echo "<option value='" . $muni["idmuni"] . "' selected>" . $muni["descripcion"] . "</option>";
                                        } else {
                                            echo "<option value='" . $muni["idmuni"] . "'>" . $muni["descripcion"] . "</option>";
                                        }
                                    }
                                }
                             }
                            ?>
                        </select>
                        <input type="hidden" id="selected_municipio" value="<?php echo $_REQUEST['selected_municipio']; ?>" name="selected_municipio">
                        <input type="hidden" id="selected_municipio_i" value="<?php echo $_REQUEST['selected_municipio_i']; ?>" name="selected_municipio_i">
                    </div>
                    <div class="box_sm wrapper_ciudades">
                        <select class="nice_select" id="ciudades_select">
                            <option data-display="Localidad" disabled selected>Localidad</option>
                            <?php
                             if(isset($_REQUEST["selected_ciudad_i"])) {
                                $json = file_get_contents('data/ciudades.json');
                                $json_data = json_decode($json,true);

                                foreach($json_data as $city) {
                                    if ($city["idmuni"] == $_REQUEST["selected_municipio_i"]) {
                                        if ($city["descripcion"] != "Sin informar") {
                                            if ($city["idciudad"] == $_REQUEST["selected_ciudad_i"]) {
                                                echo "<option value='" . $city["idciudad"] . "' selected>" . $city["descripcion"] . "</option>";
                                            } else {
                                                echo "<option value='" . $city["idciudad"] . "'>" . $city["descripcion"] . "</option>";
                                            }
                                        }
                                    }
                                }
                             }
                            ?>
                        </select>
                        <input type="hidden" id="selected_ciudad" value="<?php echo $_REQUEST['selected_ciudad']; ?>" name="selected_ciudad">
                        <input type="hidden" id="selected_ciudad_i" value="<?php echo $_REQUEST['selected_ciudad_i']; ?>" name="selected_ciudad_i">
                    </div>
                    <div class="box_sx">
                        <button type="submit"><i class="fa-solid fa-magnifying-glass me-2"></i>BUSCAR</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="filter_after"></div>
    <section class="wrap_filter py-5">
        <div class="container-lg px-4">
            <div class="row align-items-start position-relative">
                <div class="col-12 mb-3 d-lg-none d-flex justify-content-end">
                    <button id="btn_open_filter"><i class="fa-solid fa-filter"></i> Filtros</button>
                </div>
                <div class="col-lg-4 wrap_filter_box">
                    <div class="filter_box bg-white box_shadow">
                        <div class="d-lg-none d-flex justify-content-end border-0 mb-4 px-2">
                            <button class="close_filter_modal"><i class="fa-regular fa-circle-xmark fs-3"></i></button>
                        </div>
                        <div class="filter_header py-3">
                            <p class="text-end f_gotham_book mb-2">Resultados: (<?php echo count($data); ?>)</p>
                            <div class="d-flex align-items-baseline">
                                <h5 class="fs_18 f_gotham_book me-auto">Filtros</h5>
                                <a href="#" class="btn_cyan fs_14" id="reset_filters">Borrar todo</a>
                            </div>
                        </div>
                        <div>
                            <select class="nice_select" id="filter_gender">
                                <option data-display="Género" disabled selected>Género</option>
                                <?php 
                                if ($count_men > 0) {
                                    echo '<option value="1">Hombre (' . $count_men . ')</option>';
                                } else {
                                    echo '<option value="1" disabled>Hombre (0)</option>';
                                }

                                if ($count_wom > 0) {
                                    echo '<option value="2">Mujer (' . $count_wom . ')</option>';
                                } else {
                                    echo '<option value="2" disabled>Mujer (0)</option>';;
                                }
                                ?>
                            </select>
                        </div>
                        <div>
                            <select class="nice_select" id="filter_age">
                                <option data-display="Edad" disabled selected>Edad</option>
                                <?php 
                                if ($count_firstage > 0) {
                                    echo '<option value="1">18-30 (' . $count_firstage . ')</option>';
                                } else {
                                    echo '<option value="1" disabled>18-30 (0)</option>';
                                }

                                if ($count_secondage > 0) {
                                    echo '<option value="2">30-50 (' . $count_secondage . ')</option>';
                                } else {
                                    echo '<option value="2" disabled>30-50 (0)</option>';
                                }

                                if ($count_thirdage > 0) {
                                    echo '<option value="3">50-100 (' . $count_thirdage . ')</option>';
                                } else {
                                    echo '<option value="3" disabled>50-100 (0)</option>';
                                }
                                ?>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8" id="general_results">
                    <div class="wrap_result_boxes w-100 box_shadow">
                        <?php 
                          if (count($data) == 50) {
                              echo "<center><h4>Hubo demasiados resultados. Utilice otro criterio de busqueda para acotar el resultado</h4><br></center>";
                          }

                          if (count($data) > 0) {
                            $c = 1;

                            foreach($result_pagination as $data_collection) {
                                if ($c == 1) {
                                    echo '<div id="page_' . $c . '">';
                                } else {
                                    echo '<div style="display: none" id="page_' . $c . '">';
                                }

                                $data_collection = array_reverse($data_collection);
                                foreach($data_collection as $person) {
                                    $source = $person["_source"];

                                    if ($source['PROVINCIA'] == "" || $source['PROVINCIA'] == "Sin informar") {
                                        $source['PROVINCIA'] = "No encontrado";
                                    }

                                    if ($source['CIUDAD'] == "" || $source['CIUDAD'] == "Sin informar") {
                                        $source['CIUDAD'] = "No encontrado";
                                    }

                                    echo '<div class="result_box">
                                                <div class="content">
                                <h5 class="txt_royal_blue mb-4 fs_18">' . mb_strtoupper($source['APELLIDOS'] . ', ' . $source['NOMBRES']) . '</h5>
                                <div class="flexbox d-flex fs_14">
                                    <div class="pe-5">
                                        <p class="txt_royal_blue mb-2">CUIT: <span class="f_gotham_book text-black">' . calculate_cuit($source['NRODNI'], $source['SEXO']) . '</span></p>
                                        <p class="txt_royal_blue mb-0">Edad: <span class="f_gotham_book text-black">' . calculate_age($source['FECHANAC']) . ' años</span></p>
                                    </div>
                                    <div>
                                        <p class="txt_royal_blue mb-2">Provincia: <span class="f_gotham_book text-black">' . ucwords($source['PROVINCIA']) . '</span></p>
                                        <p class="txt_royal_blue mb-0">Ciudad: <span class="f_gotham_book text-black">' . ucwords($source['CIUDAD']) . '</span></p>
                                    </div>
                                </div>
                            </div>';
                            if (!isset($_SESSION['email'])) {
                                echo '<a target="_self" href="/comprar?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">COMPRAR INFORME</a>
                        </div>';
                            } else {
                                if (isset($_SESSION['creditos']) && $_SESSION['creditos'] > 0) {
                                    echo '<a target="_self" href="/solicitar_informe?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">OBTENER INFORME</a>
                        </div>';
                                } else {
                                    echo '<a target="_self" href="/comprar?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">COMPRAR INFORME</a>
                        </div>';
                                }
                            }
                                }
                                echo '</div>';
                                $c = $c+1;
                            }
                          } else {
                              echo "<center><br><span>No se encontraron resultados o no disponibles por pedido del titular de esos datos.</span></center><br>";
                          }
                          ?>
                    </div>
                    <div class="result_action pt-3">
                        <div class="filter_pagination me-sm-4 me-3">
                            <button id="previous_page"><i class="fa-solid fa-chevron-left"></i></button>
                            <div class="pages px-sm-2">
                                <?php
                                for ($i=1; $i<=count($result_pagination); $i++) {
                                    if ($i == 1) {
                                        echo '<a href="#" id="btn_page_' . $i . '" class="active">' . $i . '</a>';
                                    } else {
                                        echo '<a href="#" id="btn_page_' . $i . '">' . $i . '</a>';
                                    }
                                }
                                ?>
                            </div>
                            <button id="next_page"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8" id="filter_wom_result" style="display: none">
                    <div class="wrap_result_boxes w-100 box_shadow">
                        <?php
                          if ($count_wom > 0) {
                            $c = 1;

                            foreach($result_wom as $data_collection) {
                                if ($c == 1) {
                                    echo '<div id="page_' . $c . '">';
                                } else {
                                    echo '<div style="display: none" id="page_' . $c . '">';
                                }

                                $data_collection = array_reverse($data_collection);
                                foreach($data_collection as $person) {
                                    $source = $person["_source"];

                                    if ($source['PROVINCIA'] == "" || $source['PROVINCIA'] == "Sin informar") {
                                        $source['PROVINCIA'] = "No encontrado";
                                    }

                                    if ($source['CIUDAD'] == "" || $source['CIUDAD'] == "Sin informar") {
                                        $source['CIUDAD'] = "No encontrado";
                                    }

                                    echo '<div class="result_box">
                                                <div class="content">
                                <h5 class="txt_royal_blue mb-4 fs_18">' . mb_strtoupper($source['APELLIDOS'] . ', ' . $source['NOMBRES']) . '</h5>
                                <div class="flexbox d-flex fs_14">
                                    <div class="pe-5">
                                        <p class="txt_royal_blue mb-2">CUIT: <span class="f_gotham_book text-black">' . calculate_cuit($source['NRODNI'], $source['SEXO']) . '</span></p>
                                        <p class="txt_royal_blue mb-0">Edad: <span class="f_gotham_book text-black">' . calculate_age($source['FECHANAC']) . ' años</span></p>
                                    </div>
                                    <div>
                                        <p class="txt_royal_blue mb-2">Provincia: <span class="f_gotham_book text-black">' . ucwords($source['PROVINCIA']) . '</span></p>
                                        <p class="txt_royal_blue mb-0">Ciudad: <span class="f_gotham_book text-black">' . ucwords($source['CIUDAD']) . '</span></p>
                                    </div>
                                </div>
                            </div>';
                            if (!isset($_SESSION['email'])) {
                                echo '<a target="_self" href="/comprar?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">COMPRAR INFORME</a>
                        </div>';
                            } else {
                                if (isset($_SESSION['creditos']) && $_SESSION['creditos'] > 0) {
                                    echo '<a target="_self" href="/solicitar_informe?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">OBTENER INFORME</a>
                        </div>';
                                } else {
                                    echo '<a target="_self" href="/comprar?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">COMPRAR INFORME</a>
                        </div>';
                                }
                            }
                                }
                                echo '</div>';
                                $c = $c+1;
                            }
                          } else {
                              echo "<center><br><span>No se encontraron resultados o no disponibles por pedido del titular de esos datos.</span></center><br>";
                          }
                          ?>
                    </div>
                    <div class="result_action pt-3">
                        <div class="filter_pagination me-sm-4 me-3">
                            <button id="previous_page"><i class="fa-solid fa-chevron-left"></i></button>
                            <div class="pages px-sm-2">
                                <?php
                                for ($i=1; $i<=count($result_wom); $i++) {
                                    if ($i == 1) {
                                        echo '<a href="#" id="btn_page_' . $i . '" class="active">' . $i . '</a>';
                                    } else {
                                        echo '<a href="#" id="btn_page_' . $i . '">' . $i . '</a>';
                                    }
                                }
                                ?>
                            </div>
                            <button id="next_page"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8" id="filter_men_result" style="display: none">
                    <div class="wrap_result_boxes w-100 box_shadow">
                        <?php
                          if ($count_men > 0) {
                            $c = 1;

                            foreach($result_men as $data_collection) {
                                if ($c == 1) {
                                    echo '<div id="page_' . $c . '">';
                                } else {
                                    echo '<div style="display: none" id="page_' . $c . '">';
                                }

                                $data_collection = array_reverse($data_collection);
                                foreach($data_collection as $person) {
                                    $source = $person["_source"];

                                    if ($source['PROVINCIA'] == "" || $source['PROVINCIA'] == "Sin informar") {
                                        $source['PROVINCIA'] = "No encontrado";
                                    }

                                    if ($source['CIUDAD'] == "" || $source['CIUDAD'] == "Sin informar") {
                                        $source['CIUDAD'] = "No encontrado";
                                    }

                                    echo '<div class="result_box">
                                                <div class="content">
                                <h5 class="txt_royal_blue mb-4 fs_18">' . mb_strtoupper($source['APELLIDOS'] . ', ' . $source['NOMBRES']) . '</h5>
                                <div class="flexbox d-flex fs_14">
                                    <div class="pe-5">
                                        <p class="txt_royal_blue mb-2">CUIT: <span class="f_gotham_book text-black">' . calculate_cuit($source['NRODNI'], $source['SEXO']) . '</span></p>
                                        <p class="txt_royal_blue mb-0">Edad: <span class="f_gotham_book text-black">' . calculate_age($source['FECHANAC']) . ' años</span></p>
                                    </div>
                                    <div>
                                        <p class="txt_royal_blue mb-2">Provincia: <span class="f_gotham_book text-black">' . ucwords($source['PROVINCIA']) . '</span></p>
                                        <p class="txt_royal_blue mb-0">Ciudad: <span class="f_gotham_book text-black">' . ucwords($source['CIUDAD']) . '</span></p>
                                    </div>
                                </div>
                            </div>';
                            if (!isset($_SESSION['email'])) {
                                echo '<a target="_self" href="/comprar?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">COMPRAR INFORME</a>
                        </div>';
                            } else {
                                if (isset($_SESSION['creditos']) && $_SESSION['creditos'] > 0) {
                                    echo '<a target="_self" href="/solicitar_informe?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">OBTENER INFORME</a>
                        </div>';
                                } else {
                                    echo '<a target="_self" href="/comprar?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">COMPRAR INFORME</a>
                        </div>';
                                }
                            }
                                }
                                echo '</div>';
                                $c = $c+1;
                            }
                          } else {
                              echo "<center><br><span>No se encontraron resultados o no disponibles por pedido del titular de esos datos.</span></center><br>";
                          }
                          ?>
                    </div>
                    <div class="result_action pt-3">
                        <div class="filter_pagination me-sm-4 me-3">
                            <button id="previous_page"><i class="fa-solid fa-chevron-left"></i></button>
                            <div class="pages px-sm-2">
                                <?php
                                for ($i=1; $i<=count($result_men); $i++) {
                                    if ($i == 1) {
                                        echo '<a href="#" id="btn_page_' . $i . '" class="active">' . $i . '</a>';
                                    } else {
                                        echo '<a href="#" id="btn_page_' . $i . '">' . $i . '</a>';
                                    }
                                }
                                ?>
                            </div>
                            <button id="next_page"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8" id="filter_firstage_result" style="display: none">
                    <div class="wrap_result_boxes w-100 box_shadow">
                        <?php
                          if ($count_firstage > 0) {
                            $c = 1;

                            foreach($result_first_age as $data_collection) {
                                if ($c == 1) {
                                    echo '<div id="page_' . $c . '">';
                                } else {
                                    echo '<div style="display: none" id="page_' . $c . '">';
                                }

                                $data_collection = array_reverse($data_collection);
                                foreach($data_collection as $person) {
                                    $source = $person["_source"];

                                    if ($source['PROVINCIA'] == "" || $source['PROVINCIA'] == "Sin informar") {
                                        $source['PROVINCIA'] = "No encontrado";
                                    }

                                    if ($source['CIUDAD'] == "" || $source['CIUDAD'] == "Sin informar") {
                                        $source['CIUDAD'] = "No encontrado";
                                    }

                                    echo '<div class="result_box">
                                                <div class="content">
                                <h5 class="txt_royal_blue mb-4 fs_18">' . mb_strtoupper($source['APELLIDOS'] . ', ' . $source['NOMBRES']) . '</h5>
                                <div class="flexbox d-flex fs_14">
                                    <div class="pe-5">
                                        <p class="txt_royal_blue mb-2">CUIT: <span class="f_gotham_book text-black">' . calculate_cuit($source['NRODNI'], $source['SEXO']) . '</span></p>
                                        <p class="txt_royal_blue mb-0">Edad: <span class="f_gotham_book text-black">' . calculate_age($source['FECHANAC']) . ' años</span></p>
                                    </div>
                                    <div>
                                        <p class="txt_royal_blue mb-2">Provincia: <span class="f_gotham_book text-black">' . ucwords($source['PROVINCIA']) . '</span></p>
                                        <p class="txt_royal_blue mb-0">Ciudad: <span class="f_gotham_book text-black">' . ucwords($source['CIUDAD']) . '</span></p>
                                    </div>
                                </div>
                            </div>';
                            if (!isset($_SESSION['email'])) {
                                echo '<a target="_self" href="/comprar?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">COMPRAR INFORME</a>
                        </div>';
                            } else {
                                if (isset($_SESSION['creditos']) && $_SESSION['creditos'] > 0) {
                                    echo '<a target="_self" href="/solicitar_informe?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">OBTENER INFORME</a>
                        </div>';
                                } else {
                                    echo '<a target="_self" href="/comprar?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">COMPRAR INFORME</a>
                        </div>';
                                }
                            }
                                }
                                echo '</div>';
                                $c = $c+1;
                            }
                          } else {
                              echo "<center><br><span>No se encontraron resultados o no disponibles por pedido del titular de esos datos.</span></center><br>";
                          }
                          ?>
                    </div>
                    <div class="result_action pt-3">
                        <div class="filter_pagination me-sm-4 me-3">
                            <button id="previous_page"><i class="fa-solid fa-chevron-left"></i></button>
                            <div class="pages px-sm-2">
                                <?php
                                for ($i=1; $i<=count($result_first_age); $i++) {
                                    if ($i == 1) {
                                        echo '<a href="#" id="btn_page_' . $i . '" class="active">' . $i . '</a>';
                                    } else {
                                        echo '<a href="#" id="btn_page_' . $i . '">' . $i . '</a>';
                                    }
                                }
                                ?>
                            </div>
                            <button id="next_page"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8" id="filter_secondage_result" style="display: none">
                    <div class="wrap_result_boxes w-100 box_shadow">
                        <?php
                          if ($count_secondage > 0) {
                            $c = 1;

                            foreach($result_second_age as $data_collection) {
                                if ($c == 1) {
                                    echo '<div id="page_' . $c . '">';
                                } else {
                                    echo '<div style="display: none" id="page_' . $c . '">';
                                }

                                $data_collection = array_reverse($data_collection);
                                foreach($data_collection as $person) {
                                    $source = $person["_source"];

                                    if ($source['PROVINCIA'] == "" || $source['PROVINCIA'] == "Sin informar") {
                                        $source['PROVINCIA'] = "No encontrado";
                                    }

                                    if ($source['CIUDAD'] == "" || $source['CIUDAD'] == "Sin informar") {
                                        $source['CIUDAD'] = "No encontrado";
                                    }

                                    echo '<div class="result_box">
                                                <div class="content">
                                <h5 class="txt_royal_blue mb-4 fs_18">' . mb_strtoupper($source['APELLIDOS'] . ', ' . $source['NOMBRES']) . '</h5>
                                <div class="flexbox d-flex fs_14">
                                    <div class="pe-5">
                                        <p class="txt_royal_blue mb-2">CUIT: <span class="f_gotham_book text-black">' . calculate_cuit($source['NRODNI'], $source['SEXO']) . '</span></p>
                                        <p class="txt_royal_blue mb-0">Edad: <span class="f_gotham_book text-black">' . calculate_age($source['FECHANAC']) . ' años</span></p>
                                    </div>
                                    <div>
                                        <p class="txt_royal_blue mb-2">Provincia: <span class="f_gotham_book text-black">' . ucwords($source['PROVINCIA']) . '</span></p>
                                        <p class="txt_royal_blue mb-0">Ciudad: <span class="f_gotham_book text-black">' . ucwords($source['CIUDAD']) . '</span></p>
                                    </div>
                                </div>
                            </div>';
                            if (!isset($_SESSION['email'])) {
                                echo '<a target="_self" href="/comprar?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">COMPRAR INFORME</a>
                        </div>';
                            } else {
                                if (isset($_SESSION['creditos']) && $_SESSION['creditos'] > 0) {
                                    echo '<a target="_self" href="/solicitar_informe?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">OBTENER INFORME</a>
                        </div>';
                                } else {
                                    echo '<a target="_self" href="/comprar?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">COMPRAR INFORME</a>
                        </div>';
                                }
                            }
                                }
                                echo '</div>';
                                $c = $c+1;
                            }
                          } else {
                              echo "<center><br><span>No se encontraron resultados o no disponibles por pedido del titular de esos datos.</span></center><br>";
                          }
                          ?>
                    </div>
                    <div class="result_action pt-3">
                        <div class="filter_pagination me-sm-4 me-3">
                            <button id="previous_page"><i class="fa-solid fa-chevron-left"></i></button>
                            <div class="pages px-sm-2">
                                <?php
                                for ($i=1; $i<=count($result_second_age); $i++) {
                                    if ($i == 1) {
                                        echo '<a href="#" id="btn_page_' . $i . '" class="active">' . $i . '</a>';
                                    } else {
                                        echo '<a href="#" id="btn_page_' . $i . '">' . $i . '</a>';
                                    }
                                }
                                ?>
                            </div>
                            <button id="next_page"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8" id="filter_thirdage_result" style="display: none">
                    <div class="wrap_result_boxes w-100 box_shadow">
                        <?php
                          if ($count_thirdage > 0) {
                            $c = 1;

                            foreach($result_third_age as $data_collection) {
                                if ($c == 1) {
                                    echo '<div id="page_' . $c . '">';
                                } else {
                                    echo '<div style="display: none" id="page_' . $c . '">';
                                }

                                $data_collection = array_reverse($data_collection);
                                foreach($data_collection as $person) {
                                    $source = $person["_source"];

                                    if ($source['PROVINCIA'] == "" || $source['PROVINCIA'] == "Sin informar") {
                                        $source['PROVINCIA'] = "No encontrado";
                                    }

                                    if ($source['CIUDAD'] == "" || $source['CIUDAD'] == "Sin informar") {
                                        $source['CIUDAD'] = "No encontrado";
                                    }

                                    echo '<div class="result_box">
                                                <div class="content">
                                <h5 class="txt_royal_blue mb-4 fs_18">' . mb_strtoupper($source['APELLIDOS'] . ', ' . $source['NOMBRES']) . '</h5>
                                <div class="flexbox d-flex fs_14">
                                    <div class="pe-5">
                                        <p class="txt_royal_blue mb-2">CUIT: <span class="f_gotham_book text-black">' . calculate_cuit($source['NRODNI'], $source['SEXO']) . '</span></p>
                                        <p class="txt_royal_blue mb-0">Edad: <span class="f_gotham_book text-black">' . calculate_age($source['FECHANAC']) . ' años</span></p>
                                    </div>
                                    <div>
                                        <p class="txt_royal_blue mb-2">Provincia: <span class="f_gotham_book text-black">' . ucwords($source['PROVINCIA']) . '</span></p>
                                        <p class="txt_royal_blue mb-0">Ciudad: <span class="f_gotham_book text-black">' . ucwords($source['CIUDAD']) . '</span></p>
                                    </div>
                                </div>
                            </div>';
                            if (!isset($_SESSION['email'])) {
                                echo '<a target="_self" href="/comprar?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">COMPRAR INFORME</a>
                        </div>';
                            } else {
                                if (isset($_SESSION['creditos']) && $_SESSION['creditos'] > 0) {
                                    echo '<a target="_self" href="/solicitar_informe?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">OBTENER INFORME</a>
                        </div>';
                                } else {
                                    echo '<a target="_self" href="/comprar?i=' . encode_data(calculate_cuit($source['NRODNI'], $source['SEXO']), $source['NOMBRES'], $source['APELLIDOS'], calculate_age($source['FECHANAC']), ucwords($source['PROVINCIA']), ucwords($source['CIUDAD']), $source['SEXO']) . '" class="box_btn">COMPRAR INFORME</a>
                        </div>';
                                }
                            }
                                }
                                echo '</div>';
                                $c = $c+1;
                            }
                          } else {
                              echo "<center><br><span>No se encontraron resultados o no disponibles por pedido del titular de esos datos.</span></center><br>";
                          }
                          ?>
                    </div>
                    <div class="result_action pt-3">
                        <div class="filter_pagination me-sm-4 me-3">
                            <button id="previous_page"><i class="fa-solid fa-chevron-left"></i></button>
                            <div class="pages px-sm-2">
                                <?php
                                for ($i=1; $i<=count($result_third_age); $i++) {
                                    if ($i == 1) {
                                        echo '<a href="#" id="btn_page_' . $i . '" class="active">' . $i . '</a>';
                                    } else {
                                        echo '<a href="#" id="btn_page_' . $i . '">' . $i . '</a>';
                                    }
                                }
                                ?>
                            </div>
                            <button id="next_page"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg_navyblue pt-2">
        <div class="container-lg px-4 py-5">
            <div class="row justify-content-lg-between">
                <div class="col-lg-3 col-md-7 mb-lg-0 mb-5">
                    <div class="text-white f_openSans">
                        <img src="/img/footer-logo.svg" class="col-md-9 col-7 mb-md-5 mb-4 footer_logo" alt="">
                        <p class="fst-italic opacity-75 mb-4">Conoce antes de decidir, te proporcionamos los informes más completos del mercado. </p><p>Información precisa, decisiones acertadas.</p>
                        <div class="fs_14">
                            <a href="/terminos" class="footer_link">Términos y Condiciones</a><br><br>
                            <a href="/politicas_privacidad" class="footer_link">Políticas de privacidad</a><br><br>
                            <a href="/formularios" class="footer_link">Solicitar acceso, rectificación o cancelación de mis datos</a>
                        </div><br>
                        <a href="http://qr.afip.gob.ar/?qr=84LvSewM8PhUUoxWv5GZMQ,," target="_blank">
                      <img src="/img/qr.png" alt="QR Code" width="120" height="120">
                        </a>
                    </div>
                </div>
                <div class="col-12 d-lg-none d-block"></div>
                <div class="col-lg-3 col-md-5 mb-md-0 mb-5">
                    <div class="text-white">
                        <h5 class="mb-4 fs_18">Contacto</h5>
                        <ul class="footer_list fs_14">
                            <li class="list"><span class="circle"></span> <a href="#" class="list_footer_link">Enfermera Clermont 170, Cordoba, Argentina C.P 5000</a></li>
                            <li class="list"><span class="circle"></span> <a href="#" class="list_footer_link">+54 9 1150145675</a></li>
                            <li class="list"><span class="circle"></span> <a href="#" class="list_footer_link">informes@datuar.com.ar</a></li>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.306110516109!2d-64.2114868!3d-31.4056912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94329890c2bea607%3A0x568e2999b0677a18!2sEnfermera%20Clermont%20170%2C%20X5000%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1700248745159!5m2!1ses!2sar" width="300" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </ul>
                    </div>
                </div>
                <div class="col-12 d-md-none d-block"></div>
                <div class="col-lg-4 col-md-5 col-sm-7 mb-md-0 mb-5">
                    <div class="text-white">
                              <h5 class="mb-4 fs_18">Nuestras Redes</h5>
                        <ul class="footer_list mb-5">
                            <a target="_blank" href="https://www.instagram.com/datuaroficial/" class="footer_icon"><i class="fa-brands fa-instagram"></i></a>
                            <a target="_blank" href="https://wa.me/5491121638222?text=Hola%2C+deseo+obtener+ayuda" class="footer_icon"><i class="fa-brands fa-whatsapp"></i></a>
                        </ul>
                        <h5 class="mb-4 fs_18">¡Suscribite!</h5>
                        <form class="footer_form f_openSans">
                                <input type="text" placeholder="Ingresa tu email...">
                                <button>ACEPTAR</button>
                        </form>
                        <div class="response"></div>
                    </div>
                </div>
            </div>
        
        </div>
    </footer>

    <!-- jQuery -->
    <script src="/js/jquery.js"></script> 
    <!-- Nice Select JS -->
    <script src="/js/jquery.nice-select.min.js"></script>
    <!-- Swiper JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <!-- App JS -->
    <script src="/js/app.js"></script>
               <!-- Script JS -->
    <script src="/js/script.js"></script>
    <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "igbim9n83c");
    </script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-D9156E6S85"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-D9156E6S85');
</script>
   <script>
    console.log('Fomo', '1')
    console.log('mob', '')
</script>
<script data-cfasync="false" src="email.js"></script><script type="text/javascript">
    setInterval(function () {

        if (document.getElementById('getfomo').offsetTop === 0) {
            $.ajax({
                type: "GET",
                url: "/mensajes",
                success: function(result) {
                    var res = result.split(",");
                    var person = res[0];
                    var location = res[1];
                    var word = res[2];
                    var time = res[3];
                    var rimage = res[4];

                    document.getElementById('rperson').innerHTML = person;
                    document.getElementById('rlocation').innerHTML = location;
                    document.getElementById('rwords').innerHTML = word;
                    document.getElementById('rtime').innerHTML = time;
                    document.getElementById("rimage").src="/purchase"+rimage+".png";

                    $(".custom-social-proof").stop().slideToggle('slow');

                },
                error: function(result) {
                }

            });
        }else {
            $(".custom-social-proof").stop().slideToggle('slow');
        }

    }, 6000);
    $(".custom-close").click(function () {
        $(".custom-social-proof").stop().slideToggle('slow');
    });
</script> 
</body>
</html>