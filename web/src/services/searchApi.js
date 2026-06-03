async function fetchApi(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Error del servidor (${res.status})`)
  }
  return res.json()
}

export async function searchPeople({ criterio, provincia = '', municipio = '', ciudad = '' }) {
  const params = new URLSearchParams({ criterio, provincia, municipio, ciudad })

  const primary = await fetchApi(`/admin/api/buscar.php?${params}`).catch(() => null)

  if (primary && primary.success && primary.results && primary.results.length > 0) {
    return primary
  }

  const fallback = await fetchApi(`/admin/api/buscar-basic.php?criterio=${encodeURIComponent(criterio)}`).catch(() => null)

  if (fallback && fallback.success) {
    return fallback
  }

  if (primary && primary.success) {
    return primary
  }

  throw new Error(primary?.message || fallback?.message || 'Error en la búsqueda')
}
