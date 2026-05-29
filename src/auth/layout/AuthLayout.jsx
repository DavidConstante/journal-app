import { BookMarked } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export default function AuthLayout({ children, title = '', subtitle = '' }) {
  return (
    <div className="flex min-h-dvh bg-background text-foreground">
      {/* The journal cover — a warm, leather-bound panel, consistent in both themes */}
      <aside className="paper-texture relative hidden w-[44%] max-w-2xl flex-col justify-between overflow-hidden bg-cover p-10 text-cover-foreground lg:flex">
        <div className="pointer-events-none absolute inset-y-0 right-16 w-9 bg-ribbon opacity-90 [clip-path:polygon(0_0,100%_0,100%_100%,50%_92%,0_100%)]" />
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-ribbon/10 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-ribbon text-ribbon-foreground">
            <BookMarked className="size-5" />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">Journal</span>
        </div>

        <div className="relative max-w-md">
          <p className="font-display text-3xl font-medium italic leading-snug text-cover-foreground">
            “Escribe lo que el día te deje. Las páginas en blanco guardan mejor los recuerdos.”
          </p>
          <p className="mt-4 text-sm text-cover-foreground/75">
            Un cuaderno para tus días, siempre contigo.
          </p>
        </div>

        <p className="relative text-xs text-cover-foreground/70">
          Privado · cifrado en tránsito · solo para ti
        </p>
      </aside>

      {/* The form */}
      <main className="relative flex flex-1 items-center justify-center px-6 py-10">
        <ThemeToggle className="absolute right-4 top-4" />

        <div className="w-full max-w-sm">
          <div className="mb-2 flex items-center gap-2 lg:hidden">
            <div className="flex size-8 items-center justify-center rounded-lg bg-ribbon/12 text-ribbon">
              <BookMarked className="size-4" />
            </div>
            <span className="font-display text-lg font-semibold">Journal</span>
          </div>

          <h1 className="font-display text-3xl font-medium tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}

          {children}
        </div>
      </main>
    </div>
  )
}
