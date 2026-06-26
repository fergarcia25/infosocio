<?php include 'include/header.php'; ?>

<!-- Results header -->
<section class="about-transform-section" style="padding-top: calc(3rem + 80px); padding-bottom: 3rem;">
  <div class="container position-relative">
    <div class="row justify-content-center">
      <div class="col-lg-10 text-center">
        <span class="about-label" style="color: #b71c1c;">RESULTADOS DE BÚSQUEDA</span>
        <h2 class="about-title" style="color: #fff;">
          Resultados para: <strong>"Juan Pérez"</strong>
        </h2>
        <p style="color: rgba(255,255,255,0.7); font-size: 1.1rem; max-width: 700px; margin: 0 auto;">
          Se encontraron 2 resultados
        </p>
      </div>
    </div>

    <!-- Filter toggle (mobile) -->
    <div class="d-md-none mt-4">
      <button class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 filter-toggle-btn">
        <i class="bi bi-funnel"></i>
        Filtros
      </button>
    </div>

    <!-- Filters -->
    <div class="row justify-content-center mt-4">
      <div class="col-lg-10">
        <div class="p-3 results-filter-wrap" style="background: rgba(255,255,255,0.05); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
          <?php include 'include/filter-sidebar.php'; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Results cards -->
<section class="about-features-section" style="background: #e0e0e0; padding: 4rem 0;">
  <div class="container">
    <div class="row g-4">
      <!-- Result card 1 -->
      <div class="col-md-6">
        <?php
          $result = [
            'apellidos' => 'Pérez',
            'nombres' => 'Juan Carlos',
            'nrodni' => '',
            'cuit' => '20-12345678-9',
            'edad' => 35,
            'sexo' => 'M',
            'provincia' => 'Córdoba',
            'ciudad' => 'Córdoba',
            'foto' => ''
          ];
          include 'include/result-card.php';
        ?>
      </div>
      <!-- Result card 2 -->
      <div class="col-md-6">
        <?php
          $result = [
            'apellidos' => 'Pérez',
            'nombres' => 'María Laura',
            'nrodni' => '',
            'cuit' => '27-87654321-0',
            'edad' => 42,
            'sexo' => 'F',
            'provincia' => 'Buenos Aires',
            'ciudad' => 'La Plata',
            'foto' => ''
          ];
          include 'include/result-card.php';
        ?>
      </div>
    </div>

    <?php $currentPage = 1; $totalPages = 3; include 'include/pagination.php'; ?>
  </div>
</section>

<?php include 'include/footer.php'; ?>
