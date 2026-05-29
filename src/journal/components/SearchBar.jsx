import { useDispatch, useSelector } from 'react-redux'
import { Search, X } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { setSearchTerm } from '@/store/journal'

export function SearchBar() {
  const dispatch = useDispatch()
  const term = useSelector((state) => state.journal.searchTerm)

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={term}
        onChange={(event) => dispatch(setSearchTerm(event.target.value))}
        placeholder="Buscar en tu diario…"
        aria-label="Buscar entradas"
        className="h-9 pl-9 pr-9"
      />
      {term && (
        <button
          type="button"
          onClick={() => dispatch(setSearchTerm(''))}
          aria-label="Limpiar búsqueda"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  )
}
