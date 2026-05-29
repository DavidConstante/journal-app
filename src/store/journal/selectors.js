import { dayKey, dayLabel } from '@/lib/date'

/** Notes filtered by the current search term (matches title or body). */
export const selectFilteredNotes = (state) => {
  const term = state.journal.searchTerm.trim().toLowerCase()
  const { notes } = state.journal
  if (!term) return notes
  return notes.filter(
    (note) =>
      (note.title || '').toLowerCase().includes(term) ||
      (note.body || '').toLowerCase().includes(term)
  )
}

/** Group notes into day buckets (newest first), each with a human label. */
export const groupNotesByDay = (notes) => {
  const sorted = [...notes].sort((a, b) => (b.date ?? 0) - (a.date ?? 0))
  const groups = []
  const index = new Map()

  for (const note of sorted) {
    const key = note.date ? dayKey(note.date) : 'sin-fecha'
    if (!index.has(key)) {
      const group = { key, label: note.date ? dayLabel(note.date) : 'Sin fecha', notes: [] }
      index.set(key, group)
      groups.push(group)
    }
    index.get(key).notes.push(note)
  }

  return groups
}
