<?php
function v($val) {
  if ($val === null || $val === '' || is_bool($val)) return '-';
  if (is_array($val)) return '-';
  return htmlspecialchars((string)$val);
}

function formatDate($val) {
  if ($val === null || $val === '' || is_bool($val) || is_array($val)) return '-';
  $s = str_replace(['T', 'Z'], [' ', ''], (string)$val);
  if (!trim($s)) return '-';
  $parts = explode(' ', $s);
  $datePart = $parts[0];
  $timePart = $parts[1] ?? '';
  if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $datePart)) return $s;
  list($y, $m, $d) = explode('-', $datePart);
  return $timePart ? "$d-$m-$y | $timePart" : "$d-$m-$y";
}

function reportSection($icon, $title, $content, $plain = false) {
  $style = $plain
    ? 'border:none;box-shadow:none'
    : 'border:1px solid #e7e7e7;border-radius:10px;box-shadow:0 1px 12px rgba(0,0,0,0.1)';
  ?>
  <div class="card mb-3" style="<?= $style ?>">
    <div class="card-body">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-<?= $icon ?>" style="color:#b71c1c;font-size:1.1rem"></i>
        <h5 class="fw-bold mb-0"><?= $title ?></h5>
      </div>
      <?= $content ?>
    </div>
  </div>
  <?php
}

