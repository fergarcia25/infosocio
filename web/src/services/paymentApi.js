export async function createPaymentPreference({ cdu, nombre, email, whatsapp, query }) {
  const res = await fetch('/admin/api/index.php?action=create-preference', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cdu, nombre, email, whatsapp, query }),
  })

  if (!res.ok) {
    throw new Error(`Error del servidor (${res.status})`)
  }

  return res.json()
}
