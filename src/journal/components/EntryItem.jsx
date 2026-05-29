import { useDispatch } from 'react-redux'
import { Paperclip } from 'lucide-react'

import { cn } from '@/lib/utils'
import { formatTime } from '@/lib/date'
import { setActiveNote } from '@/store/journal'

export function EntryItem({ note, active, onSelect }) {
  const dispatch = useDispatch()
  const { title, body, date, imageUrls = [] } = note

  const onClick = () => {
    dispatch(setActiveNote(note))
    onSelect?.(note)
  }

  return (
    <li className="relative">
      {active && <span className="ribbon-mark" aria-hidden />}
      <button
        type="button"
        onClick={onClick}
        aria-current={active ? 'true' : undefined}
        className={cn(
          'group flex w-full flex-col gap-0.5 rounded-lg px-3 py-2.5 pl-4 text-left outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/25',
          active ? 'bg-sidebar-accent' : 'hover:bg-sidebar-accent/60'
        )}
      >
        <div className="flex items-center gap-2">
          <span className="truncate font-display text-sm font-medium text-foreground">
            {title || 'Sin título'}
          </span>
          {imageUrls.length > 0 && (
            <Paperclip className="ml-auto size-3.5 shrink-0 text-muted-foreground" />
          )}
        </div>
        <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {body?.trim() || 'Sin contenido…'}
        </span>
        <span className="mt-0.5 font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">
          {formatTime(date)}
        </span>
      </button>
    </li>
  )
}
