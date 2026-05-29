import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Check, ImagePlus, Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { dayLabel, formatLongDate, formatTime, wordCount } from '@/lib/date'
import { useDebouncedCallback, useForm } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  removeImageFromActiveNote,
  setActiveNote,
  startDeletingNote,
  startSavingNote,
  startUploadingFiles,
} from '@/store/journal'
import { ImageGallery } from '../components/ImageGallery'

export function NoteEditor() {
  const dispatch = useDispatch()
  const note = useSelector((state) => state.journal.active)
  const isSaving = useSelector((state) => state.journal.isSaving)

  const { title, body, onInputChange } = useForm(note)
  const [saveState, setSaveState] = useState('saved') // 'saved' | 'saving' | 'idle'
  const [isDragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)
  const bodyRef = useRef(null)
  const mounted = useRef(true)

  // The exact note this editor owns + its latest edits — used so a flushed autosave
  // targets THIS entry even if the active note has since changed.
  const latestRef = useRef(note)
  latestRef.current = { ...note, title, body }

  const doSave = async (noteToSave) => {
    if (mounted.current) setSaveState('saving')
    const result = await dispatch(startSavingNote(noteToSave))
    if (mounted.current) setSaveState(result?.ok ? 'saved' : 'idle')
    return result
  }

  const debouncedSave = useDebouncedCallback(() => doSave(latestRef.current), 1200)

  // Mirror edits into the store and schedule autosave — but only on a real change,
  // so opening a note (and StrictMode's double mount) never triggers a write.
  useEffect(() => {
    if (title === note.title && body === note.body) return
    dispatch(setActiveNote({ ...note, title, body }))
    setSaveState('idle')
    debouncedSave()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, body])

  // Persist any pending edit before unmounting (e.g. switching entries within 1.2s).
  useEffect(() => {
    return () => {
      mounted.current = false
      debouncedSave.flush()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-grow the body textarea (works everywhere, unlike CSS field-sizing).
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [body])

  const onManualSave = async () => {
    debouncedSave.cancel()
    const result = await doSave(latestRef.current)
    if (result?.ok) toast.success('Entrada guardada')
    else if (!result?.skipped) toast.error('No se pudo guardar la entrada')
  }

  const uploadFiles = async (files) => {
    const list = Array.from(files || []).filter((file) => file.type?.startsWith('image/'))
    if (!list.length) return
    debouncedSave.cancel()
    const result = await dispatch(startUploadingFiles(list))
    if (result.uploaded > 0) await doSave()
    if (result.uploaded === 0) toast.error('No se pudieron subir las imágenes')
    else if (result.failed > 0) toast.warning(`${result.uploaded} añadida(s), ${result.failed} con error`)
    else toast.success(result.uploaded === 1 ? 'Imagen añadida' : `${result.uploaded} imágenes añadidas`)
  }

  const onRemoveImage = async (url) => {
    debouncedSave.cancel()
    dispatch(removeImageFromActiveNote(url))
    await doSave()
  }

  const onDelete = async () => {
    debouncedSave.cancel()
    const result = await dispatch(startDeletingNote())
    if (result?.ok) toast.success('Entrada eliminada')
    else toast.error('No se pudo eliminar la entrada')
  }

  const onDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    if (event.dataTransfer?.files?.length) uploadFiles(event.dataTransfer.files)
  }

  const words = wordCount(body)

  return (
    <div
      className="flex justify-center p-4 md:p-8"
      onDragOver={(event) => {
        event.preventDefault()
        if (!isDragging) setDragging(true)
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false)
      }}
      onDrop={onDrop}
    >
      <article className="relative w-full max-w-3xl duration-300 animate-in fade-in-0 slide-in-from-bottom-1">
        <div className="paper-texture overflow-hidden rounded-2xl border border-transparent bg-card shadow-page dark:border-border dark:shadow-none">
          <header className="flex items-start justify-between gap-4 border-b border-border/60 px-5 py-5 md:px-10">
            <div className="min-w-0">
              <p className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                {dayLabel(note.date)}
              </p>
              <h2 className="font-display text-xl font-medium italic text-foreground md:text-2xl">
                {formatLongDate(note.date)}
              </h2>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                <span className="tabular-nums">{formatTime(note.date)}</span>
                <span aria-hidden>·</span>
                <span className="tabular-nums">
                  {words} {words === 1 ? 'palabra' : 'palabras'}
                </span>
                <span aria-hidden>·</span>
                <SaveStatus state={isSaving ? 'saving' : saveState} />
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => {
                  const picked = Array.from(event.target.files)
                  event.target.value = ''
                  uploadFiles(picked)
                }}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Adjuntar imagen"
                  >
                    <ImagePlus className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Adjuntar imagen</TooltipContent>
              </Tooltip>

              <Button onClick={onManualSave} disabled={isSaving} className="gap-2">
                {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                <span className="hidden sm:inline">Guardar</span>
              </Button>

              <AlertDialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Eliminar entrada"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Eliminar</TooltipContent>
                </Tooltip>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar esta entrada?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. La entrada y sus imágenes se eliminarán de
                      tu diario.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>Eliminar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </header>

          <div className="px-5 py-6 md:px-10 md:py-9">
            <div className="border-l border-rule pl-5 md:pl-8">
              <input
                name="title"
                value={title}
                onChange={onInputChange}
                placeholder="Título de la entrada"
                aria-label="Título de la entrada"
                className="w-full bg-transparent font-display text-2xl font-medium text-foreground outline-none placeholder:text-muted-foreground/50 md:text-3xl"
              />
              <textarea
                ref={bodyRef}
                name="body"
                value={body}
                onChange={onInputChange}
                placeholder="Escribe lo que está pasando…"
                aria-label="Contenido de la entrada"
                rows={1}
                className="mt-4 min-h-[44vh] w-full resize-none overflow-hidden bg-transparent font-body text-[1.05rem] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/50"
              />
            </div>

            <ImageGallery images={note.imageUrls ?? []} onRemove={onRemoveImage} />
          </div>
        </div>
      </article>

      {isDragging && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-ribbon bg-card px-10 py-8 text-center shadow-page">
            <ImagePlus className="size-8 text-ribbon" />
            <p className="font-display text-lg font-medium">Suelta tus imágenes aquí</p>
          </div>
        </div>
      )}
    </div>
  )
}

function SaveStatus({ state }) {
  return (
    <span role="status" aria-live="polite" className="inline-flex items-center gap-1">
      {state === 'saving' && (
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Loader2 className="size-3 animate-spin" /> Guardando…
        </span>
      )}
      {state === 'saved' && (
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Check className="size-3 text-ribbon" /> Guardado
        </span>
      )}
      {state === 'idle' && <span className="text-muted-foreground/80">Sin guardar</span>}
    </span>
  )
}
