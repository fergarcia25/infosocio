<?php 
$title='Datuar';
$page='planilla';

if(!empty($_POST["url"])){
  $url = $_POST["url"];
  $response = file_get_contents($url);
}
elseif(!empty($_FILES["fileTest"]["tmp_name"])){
  $url = $_FILES["fileTest"]["tmp_name"];
  $response = file_get_contents($url); 
}
elseif(!empty($_POST["dataField"])){
  $response = $_POST["dataField"];
}
else{
  $url = './json/data.txt';
  $response = file_get_contents($url); 
}
$data_json = json_decode($response,true);
$data = $data_json['data'];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="Planilla informativa datuar" />
    <meta name="keywords" content="Datuar"/>
    <meta name="author" content="http://www.estudiochento.com.ar" />
    <title><?php echo $title?></title>
    <link rel="icon" type="image/x-icon" href="assets/img/favicon.png" />
    <!-- https://material.io/resources/icons/?style=baseline -->
     

    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="assets/css/styles.css" rel="stylesheet" /> 
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500|Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp">

</head>
<body>

<header>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg" id="mainNav">
        <div class="container">
            <div class="navbar-brand">
                <a href="planilla.php">
                    <img class="logo" src="assets/img/logo-header.png" alt="Datuar">
                </a>
            </div>
        </div>
    </nav>
</header>

<section class="panel-section planilla-section mx-auto">
  <div class="container">
    <div class="block-header">
      <div class="row">
        <div class="col-8 d-flex pt-1">
          <!--<img src="assets/img/icon/icon-user.png" alt="Datuar" height="26px">-->
          <i class="material-icons custom-icons">person</i>
          <h1 class="px-2"><?php echo $data['datosParticulares']['apellido']; ?>, <?php echo $data['datosParticulares']['nombre']; ?></h1>  
        </div>
        <div class="col-4 pb-2">
          <p class="text-sm">FECHA: <span class="fw-bold"><?php echo date("d/m/Y");; ?></span> - INFORME N°: <span class="fw-bold">37028659</span>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-8 grid-margin stretch-card">
        <div class="card mt-3">
        
          <div class="card-body">
            <div class="title-section">
              <i class="material-icons custom-icons">assignment</i>
              <h1>Datos Personales</h1>
            </div>
            <div class="card-list block-2-columns">
              <ul>
                <li>
                  <span>• Nombre:</span>
                  <?php echo $data['datosParticulares']['nombre']; ?>
                </li>
                <li>
                  <span>• Apellido:</span>
                  <?php echo $data['datosParticulares']['apellido']; ?>
                </li>
                <li>
                  <span>• Cuit / Cuil:</span>
                  <?php echo $data['datosParticulares']['cuil']; ?>
                </li>
                <li>
                  <span>• Versión DNI:</span>
                  <?php echo $data['datosParticulares']['tipo']; ?>
                </li>
                <li>
                  <span>• N° DNI:</span>
                  <?php echo $data['datosParticulares']['dni']; ?>
                </li>
                <li>
                  <span>• Nacionalidad:</span>
                  <?php echo $data['datosParticulares']['nacionalidad']; ?>
                </li>
                <li>
                  <span> • Nacimiento:</span>
                  <?php echo substr($data['datosParticulares']['fechaNacimiento'], 0, 10); ?>
                </li>
                <li>
                  <span>• Defunción:</span>
                  <?php 
                  if(!empty($data['datosParticulares']['fechaDeceso'])) 
                    echo substr($data['datosParticulares']['fechaDeceso'], 0, 10); 
                  else 
                    echo "-"; 
                  ?>
                </li>
                <li>
                  <span> • Edad:</span>
                  <?php echo $data['datosParticulares']['edad']; ?>
                </li>
                <li>
                  <span>• Sexo:</span>
                  <?php echo $data['datosParticulares']['sexo']; ?>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="col-4 grid-margin stretch-card">
        
        <div class="card mt-3">
          <div class="card-body">
            <div class="title-section">
                <i class="material-icons custom-icons">hotel_class</i>
                <h1>Scoring</h1>
              </div>
                <div class="d-flex m-auto w-100 mt-3">
                  <div class="gauge">
                    <div class="needle" id="needle"></div>
                    <div class="score" id="score">0</div>
                  </div>
                </div>
              
          </div>
        </div>
        
      </div>

      
      <div class="col-12 grid-margin stretch-card">
        <div class="card mt-3">
          <div class="card-body">
              <div class="card-item">
                <p class="m-0">
                El scoring describe en una escala de 1 a 999, su probabilidad de pagar a término o tener atrasos en sus obligaciones de pago asumidas, 
                estando vinculado con su historial crediticio y su conducta de pagos.<br>
                </p>
              </div>
          </div>
        </div>
      </div>



      <div class="col-12 grid-margin stretch-card my-3">
        <div class="card">
          <div class="card-body">
            <div class="title-section">
              <i class="material-icons custom-icons">home</i>
              <h1>Domicilio Particular</h1>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  
                  <tr>
                    <th>Ubicación</th>
                    <th>Codigo Postal</th>
                    <th>Localidad</th>
                    <th>Provincia</th>
                  </tr>
                <thead>
                <tbody>
                  <tr>
                    <td><?php echo $data['datosParticulares']['domicilio']; ?></td>
                    <td><?php echo $data['datosParticulares']['cp']; ?></td>
                    <td><?php echo $data['datosParticulares']['localidad']; ?></td>
                    <td><?php echo $data['datosParticulares']['provincia']; ?></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="title-section pt-3">
              <i class="material-icons custom-icons">home</i>
              <h1>Otros Domicilios</h1>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Ubicación</th>
                    <th>Codigo Postal</th>
                    <th>Localidad</th>
                    <th>Provincia</th>
                  </tr>
                <thead>
                <tbody>
                <?php foreach($data['datosParticulares']['domAlternativos']['datos'] as $value => $array) { ?>
                  <tr>
                    <td><?php echo $array['domicilioAlt']; ?></td>
                    <td><?php echo $array['cpAlt']; ?></td>
                    <td><?php echo $array['localidadAlt']; ?></td>
                    <td><?php echo $array['provinciaAlt']; ?></td>
                  </tr>
                <?php } ?> 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


      <div class="col-12 grid-margin stretch-card my-3">
        <div class="card">
          <div class="card-body">
            <div class="title-section">
            <i class="material-icons custom-icons">phone</i>
            <h1>Teléfonos principales</h1></div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Número de teléfono</th>
                    <th>Prestador original</th>
                    <th>Localidad</th>
                  </tr>
                <thead>
                <tbody>
                  <?php foreach($data['telefonos']['datos'] as $value => $array) { ?>
                  <tr>
                    <td><?php echo $array['area']; ?> <?php echo $array['nro']; ?></td>
                    <td><?php echo $array['operador']; ?></td>
                    <td><?php echo $array['localidad']; ?></td>
                  </tr>
                  <?php } ?>
                </tbody>
              </table>
            </div>

            <div class="title-section pt-3">
              <i class="material-icons custom-icons">phone</i>
              <h1>Teléfonos celulares</h1>
            </div>
            <div class="table-responsive">
             <table class="table">
                <thead>
                  <tr>
                    <th>Número de celular</th>
                    <th>Prestador original</th>
                    <th>Localidad</th>
                  </tr>
                <thead>
                <tbody>
                  <?php foreach($data['telefonosCelulares']['datos'] as $value => $array) { ?>
                  <tr>
                    <td><?php echo $array['area']; ?> <?php echo $array['nro']; ?></td>
                    <td><?php echo $array['operador']; ?></td>
                    <td><?php echo $array['localidad']; ?></td>
                  </tr>
                  <?php } ?>
                </tbody>
              </table>
            </div>
