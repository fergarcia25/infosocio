export default function FilterSidebar() {
  return (
    <div className="row g-2 align-items-end">
      <div className="col-12 col-sm-6 col-md">
        <label className="form-label small fw-semibold mb-1">Edad</label>
        <select className="form-select form-select-sm">
          <option value="">Todas</option>
          <option value="18-25">18 - 25</option>
          <option value="26-35">26 - 35</option>
          <option value="36-50">36 - 50</option>
          <option value="51+">51+</option>
        </select>
      </div>
      <div className="col-12 col-sm-6 col-md">
        <label className="form-label small fw-semibold mb-1">Sexo</label>
        <select className="form-select form-select-sm">
          <option value="">Todos</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>
      <div className="col-12 col-sm-6 col-md">
        <label className="form-label small fw-semibold mb-1">Provincia</label>
        <select className="form-select form-select-sm">
          <option value="">Todas</option>
          <option value="bsas">Buenos Aires</option>
          <option value="caba">CABA</option>
          <option value="cordoba">Córdoba</option>
          <option value="santa-fe">Santa Fe</option>
        </select>
      </div>
      <div className="col-12 col-sm-6 col-md">
        <label className="form-label small fw-semibold mb-1">Ciudad</label>
        <select className="form-select form-select-sm">
          <option value="">Todas</option>
          <option value="la-plata">La Plata</option>
          <option value="mar-del-plata">Mar del Plata</option>
          <option value="rosario">Rosario</option>
        </select>
      </div>
      <div className="col-12 col-sm-6 col-md-auto">
        <label className="form-label small fw-semibold mb-1 invisible d-none d-md-block">&nbsp;</label>
        <button className="btn btn-dark btn-sm w-100">Aplicar</button>
      </div>
    </div>
  )
}
