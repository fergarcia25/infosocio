<?php include 'include/header.php'; ?>

<!-- Hero -->
<section class="about-hero home-hero">
  <div class="about-hero-bg"></div>
  <div class="container position-relative d-flex align-items-center" style="z-index: 1; flex: 1; min-height: 0;">
    <div class="row align-items-center">
      <div class="col-lg-8">
        <h1 class="about-hero-title">
          <span class="title-line">Información estratégica para <span class="text-gradient">tomar decisiones seguras</span></span>
        </h1>
        <p class="about-hero-sub">
          Buscá por Nombre y Apellido, DNI o CUIL y obtené el informe más completo de Argentina en solo 5 minutos.
        </p>
        <div class="mt-4 mb-3">
          <?php $large = true; include 'include/search-bar.php'; ?>
        </div>
      </div>
      <div class="col-lg-4 d-none d-lg-block">
        <div class="about-hero-visual">
          <div class="about-circle about-circle-1"></div>
          <div class="about-circle about-circle-2"></div>
          <div class="about-circle about-circle-3"></div>
        </div>
      </div>
    </div>
  </div>

  <a href="." target="_blank" class="home-hero-floating-link">
    <i class="bi bi-file-earmark-spreadsheet"></i>
    Ver informe demo
  </a>

  <!-- Slider -->
  <div class="home-slider">
    <div class="home-slider-track" id="homeSliderTrack">
      <!-- Slide 1 -->
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-person-vcard text-gradient"></i></div>
          <h3 class="home-slide-title">Datos Personales</h3>
        </div>
      </div>
      <!-- Slide 2 -->
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-graph-up-arrow text-gradient"></i></div>
          <h3 class="home-slide-title">Scoring</h3>
        </div>
      </div>
      <!-- Slide 3 -->
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-geo-alt text-gradient"></i></div>
          <h3 class="home-slide-title">Domicilios, Contactos, Gmails</h3>
        </div>
      </div>
      <!-- Slide 4 -->
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-diagram-3 text-gradient"></i></div>
          <h3 class="home-slide-title">Vínculos y Familiares</h3>
        </div>
      </div>
      <!-- Slide 5 -->
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-briefcase text-gradient"></i></div>
          <h3 class="home-slide-title">Historial laboral e ingresos</h3>
        </div>
      </div>
      <!-- Slide 6 -->
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-truck text-gradient"></i></div>
          <h3 class="home-slide-title">Historial de vehículos</h3>
        </div>
      </div>
      <!-- Slide 7 -->
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-bank text-gradient"></i></div>
          <h3 class="home-slide-title">Situación financiera</h3>
        </div>
      </div>
      <!-- Slide 8 -->
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-clipboard-data text-gradient"></i></div>
          <h3 class="home-slide-title">Perfil Fiscal y Comercial</h3>
        </div>
      </div>
      <!-- Cloned slides for infinite loop (same 8 items) -->
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-person-vcard text-gradient"></i></div>
          <h3 class="home-slide-title">Datos Personales</h3>
        </div>
      </div>
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-graph-up-arrow text-gradient"></i></div>
          <h3 class="home-slide-title">Scoring</h3>
        </div>
      </div>
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-geo-alt text-gradient"></i></div>
          <h3 class="home-slide-title">Domicilios, Contactos, Gmails</h3>
        </div>
      </div>
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-diagram-3 text-gradient"></i></div>
          <h3 class="home-slide-title">Vínculos y Familiares</h3>
        </div>
      </div>
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-briefcase text-gradient"></i></div>
          <h3 class="home-slide-title">Historial laboral e ingresos</h3>
        </div>
      </div>
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-truck text-gradient"></i></div>
          <h3 class="home-slide-title">Historial de vehículos</h3>
        </div>
      </div>
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-bank text-gradient"></i></div>
          <h3 class="home-slide-title">Situación financiera</h3>
        </div>
      </div>
      <div class="home-slide">
        <div class="home-slide-card">
          <div class="home-slide-icon"><i class="bi bi-clipboard-data text-gradient"></i></div>
          <h3 class="home-slide-title">Perfil Fiscal y Comercial</h3>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- About section -->
