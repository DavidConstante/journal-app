import { useDispatch } from 'react-redux'
import { BookOpen, NotebookPen } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { formatLongDate } from '@/lib/date'
import { startNewNote } from '@/store/journal'

export function EmptyState() {
  const dispatch = useDispatch()

  const onNew = async () => {
    const result = await dispatch(startNewNote())
    if (!result.ok) toast.error('No se pudo crear la entrada')
  }

  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="paper-texture w-full max-w-xl rounded-2xl border border-transparent bg-card px-8 py-14 text-center shadow-page duration-500 animate-in fade-in-0 zoom-in-95 dark:border-border dark:shadow-none md:px-12 md:py-20">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-ribbon/12 text-ribbon">
          <BookOpen className="size-7" />
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {formatLongDate(Date.now())}
        </p>
        <h2 className="mt-2 font-display text-2xl font-medium text-foreground md:text-3xl">
          Tu página está en blanco
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Selecciona una entrada de tu diario o empieza a escribir lo que tienes en mente hoy.
        </p>
        <Button variant="ribbon" size="lg" className="mt-7" onClick={onNew}>
          <NotebookPen className="size-4" />
          Comenzar la entrada de hoy
        </Button>
      </div>
    </div>
  )
}
