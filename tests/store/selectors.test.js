import { describe, expect, it } from 'vitest'
import { groupNotesByDay, selectFilteredNotes } from '@/store/journal/selectors'

const may28 = new Date(2026, 4, 28, 10).getTime()
const may27 = new Date(2026, 4, 27, 9).getTime()

const notes = [
  { id: '1', title: 'Café', body: 'mañana tranquila', date: may28 },
  { id: '2', title: 'Lluvia', body: 'tarde gris', date: may27 },
  { id: '3', title: 'Notas', body: 'café por la noche', date: may28 },
]

describe('journal selectors', () => {
  it('filters by title or body, case-insensitively', () => {
    const state = { journal: { notes, searchTerm: 'CAFÉ' } }
    expect(selectFilteredNotes(state).map((note) => note.id)).toEqual(['1', '3'])
  })

  it('returns every note when the search term is blank', () => {
    const state = { journal: { notes, searchTerm: '   ' } }
    expect(selectFilteredNotes(state)).toHaveLength(3)
  })

  it('groups notes by calendar day, newest day first', () => {
    const groups = groupNotesByDay(notes)
    expect(groups).toHaveLength(2)
    expect(groups[0].key).toBe('2026-05-28')
    expect(groups[0].notes).toHaveLength(2)
    expect(groups[1].key).toBe('2026-05-27')
  })
})
