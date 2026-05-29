import { BookMarked, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MobileTopbar({ onMenu }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/90 px-3 backdrop-blur lg:hidden">
      <Button variant="ghost" size="icon" onClick={onMenu} aria-label="Abrir menú">
        <Menu className="size-5" />
      </Button>
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-md bg-ribbon text-ribbon-foreground">
          <BookMarked className="size-4" />
        </div>
        <span className="font-display text-base font-semibold">Journal</span>
      </div>
    </header>
  )
}
