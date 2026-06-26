# AGENTS-PAGE-CancelacionPage

## Output file
`cancelacion.php`

## Includes needed
- `include/header.php` (top)
- `include/footer.php` (bottom)

## JavaScript needed
None (static form markup).

## Notes
- Include only the form state (not the success/submitted state).
- Form is static markup only — no action, method, or JS validation.

## Page content

<section style="background: #f3f3f3; padding: 8rem 0; min-height: 100vh;">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">

        <div class="text-center mb-5">
          <span class="about-label">CANCELACIÓN DE DATOS</span>
          <h2 class="about-title">Solicitar cancelación de mis datos</h2>
          <p class="about-text">
            Completá el formulario y solicitá la baja de tus datos personales de nuestro sistema.
          </p>
        </div>

        <form class="about-form">
          <div class="row g-3">
            <div class="col-sm-6">
              <input type="text" name="nombre" class="about-input" placeholder="Nombre" required />
            </div>
            <div class="col-sm-6">
              <input type="text" name="apellido" class="about-input" placeholder="Apellido" required />
            </div>
            <div class="col-sm-6">
              <input type="text" name="dni" class="about-input" placeholder="DNI" required />
            </div>
            <div class="col-sm-6">
              <input type="text" name="cuil" class="about-input" placeholder="CUIL" required />
            </div>
            <div class="col-12">
              <input type="email" name="email" class="about-input" placeholder="Correo electrónico" required />
            </div>
            <div class="col-12 text-center">
              <button type="submit" class="about-btn-primary">Enviar Solicitud</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</section>
