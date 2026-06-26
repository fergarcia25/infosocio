# AGENTS-PAGE-ServicesPage

## Output file
`servicios.php`

## Includes needed
- `include/header.php` (top)
- `include/footer.php` (bottom)

## JavaScript needed
None (static plan cards).

## Data (hardcoded)

### Plans (8 items)
| id | title | description | icon | popular | highlight |
|---|---|---|---|---|---|
| 1 | Datos Personales | Nombres y Apellidos completos, Fecha de nacimiento, Nacionalidades, Fechas de defunción y otros datos. | bi-person-vcard | | |
| 2 | Scoring | Índice numérico de solvencia del 1 al 999. Analiza el comportamiento de pago histórico y proyecta el nivel de riesgo crediticio. | bi-graph-up-arrow | Sí | |
| 3 | Domicilios, Contactos y Emails | Datos precisos de localización: domicilios actualizados, números de celular vinculados y cuentas de email verificadas. | bi-geo-alt | | |
| 4 | Vínculos y Familiares | Mapeá el entorno de cualquier perfil. Identificá vínculos familiares directos, parejas y otros allegados clave. | bi-diagram-3 | | |
| 5 | Historial Laboral e Ingresos | Historial de empleo, situación de contratación actual y niveles estimados de ingresos mensuales. | bi-briefcase | | |
| 6 | Historial de Vehículos | Registro completo de vehículos vinculados a una persona o empresa. Patentes, marcas, modelos y estado registral. | bi-truck | | |
| 7 | Situación Financiera | Informe detallado del Banco Central. Escala del 1 al 6 desde cumplimiento normal hasta deudas en gestión judicial. | bi-bank | | |
| 8 | Perfil Fiscal y Comercial | Detalle de inscripción como Monotributista o Autónomo. Participación en sociedades y registro de cheques rechazados. | bi-clipboard-data | | Sí |

## Page content

<section class="services-hero">
  <div class="container text-center">
    <h1 class="display-5 fw-bold text-white mb-3">Planes y Servicios</h1>
    <p class="text-white-50 mb-0 mx-auto" style="max-width: 600px;">
      Elegí el informe que mejor se adapte a tus necesidades. Todos incluyen datos actualizados y verificación profesional.
    </p>
  </div>
</section>

<section class="py-5">
  <div class="container">
    <div class="row g-4 justify-content-center">

      <!-- Plan 1: Datos Personales -->
      <div class="col-md-6 col-lg-3">
        <div class="plan-card">
          <div class="plan-icon"><i class="bi bi-person-vcard"></i></div>
          <h3 class="plan-title">Datos Personales</h3>
          <p class="plan-desc">Nombres y Apellidos completos, Fecha de nacimiento, Nacionalidades, Fechas de defunción y otros datos.</p>
          <a href="solicitar?servicio=1" class="plan-btn mt-auto">Solicitar Informe</a>
        </div>
      </div>

      <!-- Plan 2: Scoring (popular) -->
      <div class="col-md-6 col-lg-3">
        <div class="plan-card popular">
          <span class="plan-badge">Más solicitado</span>
          <div class="plan-icon"><i class="bi bi-graph-up-arrow"></i></div>
          <h3 class="plan-title">Scoring</h3>
          <p class="plan-desc">Índice numérico de solvencia del 1 al 999. Analiza el comportamiento de pago histórico y proyecta el nivel de riesgo crediticio.</p>
          <a href="solicitar?servicio=2" class="plan-btn mt-auto">Solicitar Informe</a>
        </div>
      </div>

      <!-- Plan 3: Domicilios, Contactos y Emails -->
      <div class="col-md-6 col-lg-3">
        <div class="plan-card">
          <div class="plan-icon"><i class="bi bi-geo-alt"></i></div>
          <h3 class="plan-title">Domicilios, Contactos y Emails</h3>
          <p class="plan-desc">Datos precisos de localización: domicilios actualizados, números de celular vinculados y cuentas de email verificadas.</p>
          <a href="solicitar?servicio=3" class="plan-btn mt-auto">Solicitar Informe</a>
        </div>
      </div>

      <!-- Plan 4: Vínculos y Familiares -->
      <div class="col-md-6 col-lg-3">
        <div class="plan-card">
          <div class="plan-icon"><i class="bi bi-diagram-3"></i></div>
          <h3 class="plan-title">Vínculos y Familiares</h3>
          <p class="plan-desc">Mapeá el entorno de cualquier perfil. Identificá vínculos familiares directos, parejas y otros allegados clave.</p>
          <a href="solicitar?servicio=4" class="plan-btn mt-auto">Solicitar Informe</a>
        </div>
      </div>

      <!-- Plan 5: Historial Laboral e Ingresos -->
      <div class="col-md-6 col-lg-3">
        <div class="plan-card">
          <div class="plan-icon"><i class="bi bi-briefcase"></i></div>
          <h3 class="plan-title">Historial Laboral e Ingresos</h3>
          <p class="plan-desc">Historial de empleo, situación de contratación actual y niveles estimados de ingresos mensuales.</p>
          <a href="solicitar?servicio=5" class="plan-btn mt-auto">Solicitar Informe</a>
        </div>
      </div>

      <!-- Plan 6: Historial de Vehículos -->
      <div class="col-md-6 col-lg-3">
        <div class="plan-card">
          <div class="plan-icon"><i class="bi bi-truck"></i></div>
          <h3 class="plan-title">Historial de Vehículos</h3>
          <p class="plan-desc">Registro completo de vehículos vinculados a una persona o empresa. Patentes, marcas, modelos y estado registral.</p>
          <a href="solicitar?servicio=6" class="plan-btn mt-auto">Solicitar Informe</a>
        </div>
      </div>

      <!-- Plan 7: Situación Financiera -->
      <div class="col-md-6 col-lg-3">
        <div class="plan-card">
          <div class="plan-icon"><i class="bi bi-bank"></i></div>
          <h3 class="plan-title">Situación Financiera</h3>
          <p class="plan-desc">Informe detallado del Banco Central. Escala del 1 al 6 desde cumplimiento normal hasta deudas en gestión judicial.</p>
          <a href="solicitar?servicio=7" class="plan-btn mt-auto">Solicitar Informe</a>
        </div>
      </div>

      <!-- Plan 8: Perfil Fiscal y Comercial (highlight) -->
      <div class="col-md-6 col-lg-3">
        <div class="plan-card highlight">
          <span class="plan-badge highlight-badge">Completo</span>
          <div class="plan-icon"><i class="bi bi-clipboard-data"></i></div>
          <h3 class="plan-title">Perfil Fiscal y Comercial</h3>
          <p class="plan-desc">Detalle de inscripción como Monotributista o Autónomo. Participación en sociedades y registro de cheques rechazados.</p>
          <a href="solicitar?servicio=8" class="plan-btn mt-auto">Solicitar Informe</a>
        </div>
      </div>

    </div>
  </div>
</section>
