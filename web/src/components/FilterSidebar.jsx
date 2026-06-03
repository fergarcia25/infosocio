export default function FilterSidebar({ counts = {}, filters = {}, onFilterChange = () => {} }) {
  const {
    men = 0, women = 0,
    firstAge = 0, secondAge = 0, thirdAge = 0,
  } = counts

  return (
    <div className="row g-2 align-items-end">
      <div className="col-12 col-sm-6 col-md">
        <label className="form-label small fw-semibold mb-1">Sexo</label>
        <select
          className="form-select form-select-sm"
          value={filters.sexo || ''}
          onChange={e => onFilterChange({ ...filters, sexo: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="M" disabled={men === 0}>Hombre{men > 0 ? ` (${men})` : ''}</option>
          <option value="F" disabled={women === 0}>Mujer{women > 0 ? ` (${women})` : ''}</option>
        </select>
      </div>
      <div className="col-12 col-sm-6 col-md">
        <label className="form-label small fw-semibold mb-1">Edad</label>
        <select
          className="form-select form-select-sm"
          value={filters.edad || ''}
          onChange={e => onFilterChange({ ...filters, edad: e.target.value })}
        >
          <option value="">Todas</option>
          <option value="1" disabled={firstAge === 0}>18-30 {firstAge > 0 ? `(${firstAge})` : ''}</option>
          <option value="2" disabled={secondAge === 0}>30-50 {secondAge > 0 ? `(${secondAge})` : ''}</option>
          <option value="3" disabled={thirdAge === 0}>50-100 {thirdAge > 0 ? `(${thirdAge})` : ''}</option>
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
    </div>
  )
}