<!--
            <div class="title-section pt-3">
              <i class="material-icons custom-icons">phone</i>
              <h1>Teléfonos adicionales</h1>
            </div>
            <div class="table-responsive">
             <table class="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>CUIL/CUIT</th>
                    <th>Número de teléfono</th>
                    <th>Tipo de línea</th>
                    <th>Localidad</th>
                  </tr>
                <thead>
                <tbody>
                  <tr>
                    <td>Juan Cruz Lopez</td>
                    <td>2938456129</td>
                    <td>03816712423</td>
                    <td>Celular</td>
                    <td>SAN MIGUEL DE TUCUMAN</td>
                  </tr>
                </tbody>
              </table>
            </div>
                  -->

            <div class="title-section pt-3">
              <i class="material-icons custom-icons">email</i>
              <h1>Emails</h1>
            </div>
            <div class="table-responsive">
             <table class="table">
                <thead>
                  <tr>
                    <th>Cuit</th>
                    <th>DNI</th>
                    <th>Email</th>
                  </tr>
                <thead>
                <tbody>
                  <?php foreach($data['datosParticulares']['mails']['datos'] as $value => $array) { ?>
                  <tr>
                    <td><?php echo $array['cuil']; ?></td>
                    <td><?php echo $array['dni']; ?></td>
                    <td><?php echo $array['email']; ?></td>
                  </tr>
                  <?php } ?>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


      <div class="col-12 grid-margin stretch-card mt-3">
        <div class="card">
          <div class="card-body">
            <div class="title-section">
              <i class="material-icons custom-icons">diversity_3</i>
              <h1>Vinculos / Familiares</h1>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cuil</th>
                    <th>Nacimiento</th>
                    <th>Relación</th>
                    <th>Sexo</th>
                    <th>edad</th>
                  </tr>
                <thead>
                <tbody>
                  <?php foreach($data['vinculos']['vinculos']['datos'] as $value => $array) { ?>
                  <tr>
                    <td><?php echo( $array['nombre']); ?></td>
                    <td><?php echo( $array['cuilVinculo']); ?></td>
                    <td><?php echo substr($array['fechaNacimiento'], 0, 10);?></td>
                    <td><?php echo( $array['relacion']); ?></td>
                    <td><?php echo( $array['sexo']); ?></td>
                    <td><?php echo( $array['edad']); ?></td>
                  </tr>
                  <?php } ?>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

     
      <div class="col-12 grid-margin stretch-card mt-4">
        <div class="card">
          <div class="card-body">
            <div class="title-section">
              <i class="material-icons custom-icons">work_history</i>
              <h1>Historial Laboral</h1>
            </div>
            <div class="table-responsive">
              <table class="table">
                  <thead>
                  <tr>
                      <th>Estado</th>
                      <th>CUIT</th>
                      <th>Razón Social</th>
                      <th>Nivel de ingreso</th>
                  </tr>
                  </thead>
                  <tbody>
                  <?php foreach($data['datosLaborales']['datoLaboral']['datos'] as $value) { 
                    $arrayR = $value['relacionDependencia'];
                    $arrayH = $value['historialSueldo']['infoAdicionalEmpleador'];
                    
                    ?>
                    <tr>
                      <td><?php echo( $arrayR['estado']); ?></td>
                      <td><?php echo( $arrayR['cuit']); ?></td>
                      <td><?php echo( $arrayR['razonSocial']); ?></td>
                      <td><?php echo( $arrayR['sueldo']); ?></td>
                    </tr>
                  
                    <tr>
                      <td class="table-responsive bg-light-cell border-0 px-2 rounded-bottom" colspan="5">
                        <table class="table table-smaller rounded-bottom">
                          <thead>
                            <tr>
                              <th>Actividad</th>
                              <th>Cant.&nbsp;empleados</th>
                            </tr>
                          <thead>
                          <tbody>
                            <tr>
                              <td class="small"><?php echo( $arrayH['actividadempleador']); ?></td>
                              <td><?php echo( $arrayH['cantidadempleados']); ?></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <?php } ?>
                  </tbody>
                  
                  
              </table>
            </div>


          </div>
        </div>
      </div>
      <div class="col-12 grid-margin stretch-card">
        <div class="card mt-3">
          <div class="card-body">
            <div class="card-item border-b pb-2">
              <p class="m-0">
              Los rangos de A1 a A8 representan diferentes niveles de ingresos mensuales, los cuales están determinados por el "historial laboral" de una persona. Cada rango indica un umbral específico de ingresos, reflejando la experiencia y las posiciones ocupadas a lo largo de su carrera. Por ejemplo, A1 podría corresponder a ingresos más bajos, mientras que A8 representaría ingresos más altos, lo que sugiere una trayectoria laboral más sólida o posiciones de mayor responsabilidad.
              </p>
            </div>
      
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr class="text-md">
                    <th>Rango</th>
                    <th>Mínimo</th>
                    <th>Máximo</th>
                    <th>Promedio</th>
                  </tr>
                <thead>
                <tbody>
                  <tr class="text-md">
                    <td class="text-center">A1</td>
                    <td colspan="2">Igual o menor a $ 537.500</td>
                    <td> - </td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center">A2</td>
                    <td>$ 537.500</td>
                    <td>$ 660.000</td>
                    <td>$ 598.750</td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center">A3</td>
                    <td>$ 660.000</td>
                    <td>$ 800.000</td>
                    <td>$ 730.000</td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center">A4</td>
                    <td>$ 800.000</td>
                    <td>$ 1.400.000</td>
                    <td>$ 1.100.000</td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center">A5</td>
                    <td>$ 1.400.000</td>
                    <td>$ 2.800.000</td>
                    <td>$ 2.100.000</td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center">A6</td>
                    <td>$ 2.800.000</td>
                    <td>$ 3.800.000</td>
                    <td>$ 3.300.000</td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center">A7</td>
                    <td>$ 3.800.000</td>
                    <td>$ 6.500.000</td>
                    <td>$ 5.150.000</td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center">A8</td>
                    <td colspan="2">$ 6.500.000</td>
                    <td> - </td>
                  </tr>
                </tbody>
              </table>
            </div>


          </div>
        </div>
      </div>

      <div class="col-12 grid-margin stretch-card mt-4">
        <div class="card">
          <div class="card-body">
              <div class="title-section">
                <i class="material-icons custom-icons">directions_car</i>
                <h1>Automotores actuales</h1>
              </div>
              <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                      <th>Año</th>
                      <th>Dominio</th>  
                      <th>Tipo</th>
                      
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Origen</th>
                      <th>%</th>
                      
                  </tr>
                </thead>
                <tbody>
                  <?php 
                  foreach($data['bienesPersonales']['automotores']['datos'] as $value => $array) { 
                    $cant = $data['bienesPersonales']['automotores']['cantTotal'];
                    ?>
                  <tr>
                      <td>
                      <?php echo( $array['anioModelo']); ?>
                      </td>
                      <td><?php echo( $array['dominio']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['tipo']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['marca']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['modelo']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['origen']); ?></td>
                      <td class="pb-0"><?php echo( $array['porcentaje']); ?>%</td>
                      
                  </tr>


                 
                  <?php } ?>
                </tbody>
                  
              </table>
              </div>
          </div>
        </div>
      </div>

      <div class="col-12 grid-margin stretch-card my-4">
        <div class="card">
          <div class="card-body">
              <div class="title-section">
                <i class="material-icons custom-icons">directions_car</i>
                <h1>Historial de Automotores</h1>
              </div>
              <div class="table-responsive">
              <table class="table">
                  <thead>
                  <tr>
                    <th>Año</th>
                        <th>Dominio</th>  
                        <th>Tipo</th>
                        
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Origen</th>
                      <th>%</th>
                    </tr>
                  </thead>
                  <tbody>
                  <?php 
                  foreach($data['bienesPersonales']['automotores_historial']['datos'] as $value => $array) { 
                    $cant = $data['bienesPersonales']['automotores_historial']['cantTotal'];
                    ?>
                  <tr>
                      <td>
                      <?php echo( $array['anioModelo']); ?>
                      </td>
                      <td><?php echo( $array['dominio']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['tipo']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['marca']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['modelo']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['origen']); ?></td>
                      <td class="pb-0"><?php echo( $array['porcentaje']); ?>%</td>
                      
                  </tr>


                 
                  <?php } ?>
                  </tbody>
                  
                  
              </table>
              </div>
          </div>
        </div>
      </div>

      <div class="col-12 grid-margin stretch-card mb-3">
        <div class="card">
          <div class="card-body">
            
            <div class="title-section">
              <i class="material-icons custom-icons">currency_exchange</i>
              <h1>Situación Financiera</h1>
              <?php 
              $dataByYears=array();
              $dataByEntidad=array();

              foreach ($data['morosidad']['informacionBcra']['datos'] as $k => $year) {
                  $periodo=substr($year["periodo"],0,4);
                  //unset($year['periodo']);
                  $dataByYears[$periodo][] = $year;
              }
              $mList="";  
              ?>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Banco/Financiera</th>
                    <th>Ene</th>
                    <th>Feb</th>
                    <th>Mar</th>
                    <th>Abr</th>
                    <th>May</th>
                    <th>Jun</th>
                    <th>Jul</th>
                    <th>Ago</th>
                    <th>Sep</th>
                    <th>Oct</th>
                    <th>Nov</th>
                    <th>Dic</th>
                  </tr>
                <thead>
                <tbody>

                <?php 
                $ene = '';
                $feb = '';
                $mar = '';
                $abr = '';
                $may = '';
                $jun = '';
                $jul = '';
                $ago = '';
                $sep = '';
                $oct = '';
                $nov = '';
                $dic = '';

                $sitene = null;
                $sitfeb = null;
                $sitmar = null;
                $sitabr = null;
                $sitmay = null;
                $sitjun = null;
                $sitjul = null;
                $sitago = null;
                $sitsep = null;
                $sitoct = null;
                $sitnov = null;
                $sitdic = null;

                foreach ($dataByYears as $k=>$years){   
                  $mList.="<tr><td colspan='13' class='py-0 m-0 bg-gray-200'><i class='material-icons custom-icons-small'>label_important</i>$k</td></tr>";
                  foreach ($years as $value){
                    $entiedad=$value['entidad']['entidad']; 
                    $dataByEntidad[$entiedad][] = $value;
                  }
                  
                  foreach ($dataByEntidad as $j=>$entidades){  
                    $mList.="<tr class='text-sm'><td>$j</td>";
                    $ent = array_reverse($entidades, true);

                    foreach ($ent as $value2){
                      $month = substr($value2["periodo"],5,2);
                    
                      switch ($month) {
                        case 1:
                            if(!empty($value2['prestamo'])){
                              $ene = "<span class='xsmall'>$</span>".$value2['prestamo'];
                              $sitene = substr($value2['situacion'],1,1);
                            }
                            break;
                        case 2:
                            if(!empty($value2['prestamo'])){
                              $feb = "<span class='xsmall'>$</span>".$value2['prestamo'];
                              $sitfeb = substr($value2['situacion'],1,1);
                            }
                            break;
                        case 3:
                            if(!empty($value2['prestamo'])){
                              $mar = "<span class='xsmall'>$</span>".$value2['prestamo'];
                              $sitmar = substr($value2['situacion'],1,1);
                            }
                            break;
                        case 4:
                            if(!empty($value2['prestamo'])){
                              $abr = "<span class='xsmall'>$</span>".$value2['prestamo'];
                              $sitabr = substr($value2['situacion'],1,1);
                            }
                            break;
                        case 5:
                            if(!empty($value2['prestamo'])){
                              $may = "<span class='xsmall'>$</span>".$value2['prestamo'];
                              $sitmay = substr($value2['situacion'],1,1);
                            }
                            break;
                        case 6:
                            if(!empty($value2['prestamo'])){
                              $jun = "<span class='xsmall'>$</span>".$value2['prestamo'];
                              $sitjun = substr($value2['situacion'],1,1);
                            }
                            break;
                        case 7:
                            if(!empty($value2['prestamo'])){
                              $jul = "<span class='xsmall'>$</span>".$value2['prestamo'];
                              $sitjul = substr($value2['situacion'],1,1);
                            }
                            break;
                        case 8:
                            if(!empty($value2['prestamo'])){
                              $ago = "<span class='xsmall'>$</span>".$value2['prestamo'];
                              $sitago = substr($value2['situacion'],1,1);
                            }
                            break;
                        case 9:
                            if(!empty($value2['prestamo'])){
                              $sep = "<span class='xsmall'>$</span>".$value2['prestamo'];
                              $sitsep = substr($value2['situacion'],1,1);
                            }
                            break;
                        case 10:
                            if(!empty($value2['prestamo'])){
                              $oct = "<span class='xsmall'>$</span>".$value2['prestamo'];
                              $sitoct = substr($value2['situacion'],1,1);
                            }
                            break;
                        case 11:
                            if(!empty($value2['prestamo'])){
                              $nov = "<span class='xsmall'>$</span>".$value2['prestamo'];
                              $sitnov = substr($value2['situacion'],1,1);
                            }
                            break;
                        case 12:
                            if(!empty($value2['prestamo'])){
                              $dic = "<span class='xsmall'>$</span>".$value2['prestamo'];
                              $sitdic = substr($value2['situacion'],1,1);
                            }
                            break;
                        }
                    //$mList.="<td>\t$month</td> <td>\t$value2[prestamo]</td>";
                    }
                    
                    $mList.=" 
                              <td class='cell-color".$sitene."'>".$ene."<br><span class='situ situ-".$sitene."'>".$sitene."</span></td>
                              <td class='cell-color".$sitfeb."'>".$feb."<br><span class='situ situ-".$sitfeb."'>".$sitfeb."</span></td>
                              <td class='cell-color".$sitmar."'>".$mar."<br><span class='situ situ-".$sitmar."'>".$sitmar."</span></td>
                              <td class='cell-color".$sitabr."'>".$abr."<br><span class='situ situ-".$sitabr."'>".$sitabr."</span></td>
                              <td class='cell-color".$sitmay."'>".$may."<br><span class='situ situ-".$sitmay."'>".$sitmay."</span></td>
                              <td class='cell-color".$sitjun."'>".$jun."<br><span class='situ situ-".$sitjun."'>".$sitjun."</span></td>
                              <td class='cell-color".$sitjul."'>".$jul."<br><span class='situ situ-".$sitjul."'>".$sitjul."</span></td>
                              <td class='cell-color".$sitago."'>".$ago."<br><span class='situ situ-".$sitago."'>".$sitago."</span></td>
                              <td class='cell-color".$sitsep."'>".$sep."<br><span class='situ situ-".$sitsep."'>".$sitsep."</span></td>
                              <td class='cell-color".$sitoct."'>".$oct."<br><span class='situ situ-".$sitoct."'>".$sitoct."</span></td>
                              <td class='cell-color".$sitnov."'>".$nov."<br><span class='situ situ-".$sitnov."'>".$sitnov."</span></td>
                              <td class='cell-color".$sitdic."'>".$dic."<br><span class='situ situ-".$sitdic."'>".$sitdic."</span></td>
                              ";
                    
                    $mList.="</tr>";

                    $ene = '';
                    $feb = '';
                    $mar = '';
                    $abr = '';
                    $may = '';
                    $jun = '';
                    $jul = '';
                    $ago = '';
                    $sep = '';
                    $oct = '';
                    $nov = '';
                    $dic = '';

                    $sitene = null;
                    $sitfeb = null;
                    $sitmar = null;
                    $sitabr = null;
                    $sitmay = null;
                    $sitjun = null;
                    $sitjul = null;
                    $sitago = null;
                    $sitsep = null;
                    $sitoct = null;
                    $sitnov = null;
                    $sitdic = null;  

                  }
                  unset($dataByEntidad);
                  
                  //unset($ene,$feb,$mar,$abr,$may,$jun,$jul,$ago,$sep,$oct,$nov,$dic);
                  
                }
                echo $mList;
                ?>

                
                </tbody>
              </table>
            </div>
            
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Situación</th>
                    <th>Descripción</th>
                  </tr>
                <thead>
                <tbody>
                  <tr class="text-md">
                    <td class="text-center"><span class="situ situ-0">0</span></td>
                    <td>Sin informacion en BCRA</td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center"><span class="situ situ-1">1</span></td>
                    <td>Situación normal (pago puntual o atrasos menores a 31 días)</td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center"><span class="situ situ-2">2</span></td>
                    <td>Con riesgo potencial (con atrasos entre 31 y 90 días)</td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center"><span class="situ situ-3">3</span></td>
                    <td>Cumplimiento deficiente (con atrasos entre 90 y 180 días)</td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center"><span class="situ situ-4">4</span></td>
                    <td>Con alto riesgo de insolvencia (con atrasos entre 180 días y 1 año)</td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center"><span class="situ situ-5">5</span></td>
                    <td>Irrecuperable (con atrasos mayores a 1 año)</td>
                  </tr>
                  <tr class="text-md">
                    <td class="text-center"><span class="situ situ-6">6</span></td>
                    <td>Irrecuperable por disposición técnica (entidades liquidadas, en proceso de disolución o en quiebra, en gestión judicial)</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      <div class="col-12 grid-margin stretch-card my-3">
        <div class="card">
          <div class="card-body">
            <div class="title-section">
              <i class="material-icons custom-icons">business_center</i>
              <h1>Monotributista ó Autonomo</h1>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Periodo</th>
                    <th>Tipo</th>
                    <th>Categorias</th>
                    <th>Ganancias</th>
                    <th>IVA</th>
                    <th>Integra Sociedades</th>
                  </tr>
                <thead>
                <tbody>
                <?php 
                  foreach($data['datosLaborales']['monotributista']['datos'] as $value => $array) { 
                    //$cant = $data['bienesPersonales']['automotores_historial']['cantTotal'];
                    ?>
                  <tr>
                      <td><?php echo( $array['fechaInicio'].' - '.$array['fechaHasta']); ?></td>
                      <td><?php echo( $array['tipo']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['categoria']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['ganancias']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['iva']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['integrasociedades']); ?></td>
                      
                  </tr>


                 
                <?php } ?>

                 
                </tbody>
              </table>
              <?php if(empty($data['datosLaborales']['monotributista']['datos'])){ ?>
                <div class="text-center pt-3">
                    <span>No hay registros</span>
                </div>
              <?php } ?>
            </div>
            <!--<p class="p-1 m-0">Cantidad de registros: 1</p>-->

            <?php 
            if (!empty($data['datosLaborales']['monotributista']['datos'])){
              ?>

            <div class="title-section pt-3">
              <i class="material-icons custom-icons">business_center</i>
              <h1>Aportes Monotributista / Autonomo</h1>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Año</th>
                    <th>Ene</th>
                    <th>Feb</th>
                    <th>Mar</th>
                    <th>Abr</th>
                    <th>May</th>
                    <th>Jun</th>
                    <th>Jul</th>
                    <th>Ago</th>
                    <th>Sep</th>
                    <th>Oct</th>
                    <th>Nov</th>
                    <th>Dic</th>
                  </tr>
                <thead>
                <tbody>
                  
                    <?php 
                    $anioInicio = null;
                    $anioHasta = null;
                    $lastMonth = null;
                    //$textClass= 'danger';
                    $textClass= 'opacity-50';

                    $anioInicio = substr($array['fechaInicio'],0,4);
                    $mesInicio = substr($array['fechaInicio'],5,2);

                    $anioHasta = substr($array['fechaHasta'],0,4);
                    $mesHasta = substr($array['fechaHasta'],5,2);
                    $cantidad = ($anioHasta - $anioInicio);

                      for( $i = 0; $i < $cantidad+1; $i++){
                      $anio = $anioInicio + $i;
                      $month1 = $mesInicio;
                      $month2 = $mesHasta;

                      if($i>0){
                        $month1 = 1;  
                        
                        if($i>=$cantidad)
                        {
                          $lastYear = 1;
                        }
                      }
                      ?>
                      <tr>
                        <td><?php echo $anio;?></td>

                        <?php     
                                for($j=1; $j<13;$j++){
                                  if($month1 <= $j ){
                                    $textClass= 'success';
                                    if(!empty($lastYear)){
                                      if($month2 < $j ){
                                        $textClass= 'opacity-50';
                                      }
                                    }
                                  }
                                  echo '<td class="text-'.$textClass.' text-center">■</td>';
                                } 
                        ?>
                    </tr>
                  <?php } ?>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-end">
              <p class="px-2 pt-2 text-sm align-right m-0">
                <span class="text-success text-sm">■</span> En término - 
                <!--<span class="text-danger">■</span> Fuera de término - -->
                <span class="text-opacity-50">■</span> No registra
              </p>
            </div>
          

            <?php } ?>
            <div class="title-section pt-3 ">
              <i class="material-icons custom-icons">task_alt</i>
              <h1>Actividades</h1>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descripción de actividades</th>
                  </tr>
                <thead>
                <tbody>

                <?php 
                  foreach($data['datosLaborales']['actividad']['datos'] as $value => $array) { 
                    //$cant = $data['bienesPersonales']['automotores_historial']['cantTotal'];
                    ?>
                  <tr>
                      <td><?php echo( $array['ciiu']); ?></td>
                      <td class="pb-0 small"><?php echo( $array['descripcion']); ?></td>
                  </tr>
                <?php } ?>

                </tbody>
              </table>
              <?php if(empty($data['datosLaborales']['actividad']['datos'])){ ?>
                <div class="text-center pt-3">
                    <span>No hay registros</span>
                </div>
              <?php } ?>
            </div>
          </div>
        </div>
      </div>


      <div class="col-12 grid-margin stretch-card my-3">
        <div class="card">
          <div class="card-body">
            <div class="title-section">
              <i class="material-icons custom-icons">favorite</i>
              <h1>Obra Social</h1>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descripción</th>
                  </tr>
                <thead>
                <tbody>
                <?php foreach($data['datosLaborales']['obraSocial']['datos'] as $value => $array) { ?>
                  <tr>
                    <td><?php echo $array['codigo'];?></td>
                    <td><?php echo $array['descripcion'];?></td>
                  </tr>
                <?php } ?>
                </tbody>
              </table>
              <?php if(empty($data['datosLaborales']['obraSocial']['datos'])){ ?>
                <div class="text-center pt-3">
                    <span>No hay registros</span>
                </div>
              <?php } ?>
            </div>
          </div>
        </div>
      </div>

      
      <div class="col-12 grid-margin stretch-card my-3">
        <div class="card">
          <div class="card-body">
            <div class="title-section">
              <i class="material-icons custom-icons">work_history</i>
              <h1>Jubilación</h1>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Titular</th>
                    <th>Cuil</th>
                    <th>Sueldo Bruto</th>
                    <th>Sueldo Neto</th>
                    <th>Periodo</th>
                    <th>Rango</th>
                  </tr>
                <thead>
                <tbody>
                  <?php foreach($data['datosLaborales']['jubilacion']['datos'] as $value => $array) { ?>
                    <tr>
                      <td><?php echo $array['titular'];?></td>
                      <td><?php echo $array['cuil'];?></td>
                      <td><?php echo $array['sueldoBruto'];?></td>
                      <td><?php echo $array['sueldoNeto'];?></td>
                      <td><?php echo $array['periodo'];?></td>
                      <td><?php echo $array['rango'];?></td>
                    </tr>
                  <?php } ?>
                </tbody>
              </table>
              <?php if(empty($data['datosLaborales']['jubilacion']['datos'])){ ?>
                <div class="text-center pt-3">
                    <span>No hay registros</span>
                </div>
              <?php } ?>
            </div>
          </div>
        </div>
      </div>


      <div class="col-12 grid-margin stretch-card my-3">
        <div class="card">
          <div class="card-body">
            <div class="title-section">
              <i class="material-icons custom-icons">handshake</i>
              <h1>Sociedades Comerciales</h1>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Archivo</th>
                    <th>Cuit</th>
                    <th>Fuente</th>
                    <th>Boletín</th>
                    <th>Fecha publicación</th>
                    <th>Nombre</th>
                    <th>Razón Social</th>
                    <th>Fecha Constitución</th>
                    <th>Cargo</th>
                  </tr>
                <thead>
                <tbody>
                  <?php foreach($data['participacionSocietaria']['datos'] as $value => $array) { ?>
                    <tr>
                      <td><?php echo $array['archivo'];?></td>
                      <td><?php echo $array['cuil'];?></td>
                      <td><?php echo $array['fuente'];?></td>
                      <td><?php echo $array['boletin'];?></td>
                      <td><?php echo $array['fechaPublicacion'];?></td>
                      <td><?php echo $array['nombre'];?></td>
                      <td><?php echo $array['razonSocial'];?></td>
                      <td><?php echo $array['fechaConstitucion'];?></td>
                      <td><?php echo $array['cargo'];?></td>
                    </tr>
                  <?php } ?>
                </tbody>
              </table>
              <?php if(empty($data['participacionSocietaria']['datos'])){ ?>
                <div class="text-center pt-3">
                    <span>No hay registros</span>
                </div>
              <?php } ?>
            </div>
          </div>
        </div>
      </div>


      <div class="col-12 grid-margin stretch-card my-3">
        <div class="card">
          <div class="card-body">
            <div class="title-section">
              <i class="material-icons custom-icons">campaign</i>
              <h1>Mensiones en Boletín Oficial</h1>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Fuente</th>
                    <th>Fecha</th>
                    <th>Sueldo Bruto</th>
                    <th>Sueldo Neto</th>
                    <th>Periodo</th>
                    <th>Rango</th>
                  </tr>
                <thead>
                <tbody>
                  <?php foreach($data['boletinOficial']['datos'] as $value => $array) { ?>
                    <tr>
                      <td><?php echo $array['fuente'];?></td>
                      <td><?php echo $array['fecha'];?></td>
                    </tr>
                  <?php } ?>
                </tbody>
              </table>
              <?php if(empty($data['boletinOficial']['datos'])){ ?>
                <div class="text-center pt-3">
                    <span>No hay registros</span>
                </div>
              <?php } ?>
            </div>
          </div>
        </div>
      </div>


      <div class="col-12 grid-margin stretch-card my-3">
        <div class="card">
          <div class="card-body">
            <div class="title-section">
              <i class="material-icons custom-icons">rule</i>
              <h1>Cheques rechazados</h1>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>N° de cheque</th>
                    <th>Monto</th>
                    <th>Causal</th>
                    <th>Fecha rechazo</th>
                    <th>Fecha Levantamiento</th>
                    <th>Multa</th>
                  </tr>
                <thead>
                <tbody>
                  <?php foreach($data['morosidad']['chequesRechazados']['datos'] as $value => $array) { ?>
                    <tr>
                      <td><?php echo $array['nroCheque'];?></td>
                      <td>$ <?php echo $array['monto'];?></td>
                      <td><?php echo $array['causal'];?></td>
                      <td><?php echo substr($array['fechaRechazo'], 0, 10);?></td>
                      <td><?php echo substr($array['fechaLevantamiento'], 0, 10);?></td>
                      <td><?php echo $array['multa'];?></td>
                    </tr>
                  <?php } ?>
                </tbody>
              </table>
              <?php if(empty($data['morosidad']['chequesRechazados']['datos'])){ ?>
                <div class="text-center pt-3">
                    <span>No hay registros</span>
                </div>
              <?php } ?>
            </div>
          </div>
        </div>
      </div>

  </div>
