const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

/** "Martes, 28 de mayo de 2026" */
export function formatLongDate(ts) {
  return cap(
    new Date(ts).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  )
}

/** "28 may" */
export function formatShortDate(ts) {
  return new Date(ts).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

/** "14:32" */
export function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

/** Stable YYYY-MM-DD key for grouping by calendar day. */
export function dayKey(ts) {
  const d = new Date(ts)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Human day heading: "Hoy", "Ayer", "Martes, 28 de mayo", or full date for past years. */
export function dayLabel(ts) {
  const d = new Date(ts)
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  if (dayKey(ts) === dayKey(now.getTime())) return 'Hoy'
  if (dayKey(ts) === dayKey(yesterday.getTime())) return 'Ayer'
  if (d.getFullYear() === now.getFullYear()) {
    return cap(d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }))
  }
  return cap(d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }))
}

/** Word count for an entry body. */
export function wordCount(text = '') {
  const trimmed = text.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}