<section class="about-section">
  <div class="container">
    <div class="row g-5 align-items-center">
      <div class="col-lg-6">
        <div class="about-label">SOBRE NOSOTROS</div>
        <h2 class="about-title">InfoSocio</h2>
        <p class="about-text">
          Somos una plataforma especializada en la generación de informes personalizados.
          Nuestro objetivo es brindarte información confiable y detallada de manera rápida y sencilla.
        </p>
        <p class="about-text">
          Con años de experiencia en el rubro, garantizamos datos precisos y actualizados
          para que puedas tomar las mejores decisiones.
        </p>
        <a href="#beneficios" class="about-btn-primary mt-3 d-inline-flex">Conocé más</a>
      </div>
      <div class="col-lg-6">
        <div class="home-about-card">
          <div class="home-about-card-header">
            <i class="bi bi-info-circle"></i>
            <span>Descubrí todo lo que hacemos</span>
          </div>
          <div class="home-about-list">
            <a href="infotarget#funcionalidades" class="home-about-item">
              <i class="bi bi-bullseye"></i>
              <span>InfoTarget</span>
              <i class="bi bi-chevron-right"></i>
            </a>
            <a href="infotarget" class="home-about-item">
              <i class="bi bi-arrow-repeat"></i>
              <span>Transformamos datos complejos en decisiones estratégicas</span>
              <i class="bi bi-chevron-right"></i>
            </a>
            <a href="infotarget#funcionalidades" class="home-about-item">
              <i class="bi bi-grid-3x3-gap"></i>
              <span>Todo lo que necesitás para encontrar a tus clientes</span>
              <i class="bi bi-chevron-right"></i>
            </a>
            <a href="infotarget" class="home-about-item">
              <i class="bi bi-people"></i>
              <span>Para equipos de Marketing y Ventas</span>
              <i class="bi bi-chevron-right"></i>
            </a>
            <a href="infotarget" class="home-about-item">
              <i class="bi bi-signpost-2"></i>
              <span>El camino hacia tu base de datos ideal</span>
              <i class="bi bi-chevron-right"></i>
            </a>
            <a href="infotarget" class="home-about-item">
              <i class="bi bi-rocket-takeoff"></i>
              <span>Impulsá el rendimiento de tu negocio hoy mismo</span>
              <i class="bi bi-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Services/Benefits section -->
<section id="beneficios" class="about-benefits-section g-5">
  <div class="container">
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
      <div class="text-center mb-5">
        <h2 class="about-title" style="color: #fff;">¿Que contiene el informe?</h2>
        <p style="color: rgba(255,255,255,0.5); font-size: 1.1rem;">En el informe podrás conocer la siguiente información de la persona.</p>
      </div>
      <div class="about-benefits-grid">

        <div class="about-benefit-card">
          <i class="bi bi-person-vcard"></i>
          <h4>Datos Personales</h4>
          <p>Nombres y Apellidos completos, Fecha de nacimiento, Nacionalidades, Fechas de defunción y otros datos.</p>
        </div>

        <div class="about-benefit-card">
          <i class="bi bi-graph-up-arrow"></i>
          <h4>Scoring</h4>
          <p>Índice numérico de solvencia del 1 al 999. Analiza el comportamiento de pago histórico y proyecta el nivel de riesgo crediticio.</p>
        </div>

        <div class="about-benefit-card">
          <i class="bi bi-geo-alt"></i>
          <h4>Domicilios, Contactos y Emails</h4>
          <p>Datos precisos de localización: domicilios actualizados, números de celular vinculados y cuentas de email verificadas.</p>
        </div>

        <div class="about-benefit-card">
          <i class="bi bi-diagram-3"></i>
          <h4>Vínculos y Familiares</h4>
          <p>Mapeá el entorno de cualquier perfil. Identificá vínculos familiares directos, parejas y otros allegados clave.</p>
        </div>

        <div class="about-benefit-card">
          <i class="bi bi-briefcase"></i>
          <h4>Historial Laboral e Ingresos</h4>
          <p>Historial de empleo, situación de contratación actual y niveles estimados de ingresos mensuales.</p>
        </div>

        <div class="about-benefit-card">
          <i class="bi bi-truck"></i>
          <h4>Historial de Vehículos</h4>
          <p>Registro completo de vehículos vinculados a una persona o empresa. Patentes, marcas, modelos y estado registral.</p>
        </div>

        <div class="about-benefit-card">
          <i class="bi bi-bank"></i>
          <h4>Situación Financiera</h4>
          <p>Informe detallado del Banco Central. Escala del 1 al 6 desde cumplimiento normal hasta deudas en gestión judicial.</p>
        </div>

        <div class="about-benefit-card">
          <i class="bi bi-clipboard-data"></i>
          <h4>Perfil Fiscal y Comercial</h4>
          <p>Detalle de inscripción como Monotributista o Autónomo. Participación en sociedades y registro de cheques rechazados.</p>
        </div>

      </div>
    </div>
  </div>
</section>

<!-- Planes y servicios -->
<section class="about-plans-section" style="background-color: #f2f2f2;">
  <div class="container">
    <div class="text-center mb-5">
      <div class="about-label">PLANES Y SERVICIOS</div>
      <h2 class="about-title">Elegí la solución que mejor se adapte a tus necesidades</h2>
      <p class="about-text" style="max-width: 600px; margin: 0 auto;">
        Dos formas de acceder a la información más completa del mercado.
      </p>
    </div>
    <div class="row g-4 justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="about-feat-card">
          <h3 class="fw-bold text-gradient">InfoBoost</h3>
          <p style="margin-bottom: 1.5rem;">
            Subí tu base de DNI, CUIT o patentes y obtené datos de contacto, patrimoniales y comerciales actualizados de forma masiva y 100% autogestionable.
          </p>
          <a href="infoboost" class="about-btn-primary">Ver InfoBoost</a>
        </div>
      </div>
      <div class="col-md-6 col-lg-5">
        <div class="about-feat-card">
          <h3 class="fw-bold text-gradient">InfoTarget</h3>
          <p style="margin-bottom: 1.5rem;">
            Mediante tecnología Big Data analizamos millones de señales digitales para construir bases de datos de potenciales clientes altamente calificados.
          </p>
          <a href="infotarget" class="about-btn-primary">Ver InfoTarget</a>
        </div>
      </div>
    </div>
  </div>
</section>

<?php include 'include/footer.php'; ?>