</section>

<footer class="footer-style">
    <div class="container">
        <div class="row">
            
            <div class="col-12 ">
                <div class="descargo-footer border-bottom pb-2 mb-2">
                    <div class="col-md-12">
                        <p class="mb-0">
                            <!--<strong>Información y descargo de responsabilidad</strong><br>-->
                            Este informe y su contenido no implican ninguna valoración sobre el titular de los datos ni sobre su capacidad financiera, así como tampoco sobre su reputación, honor, privacidad o buen nombre. La evaluación y decisión que tome el CONSULTANTE deben basarse exclusivamente en su propio análisis de la información presentada. El CONSULTANTE se compromete a usar la información proporcionada únicamente para la celebración y evaluación de negocios, como un recurso adicional para las operaciones con el titular de los datos. Además, deberá mantener la más estricta confidencialidad respecto al informe solicitado, de acuerdo con las condiciones del contrato, y se abstendrá de revelar, mostrar, reproducir o transmitir, ya sea de forma gratuita o a cambio de un pago, la información a terceros o al titular de los datos. Asimismo, se compromete a destruir el informe impreso tan pronto como haya cumplido su propósito, con el fin de asegurar el cumplimiento de las obligaciones establecidas por la Ley 25.326 vigente.
                            
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-12 footer-logo text-center pb-2">
                <div class="text-center py-1">
                    <img src="assets/img/logo-header.png" alt="Black Whale" width="86">
                </div>
            </div>
            <div class="col-md-12">
                <div class="info-footer pt-1">
                    <p>
                    <strong>CONSULTAS:</strong> • <a href="mailto:informes@datuar.com.ar">informes@datuar.com.ar</a> | • +54 9 11 5014-5675
                    </p>
                </div>
            </div>
            
        </div>
    </div>
</footer>

<!-- Core theme JS-->
<script src="assets/js/scripts.js"></script>
<script>
  var prods = cargarProds();
  <?php if(!empty($data['datosParticulares']['score'])) { ?>
  updateGauge(<?php echo $data['datosParticulares']['score']; ?>);
  <?php }else{ ?>
  updateGauge(0);
  <?php } ?>
</script>
</body>
</html>



//script.js


//const jsonData = require('http://datuar.test/public/json/data.txt'); 
//var prods = jsonData;

async function cargarProds(){

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://datuar.test/public/json/data.txt', true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            prods = JSON.parse(this.responseText);
            console.log(prods);
            return prods;
        };
    }
};

// Scoring charts 
async function updateGauge(score) {
    const needle = document.getElementById('needle');
    const scoreDisplay = document.getElementById('score');
    const angle = (score / 1000) * 270 - 130;
    needle.style.transform = `rotate(${angle}deg) translateX(-10%)`;
    scoreDisplay.textContent = score;
  }
  
function getFile(elm){
    new Response(elm.files[0]).json().then(json => {
        console.log(json)
      }, err => {
        // not json
      })
}

  // Ejemplo de uso: actualizar el gauge con un puntaje de 982
  //updateGauge(982);

  







  