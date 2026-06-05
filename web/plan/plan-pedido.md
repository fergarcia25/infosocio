

$showSelector = false;
$dniVirgen = $_POST['criterio'];
$denis = preg_replace('/[^0-9]/', '', $dniVirgen);

// 2️⃣ Consultamos RENAPER
$Renaper = RiesgoOnline($denis);
// $Renaper recibe: Array ( [Cuil] => [Nombre] => [Otros] => Array ( [0] => Array ( [Cuits] => 27361451444 [Nombres] => TORRES OLIVA FLORENCIA ELIZABETH ) [1] => Array ( [Cuits] => 24361451445 [Nombres] => TOLEDO, MARIA FLORENCIA ) ) )

if (empty($Renaper["Cuil"]) && empty($Renaper["Nombre"]) && !empty($Renaper["Otros"])) {
    

    if (isset($_POST['seleccion'])) {
        $index = $_POST['seleccion'];
        
        // Aquí seguís con tu lógica normal...
        // imprimir ficha, guardar en BD, lo que quieras
    }else{
    ?>


        <section class="body-seleccion">
            <div class="align-content-center h-100 p-5">
                
            <div class="seleccion">
                    
                <h3 class="txt_royal_blue f_openSans fw-light text-center">Encontramos más de una persona, seleccione la correcta:</h3>
                <form class="form-control border-0" id="formSeleccion" method="POST" action="pedido.php">
                    <?php foreach ($Renaper["Otros"] as $index => $persona): ?>
                        <div class="d-flex align-items-center mb-3">
                            
                            <label class="d-flex f_openSans  fw-medium  align-items-center w-100 p-3 border rounded-3" style="cursor: pointer;">
                                <input class="me-3" type="radio" name="seleccion" value="<?php echo $index; ?>">    
                                <?php echo $persona['Nombres'] . " <br> CUIL: " . $persona['Cuits']; ?>
                            </label>
                        </div>
                    <?php endforeach; ?>

                    <input type="hidden" name="criterio" value="<?php echo $dniVirgen; ?>">
                    <button class="btn_royal_blue my-3 px-5 py-3 btn-lg" type="submit">Continuar</button>
                </form>
            </div>
            
        </div>
    <?php 
    exit();
    }
       
    $dataOtros = $Renaper["Otros"][$index];

    $cuil = $dataOtros['Cuits'];
    $numeroCuit = $dataOtros['Cuits'];
    $Nombre = $dataOtros['Nombres'];
}else{
    $cuil = $Renaper["Cuil"];
    //echo "Continuar con el flujo normal si se encontraron datos";
}

function determinarSexoPorCuil($cuil) {
    // Validar que el CUIL tenga 11 caracteres
    if (strlen($cuil) != 11) {
        return "CUIL inválido. Debe tener 11 dígitos.";
    }

    // Obtener los primeros dos dígitos del CUIL
    $prefix = substr($cuil, 0, 2);

    // Determinar el sexo según el prefijo
    switch ($prefix) {
        case '20':
            return "M";
        case '27':
            return "F";
        case '23':
            return "X";
        default:
            return "N";
    }
}

$sexo = determinarSexoPorCuil($cuil);

if ($sexo == "M") {
    $seximg = '<img src="img/h.jpg" alt="Hombre" class="rounded-3 w-100">';
    $sextext = "Hombre";
    
} elseif ($sexo == "F") {
    $seximg = '<img src="img/m.jpg" alt="Mujer" class="rounded-3 w-100">';
    $sextext = "Mujer";
    
} else {
    $seximg = '<img src="img/x.jpg" alt="Otro" class="rounded-3 w-100">';
    $sexo = "X";
    $sextext = "Otro";
}

// 5️⃣ Unificamos ambas respuestas
$infoFinal = [
    'cuil'       => $Renaper['Cuil'] ?? $cuil ?? '',
    'nombre'     => $Renaper['Nombre'] ?? $Nombre ?? '',
    'cuit'       => $Renaper['NroCUIT'] ?? $cuil ?? '',
    'sexo'       => $sexo ?? 'N',
    'importe'    => PRECIO_INFORME,
    'preference' => null,
    'status'     => 'I',
];
