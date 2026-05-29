import { BookMarked, Loader2 } from 'lucide-react'

export function CheckingAuth() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-background text-foreground">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-ribbon/12 text-ribbon shadow-soft">
        <BookMarked className="size-6" />
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        <span className="font-display text-sm italic">Abriendo tu diario…</span>
      </div>
    </div>
  )
}
