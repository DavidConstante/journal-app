import { cn } from '@/lib/utils'

function Input({ className, type = 'text', ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-10 w-full min-w-0 rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-foreground shadow-[inset_0_1px_2px_oklch(0_0_0/0.04)] outline-none transition-[color,box-shadow,border-color]',
        'placeholder:text-muted-foreground/70 selection:bg-ribbon-muted',
        'file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
        'focus-visible:border-ring focus-visible:bg-card focus-visible:ring-[3px] focus-visible:ring-ring/25',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/25',
        className
      )}
      {...props}
    />
  )
}

export { Input }
