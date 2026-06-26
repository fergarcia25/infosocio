<?php include 'include/header.php'; ?>

<div class="bg-light py-5" style="background-color: #f2f2f2; min-height: 100vh; margin-top: 80px;">
  <div class="container">

    <div class="d-flex justify-content-between align-items-center mb-1">
      <div>
        <h2 class="fw-bold mb-0">Confirmar Solicitud</h2>
        <p class="text-muted mb-0 mt-1">
          Completá los datos para recibir el informe solicitado.
        </p>
      </div>
      <a href="javascript:history.back()" class="btn btn-outline-dark btn-sm">
        <i class="bi bi-arrow-left"></i>
      </a>
    </div>

    <div class="row g-4 my-3">

      <!-- Persona card (static example) -->
      <div class="col-lg-4 col-sm-12 d-flex">
        <div class="rounded-3 p-4 flex-fill" style="background: #0a0a1a; background-image: radial-gradient(ellipse 700px 400px at 20% 50%, rgba(183,28,28,0.12), transparent), radial-gradient(ellipse 500px 400px at 80% 30%, rgba(255,111,0,0.06), transparent);">
          <div class="mb-3 pb-2" style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <h3 class="fw-bold mb-0" style="color: #fff; font-size: 1.8rem;">
              APELLIDO
            </h3>
            <h5 class="fw-bold mb-0 pb-2" style="color: #b71c1c; font-size: 1.3rem;">
              Nombre
            </h5>
          </div>
          <div>
            <div class="mb-2">
              <span class="small d-block" style="color: rgba(255,255,255,0.5);">CDU / CUIL</span>
              <p class="fw-bold fs-5" style="color: #fff;">20-12345678-9</p>
            </div>
            <div class="mb-2">
              <span class="small d-block" style="color: rgba(255,255,255,0.5);">Sexo</span>
              <p class="fw-bold fs-5" style="color: #fff;">Masculino</p>
            </div>
            <div class="mb-2">
              <span class="small d-block" style="color: rgba(255,255,255,0.5);">Edad</span>
              <p class="fw-bold fs-5" style="color: #fff;">35 años</p>
            </div>
            <div class="mb-2">
              <span class="small d-block" style="color: rgba(255,255,255,0.5);">Provincia</span>
              <p class="fw-bold fs-5" style="color: #fff;">Córdoba</p>
            </div>
            <div class="mb-0">
              <span class="small d-block" style="color: rgba(255,255,255,0.5);">Ciudad</span>
              <p class="fw-bold fs-5" style="color: #fff;">Córdoba</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form + Price -->
      <div class="col-lg-8 col-sm-12">

        <!-- Form -->
        <div class="bg-white rounded-3 shadow-sm p-4 mb-3">
          <h6 class="fw-bold mb-3">Datos requeridos</h6>
          <form>
            <div class="mb-3">
              <label class="form-label fw-semibold">
                Email para recibir el informe <span class="text-danger">*</span>
              </label>
              <input type="email" class="form-control" placeholder="ejemplo@correo.com" />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">
                Confirmar Email <span class="text-danger">*</span>
              </label>
              <input type="email" class="form-control" placeholder="Repite tu correo electrónico" />
            </div>

            <div class="mb-0">
              <label class="form-label fw-semibold">
                WhatsApp <span class="fw-normal text-secondary">(Opcional)</span>
              </label>
              <input type="tel" class="form-control" placeholder="Ej: +54 9 11 1234-5678" />
              <div class="form-text text-success mt-1">
                <i class="bi bi-lightbulb me-1"></i>
                Recomendamos sumarlo para avisarte apenas el informe esté listo.
              </div>
            </div>
          </form>
        </div>

        <!-- Price -->
        <div class="bg-white rounded-3 shadow-sm p-4">
          <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
            <span class="fw-semibold">Valor del informe</span>
            <span class="fs-4 fw-bold" style="color: #b71c1c;">$ 15.200</span>
          </div>

          <p class="small mb-4">
            <i class="bi bi-info-circle me-1" style="color: #b71c1c;"></i>
            <strong>Información importante:</strong> Una vez abonado, procesaremos tu pedido y el informe te llegará al Gmail ingresado en solo 5 minutos.
          </p>

          <div class="text-end">
            <button type="submit" class="about-btn-primary">
              Pagar con MercadoPago
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>

<?php include 'include/footer.php'; ?>
