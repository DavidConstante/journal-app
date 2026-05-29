import { useState } from 'react'
import { ImageIcon, X } from 'lucide-react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

export function ImageGallery({ images = [], onRemove }) {
  const [preview, setPreview] = useState(null)
  if (!images.length) return null

  return (
    <section className="mt-10">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <ImageIcon className="size-3.5" />
        {images.length} {images.length === 1 ? 'imagen' : 'imágenes'}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((url, index) => (
          <div
            key={url}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted"
          >
            <button
              type="button"
              onClick={() => setPreview(url)}
              className="block size-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
              aria-label={`Ver imagen ${index + 1}`}
            >
              <img
                src={url}
                alt={`Imagen ${index + 1} de la entrada`}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(url)}
                aria-label="Quitar imagen"
                className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-md bg-background/80 text-foreground opacity-0 shadow-soft backdrop-blur transition-opacity hover:bg-background focus-visible:opacity-100 group-hover:opacity-100"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <Dialog open={!!preview} onOpenChange={(value) => !value && setPreview(null)}>
        <DialogContent
          aria-describedby={undefined}
          className="max-w-4xl border-0 bg-transparent p-0 shadow-none"
        >
          <DialogTitle className="sr-only">Imagen de la entrada</DialogTitle>
          {preview && (
            <img
              src={preview}
              alt="Imagen de la entrada"
              className="max-h-[82vh] w-full rounded-xl object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
