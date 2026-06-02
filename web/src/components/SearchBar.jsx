import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ large = false }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/resultados?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`search-container ${large ? 'mx-auto' : ''}`}>
      <div className="input-group input-group-lg">
        <input
          type="text"
          className="form-control"
          placeholder={large ? "Buscar por Nombre, DNI o CUIL..." : "Nombre, DNI o CUIL..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark fw-bold px-4" type="submit">
          Buscar
        </button>
      </div>
    </form>
  )
}
