import { describe, expect, it } from 'vitest'
import { dayKey, wordCount } from '@/lib/date'

describe('date helpers', () => {
  it('wordCount returns 0 for empty/whitespace and counts words otherwise', () => {
    expect(wordCount('')).toBe(0)
    expect(wordCount('   ')).toBe(0)
    expect(wordCount('hola mundo cruel')).toBe(3)
    expect(wordCount('  espacios   raros  ')).toBe(2)
  })

  it('dayKey produces a stable YYYY-MM-DD key', () => {
    const ts = new Date(2026, 4, 28, 13, 0, 0).getTime() // 28 May 2026, local
    expect(dayKey(ts)).toBe('2026-05-28')
  })
})
