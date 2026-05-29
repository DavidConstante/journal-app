import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BookMarked, NotebookPen, SearchX, X } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { groupNotesByDay, selectFilteredNotes, startNewNote } from '@/store/journal'

const DRAWER_CLOSE_ID = 'journal-drawer-close'
import { EntryItem } from './EntryItem'
import { SearchBar } from './SearchBar'
import { UserMenu } from './UserMenu'

export function Sidebar({ open, onClose, onNavigate }) {
  const dispatch = useDispatch()
  const filtered = useSelector(selectFilteredNotes)
  const activeId = useSelector((state) => state.journal.active?.id)
  const isLoading = useSelector((state) => state.journal.isLoading)
  const searchTerm = useSelector((state) => state.journal.searchTerm)

  const groups = useMemo(() => groupNotesByDay(filtered), [filtered])
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // Modal-drawer behaviour on mobile: move focus in, close on Escape.
  useEffect(() => {
    if (isDesktop || !open) return
    document.getElementById(DRAWER_CLOSE_ID)?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isDesktop, open, onClose])

  const onNewNote = async () => {
    onNavigate?.()
    const result = await dispatch(startNewNote())
    if (!result.ok) toast.error('No se pudo crear la entrada')
  }

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-foreground/40 backdrop-blur-[2px] transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        aria-label="Navegación del diario"
        role={!isDesktop ? 'dialog' : undefined}
        aria-modal={!isDesktop && open ? 'true' : undefined}
        inert={!isDesktop && !open ? true : undefined}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[19rem] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-out lg:static lg:z-auto lg:translate-x-0',
          open ? 'translate-x-0 shadow-page' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center gap-2.5 px-4 pb-3 pt-4">
          <div className="flex size-8 items-center justify-center rounded-lg bg-ribbon text-ribbon-foreground">
            <BookMarked className="size-4" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">Journal</span>
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <Button
              id={DRAWER_CLOSE_ID}
              variant="ghost"
              size="icon-sm"
              className="lg:hidden"
              onClick={onClose}
              aria-label="Cerrar menú"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        <div className="px-3">
          <Button variant="ribbon" className="w-full justify-center gap-2" onClick={onNewNote}>
            <NotebookPen className="size-4" />
            Nueva entrada
          </Button>
        </div>

        <div className="px-3 py-3">
          <SearchBar />
        </div>

        <ScrollArea className="flex-1" viewportClassName="px-2 pb-4">
          {isLoading ? (
            <SidebarSkeleton />
          ) : groups.length === 0 ? (
            <EmptyList searching={!!searchTerm.trim()} />
          ) : (
            <div className="space-y-4">
              {groups.map((group) => (
                <section key={group.key}>
                  <h3 className="sticky top-0 z-10 bg-sidebar/95 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-sidebar/80">
                    {group.label}
                  </h3>
                  <ul className="timeline-thread mt-0.5 space-y-0.5 pl-1">
                    {group.notes.map((note) => (
                      <EntryItem
                        key={note.id}
                        note={note}
                        active={note.id === activeId}
                        onSelect={onNavigate}
                      />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="border-t border-sidebar-border p-3">
          <UserMenu />
        </div>
      </aside>
    </>
  )
}

function SidebarSkeleton() {
  return (
    <div className="space-y-1 px-2 pt-2">
      <Skeleton className="mb-2 ml-1 h-3 w-16" />
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-1.5 rounded-lg px-3 py-2.5">
          <Skeleton className="h-3.5 w-3/5" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-2.5 w-12" />
        </div>
      ))}
    </div>
  )
}

function EmptyList({ searching }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        {searching ? <SearchX className="size-5" /> : <NotebookPen className="size-5" />}
      </div>
      <p className="text-sm font-medium text-foreground">
        {searching ? 'Sin resultados' : 'Tu diario está vacío'}
      </p>
      <p className="text-xs text-muted-foreground">
        {searching ? 'Prueba con otras palabras.' : 'Crea tu primera entrada para empezar.'}
      </p>
    </div>
  )
}
