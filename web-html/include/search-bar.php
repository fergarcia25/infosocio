<form class="search-container<?php echo isset($large) && $large ? ' mx-auto' : ''; ?>">
  <div class="home-search-wrapper">
    <input
      type="text"
      id="criterio"
      name="criterio"
      class="form-control inp_box home-search-input"
      placeholder="<?php echo isset($large) && $large ? 'Buscar por NOMBRE, DNI ó CUIT' : 'Nombre, DNI o CUIL...'; ?>"
    />
    <button class="btn btn-primary fw-bold px-4 home-search-btn" type="submit">
      <i class="bi bi-search"></i>
    </button>
  </div>
</form>
