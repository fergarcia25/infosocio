# AGENTS-INCLUDE-Footer

## Output file
`include/footer.php`

## JavaScript needed
None.

## Notes
- Use `<?php echo date('Y'); ?>` for the dynamic year.
- All links use `<a href="...">` instead of React Router `<Link>`.

## Page content

</main>

<footer class="site-footer mt-auto">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-4">
        <h5 class="fw-bold mb-3">InfoSocio</h5>
        <p class="text-white-50">
          Soluciones de informes personalizados con rapidez y confianza.
        </p>
      </div>
      <div class="col-lg-4">
        <h5 class="fw-bold mb-3">Enlaces</h5>
        <ul class="list-unstyled">
          <li class="mb-2"><a href="infoboost" class="text-white-50 text-decoration-none">Infoboost</a></li>
          <li class="mb-2"><a href="infotarget" class="text-white-50 text-decoration-none">InfoTarget</a></li>
          <li class="mb-2"><a href="terminos-y-condiciones" class="text-white-50 text-decoration-none">Términos y Condiciones</a></li>
          <li class="mb-2"><a href="politicas-de-privacidad" class="text-white-50 text-decoration-none">Políticas de Privacidad</a></li>
          <li class="mb-2"><a href="cancelacion-datos" class="text-white-50 text-decoration-none">Solicitar cancelación de mis datos</a></li>
        </ul>
      </div>
      <div class="col-lg-4">
        <h5 class="fw-bold mb-3">Contacto</h5>
        <p class="text-white-50 mb-1">contacto@infosocio.com</p>
        <p class="text-white-50 mb-1">+54 11 1234-5678</p>
      </div>
    </div>
    <hr class="my-3" style="border-color: rgba(255,255,255,0.1);" />
    <p class="text-center text-white-50 small mb-0">
      &copy; <?php echo date('Y'); ?> InfoSocio. Todos los derechos reservados.
    </p>
  </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>