function renderReport($data) {
  $d = $data['data'] ?? $data;
  $dp = $d['datosParticulares'] ?? [];
  $tel = $d['telefonos'] ?? [];
  $telCel = $d['telefonosCelulares'] ?? [];
  $vinculos = $d['vinculos']['vinculos'] ?? [];
  $laboral = $d['datosLaborales'] ?? [];
  $bienes = $d['bienesPersonales'] ?? [];
  $morosidad = $d['morosidad'] ?? [];
  $boletin = $d['boletinOficial'] ?? [];
  $participacion = $d['participacionSocietaria'] ?? [];
  $score = $dp['score'] ?? null;
  $months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  ?>
  <style>
    .report-container h1,.report-container h2,.report-container h3,.report-container h4,.report-container h5,.report-container h6{font-family:"Raleway",sans-serif;font-weight:700}
    .report-container .table{border-collapse:separate;border-spacing:0;border:1px solid #e7e7e7;border-radius:8px;background-color:#fafafa;overflow:hidden}
    .report-container .table th,.report-container .table td{padding:6px 10px!important;border-bottom:1px solid #e7e7e7}
    .report-container .table tr:last-child td,.report-container .table tr:last-child th{border-bottom:none}
  </style>
  <div class="report-container p-4" style="font-family:'Roboto',sans-serif;background:#fff">
    <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
      <img src="assets/images/logo-white-full.png" alt="Infosocio" style="max-height:60px">
      <div class="text-end">
        <h4 class="fw-bold mb-0" style="color:#b71c1c">INFORME</h4>
        <div class="small">Fecha: <?= date('d/m/Y') ?></div>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-start pb-2 mb-2 border-bottom">
      <h4 class="fw-bold mb-0"><?= v($dp['apellido']) ?>, <?= v($dp['nombre']) ?></h4>
      <div class="text-end small">
        <div>FECHA: <span class="fw-bold"><?= date('d/m/Y') ?></span></div>
        <div>INFORME N°: <span class="fw-bold">37028659</span></div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-lg-6 col-12">
        <?php
        ob_start();
        ?>
        <div style="border-radius:8px;padding:0">
          <div class="row g-2 mt-3">
            <?php
            $fields = [
              'Nombre' => v($dp['nombre']),
              'Apellido' => v($dp['apellido']),
              'CUIT / CUIL' => v($dp['cuil']),
              'DNI' => v($dp['dni']),
              'Edad' => v($dp['edad']),
              'Sexo' => v($dp['sexo']),
              'Nacimiento' => formatDate($dp['fechaNacimiento'] ?? null),
              'Defunción' => formatDate($dp['fechaDeceso'] ?? null),
              'Nacionalidad' => v($dp['nacionalidad']),
              'Versión DNI' => v($dp['tipo']),
            ];
            foreach ($fields as $label => $value):
            ?>
            <div class="col-6">
              <div style="background-color:#f5f5f5;border-radius:6px;padding:12px">
                <div class="text-muted" style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.5px"><?= $label ?></div>
                <div class="fw-bold small"><?= $value ?></div>
              </div>
            </div>
            <?php endforeach; ?>
          </div>
        </div>
        <?php
        $content = ob_get_clean();
        reportSection('person-fill', 'Datos Personales', $content);
        ?>
      </div>
      <?php if ($score !== null && $score !== '' && !is_array($score)): ?>
        <div class="col-lg-6 mb-0">
          <?php renderScoringChart((int)$score); ?>
        </div>
      <?php endif; ?>
    </div>

    <?php
    ob_start();
    ?>
    <div class="table-responsive">
      <p class="text-muted small mb-0 mt-1">Es la dirección declarada como la residencia principal o el hogar actual de la persona.</p>
      <table class="table table-sm mt-2 mb-0">
        <thead><tr><th>Ubicación</th><th>Código Postal</th><th>Localidad</th><th>Provincia</th></tr></thead>
        <tbody><tr><td><?= v($dp['domicilio']) ?></td><td><?= v($dp['cp']) ?></td><td><?= v($dp['localidad']) ?></td><td><?= v($dp['provincia']) ?></td></tr></tbody>
      </table>
    </div>
    <?php reportSection('house', 'Domicilio Particular', ob_get_clean()); ?>

    <?php if (!empty($dp['domAlternativos']['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <p class="text-muted small mb-0 mt-1">Representa una dirección secundaria, alternativa o histórica que quedó registrada en la base de datos.</p>
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Ubicación</th><th>Código Postal</th><th>Localidad</th><th>Provincia</th></tr></thead>
          <tbody>
            <?php foreach ($dp['domAlternativos']['datos'] as $item): ?>
              <tr><td><?= v($item['domicilioAlt']) ?></td><td><?= v($item['cpAlt']) ?></td><td><?= v($item['localidadAlt']) ?></td><td><?= v($item['provinciaAlt']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('house', 'Otros Domicilios', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($tel['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <p class="text-muted small mb-0 mt-1">Son números de teléfono fijos vinculados al historial de la persona.</p>
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Número de teléfono</th><th>Prestador original</th><th>Localidad</th></tr></thead>
          <tbody>
            <?php foreach ($tel['datos'] as $item): ?>
              <tr><td><?= v($item['area']) ?> <?= v($item['nro']) ?></td><td><?= v($item['operador']) ?></td><td><?= v($item['localidad']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('telephone', 'Teléfonos principales', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($telCel['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <p class="text-muted small mb-0 mt-1">Registros de líneas móviles asociadas al perfil.</p>
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Número de celular</th><th>Prestador original</th><th>Localidad</th></tr></thead>
          <tbody>
            <?php foreach ($telCel['datos'] as $item): ?>
              <tr><td><?= v($item['area']) ?> <?= v($item['nro']) ?></td><td><?= v($item['operador']) ?></td><td><?= v($item['localidad']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('telephone', 'Teléfonos celulares', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($dp['mails']['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <p class="text-muted small mb-0 mt-1">Muestra las direcciones de correo electrónico declaradas o vinculadas a la identidad fiscal del titular.</p>
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Cuit</th><th>DNI</th><th>Email</th></tr></thead>
          <tbody>
            <?php foreach ($dp['mails']['datos'] as $item): ?>
              <tr><td><?= v($item['cuil']) ?></td><td><?= v($item['dni']) ?></td><td><?= v($item['email']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('envelope', 'Emails', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($vinculos['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <p class="text-muted small mb-0 mt-1">Esta sección del informe detalla las relaciones familiares directas registradas para el titular, permitiendo reconstruir su grupo familiar primario.</p>
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Nombre</th><th>Cuil</th><th>Nacimiento</th><th>Relación</th><th>Sexo</th><th>Edad</th></tr></thead>
          <tbody>
            <?php foreach ($vinculos['datos'] as $item): ?>
              <tr><td><?= v($item['nombre']) ?></td><td><?= v($item['cuilVinculo']) ?></td><td><?= formatDate($item['fechaNacimiento']) ?></td><td><?= v($item['relacion']) ?></td><td><?= v($item['sexo']) ?></td><td><?= v($item['edad']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('people', 'Análisis de Vínculos / Familiares', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($laboral['datoLaboral']['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <p class="text-muted small mb-0 mt-1">Esta sección analiza la situación de empleo actual del titular y clasifica su remuneración estimada dentro de una escala de rangos salariales.</p>
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Estado</th><th>CUIT</th><th>Razón Social</th><th>Nivel de ingreso</th></tr></thead>
          <tbody>
            <?php foreach ($laboral['datoLaboral']['datos'] as $item): ?>
              <tr><td><?= v($item['relacionDependencia']['estado']) ?></td><td><?= v($item['relacionDependencia']['cuit']) ?></td><td><?= v($item['relacionDependencia']['razonSocial']) ?></td><td><?= v($item['relacionDependencia']['sueldo']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
        <p class="text-muted small fst-italic mb-0 mt-2">La clasificación de ingresos (escalas A1 a A8) mide la capacidad salarial mensual en base a los antecedentes laborales del perfil. Estos rangos reflejan el progreso y la jerarquía de los cargos ocupados en el mercado de trabajo. Mientras que las categorías más bajas (como A1) indican ingresos mínimos de referencia, los niveles superiores (hasta A8) señalan perfiles con trayectorias más consolidadas o puestos directivos de mayor remuneración.</p>
      </div>
      <?php reportSection('briefcase', 'Análisis de Historial Laboral e Ingresos', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($bienes['automotores']['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <p class="text-muted small mb-0 mt-1">Representa los vehículos que el titular posee en la actualidad, con el porcentaje de titularidad sobre cada uno:</p>
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Año</th><th>Dominio</th><th>Tipo</th><th>Marca</th><th>Modelo</th><th>Origen</th><th>%</th></tr></thead>
          <tbody>
            <?php foreach ($bienes['automotores']['datos'] as $item): ?>
              <tr><td><?= v($item['anioModelo']) ?></td><td><?= v($item['dominio']) ?></td><td><?= v($item['tipo']) ?></td><td><?= v($item['marca']) ?></td><td><?= v($item['modelo']) ?></td><td><?= v($item['origen']) ?></td><td><?= isset($item['porcentaje']) ? v($item['porcentaje']) . '%' : '-' ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('car-front', 'Automotores actuales (Activos Vigentes)', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($bienes['automotores_historial']['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <p class="text-muted small mb-0 mt-1">Registra el historial de vehículos que el titular tuvo a su nombre en el pasado (ya transferidos o dados de baja).</p>
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Año</th><th>Dominio</th><th>Tipo</th><th>Marca</th><th>Modelo</th><th>Origen</th><th>%</th></tr></thead>
          <tbody>
            <?php foreach ($bienes['automotores_historial']['datos'] as $item): ?>
              <tr><td><?= v($item['anioModelo']) ?></td><td><?= v($item['dominio']) ?></td><td><?= v($item['tipo']) ?></td><td><?= v($item['marca']) ?></td><td><?= v($item['modelo']) ?></td><td><?= v($item['origen']) ?></td><td><?= isset($item['porcentaje']) ? v($item['porcentaje']) . '%' : '-' ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('car-front', 'Historial de Automotores (Bienes Anteriores)', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($morosidad['informacionBcra']['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Banco/Financiera</th><th>Ene</th><th>Feb</th><th>Mar</th><th>Abr</th><th>May</th><th>Jun</th><th>Jul</th><th>Ago</th><th>Sep</th><th>Oct</th><th>Nov</th><th>Dic</th></tr></thead>
          <tbody>
            <?php
            $bcraData = [];
            foreach ($morosidad['informacionBcra']['datos'] as $item) {
              $entidad = $item['entidad']['entidad'] ?? '';
              $periodo = $item['periodo'] ?? '';
              $monto = $item['prestamo'] ?? 0;
              $mes = '';
              if ($periodo) {
                $p = date_parse($periodo);
                $mes = $p['month'] ?? 0;
              }
              if (!isset($bcraData[$entidad])) {
                $bcraData[$entidad] = array_fill(1, 12, '-');
              }
              if ($mes >= 1 && $mes <= 12) {
                $bcraData[$entidad][$mes] = '$' . number_format((float)$monto, 0, ',', '.');
              }
            }
            foreach ($bcraData as $entidad => $montos):
            ?>
              <tr>
                <td><?= htmlspecialchars($entidad) ?></td>
                <?php for ($m = 1; $m <= 12; $m++): ?>
                  <td><?= $montos[$m] ?></td>
                <?php endfor; ?>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('currency-exchange', 'Situación Financiera', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($laboral['monotributista']['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <p class="text-muted small mb-0 mt-1">El panel muestra el cumplimiento de los pagos mensuales obligatorios de la seguridad social:</p>
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Periodo</th><th>Tipo</th><th>Categoria</th><th>Ganancias</th><th>IVA</th><th>Integra Sociedades</th></tr></thead>
          <tbody>
            <?php foreach ($laboral['monotributista']['datos'] as $item): ?>
              <tr><td><?= formatDate($item['fechaInicio']) ?> - <?= formatDate($item['fechaHasta']) ?></td><td><?= v($item['tipo']) ?></td><td><?= v($item['categoria']) ?></td><td><?= v($item['ganancias']) ?></td><td><?= v($item['iva']) ?></td><td><?= v($item['integrasociedades']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('briefcase', 'Monotributista ó Autonomo', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($laboral['actividad']['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Código</th><th>Descripción</th></tr></thead>
          <tbody>
            <?php foreach ($laboral['actividad']['datos'] as $item): ?>
              <tr><td><?= v($item['ciiu']) ?></td><td><?= v($item['descripcion']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('check-circle', 'Actividades', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($laboral['obraSocial']['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Código</th><th>Descripción</th></tr></thead>
          <tbody>
            <?php foreach ($laboral['obraSocial']['datos'] as $item): ?>
              <tr><td><?= v($item['codigo']) ?></td><td><?= v($item['descripcion']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('heart', 'Obra Social', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($laboral['jubilacion']['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Titular</th><th>Cuil</th><th>Sueldo Bruto</th><th>Sueldo Neto</th><th>Periodo</th><th>Rango</th></tr></thead>
          <tbody>
            <?php foreach ($laboral['jubilacion']['datos'] as $item): ?>
              <tr><td><?= v($item['titular']) ?></td><td><?= v($item['cuil']) ?></td><td><?= v($item['sueldoBruto']) ?></td><td><?= v($item['sueldoNeto']) ?></td><td><?= v($item['periodo']) ?></td><td><?= v($item['rango']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('clock-history', 'Jubilación', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($participacion['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <p class="text-muted small mb-0 mt-1">Este apartado detalla la condición impositiva independiente del titular, su historial de aportes obligatorios y su participación activa en estructuras societarias comerciales.</p>
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Archivo</th><th>Cuit</th><th>Fuente</th><th>Boletín</th><th>Fecha publicación</th><th>Nombre</th><th>Razón Social</th><th>Fecha Constitución</th><th>Cargo</th></tr></thead>
          <tbody>
            <?php foreach ($participacion['datos'] as $item): ?>
              <tr><td><?= v($item['archivo']) ?></td><td><?= v($item['cuil']) ?></td><td><?= v($item['fuente']) ?></td><td><?= v($item['boletin']) ?></td><td><?= formatDate($item['fechaPublicacion']) ?></td><td><?= v($item['nombre']) ?></td><td><?= v($item['razonSocial']) ?></td><td><?= formatDate($item['fechaConstitucion']) ?></td><td><?= v($item['cargo']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('handshake', 'Análisis de Situación Fiscal, Previsional y Societaria', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($boletin['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Fuente</th><th>Fecha</th></tr></thead>
          <tbody>
            <?php foreach ($boletin['datos'] as $item): ?>
              <tr><td><?= v($item['fuente']) ?></td><td><?= formatDate($item['fecha']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('megaphone', 'Menciones en Boletín Oficial', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($morosidad['chequesRechazados']['datos'])): ?>
      <?php
      ob_start();
      ?>
      <div class="table-responsive">
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>N° de cheque</th><th>Monto</th><th>Causal</th><th>Fecha rechazo</th><th>Fecha Levantamiento</th><th>Multa</th></tr></thead>
          <tbody>
            <?php foreach ($morosidad['chequesRechazados']['datos'] as $item): ?>
              <tr><td><?= v($item['nroCheque']) ?></td><td><?= isset($item['monto']) ? '$ ' . v($item['monto']) : '-' ?></td><td><?= v($item['causal']) ?></td><td><?= formatDate($item['fechaRechazo']) ?></td><td><?= formatDate($item['fechaLevantamiento']) ?></td><td><?= v($item['multa']) ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php reportSection('exclamation-triangle', 'Cheques rechazados', ob_get_clean()); ?>
    <?php endif; ?>

    <?php if (!empty($laboral['monotributista']['datos'])): ?>
      <?php
      ob_start();
      $mono = $laboral['monotributista']['datos'][0];
      $anioInicio = (int)substr($mono['fechaInicio'], 0, 4);
      $mesInicio = (int)substr($mono['fechaInicio'], 5, 2);
      $anioHasta = (int)substr($mono['fechaHasta'], 0, 4);
      $mesHasta = (int)substr($mono['fechaHasta'], 5, 2);
      ?>
      <div class="table-responsive">
        <table class="table table-sm mt-2 mb-0">
          <thead><tr><th>Año</th><?php foreach ($months as $m): ?><th><?= $m ?></th><?php endforeach; ?></tr></thead>
          <tbody>
            <?php for ($anio = $anioInicio; $anio <= $anioHasta; $anio++): ?>
              <tr>
                <td><?= $anio ?></td>
                <?php for ($mes = 1; $mes <= 12; $mes++):
                  $cls = 'text-secondary';
                  $op = '0.5';
                  if ($anio === $anioInicio && $anio === $anioHasta) {
                    if ($mes >= $mesInicio && $mes <= $mesHasta) { $cls = 'text-success'; $op = '1'; }
                  } elseif ($anio === $anioInicio) {
                    if ($mes >= $mesInicio) { $cls = 'text-success'; $op = '1'; }
                  } elseif ($anio === $anioHasta) {
                    if ($mes <= $mesHasta) { $cls = 'text-success'; $op = '1'; }
                  } else {
                    $cls = 'text-success'; $op = '1';
                  }
                ?>
                  <td class="<?= $cls ?>" style="opacity:<?= $op ?>">■</td>
                <?php endfor; ?>
              </tr>
            <?php endfor; ?>
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-end gap-3 small mt-1">
        <span class="text-success">■ En término</span>
        <span style="opacity:0.5">■ No registra</span>
      </div>
      <?php reportSection('briefcase', 'Aportes Monotributista / Autonomo', ob_get_clean()); ?>
    <?php endif; ?>

    <div class="small text-muted mt-4 pt-3 border-top">
      <p class="mb-1">El presente informe de INFOSOCIO.COM es un recurso complementario para la evaluación de negocios y no implica ninguna valoración implícita sobre la reputación, capacidad financiera o buen nombre del titular. El análisis final y la toma de decisiones son responsabilidad exclusiva del consultante. Con el fin de salvaguardar la privacidad y cumplir con la Ley 25.326, el usuario asume la obligación de mantener este reporte bajo estricta reserva, comprometiéndose a no exhibirlo ni distribuirlo a terceros, y a destruir las copias impresas inmediatamente después de cumplir su propósito.</p>
      <p class="mb-0 mt-2"><strong>CONSULTAS:</strong> contacto@infosocio.com</p>
    </div>
  </div>
  <?php
}
