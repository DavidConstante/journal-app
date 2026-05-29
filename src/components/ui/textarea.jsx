import { cn } from '@/lib/utils'

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-20 w-full resize-none rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-foreground shadow-[inset_0_1px_2px_oklch(0_0_0/0.04)] outline-none transition-[color,box-shadow,border-color]',
        'placeholder:text-muted-foreground/70 selection:bg-ribbon-muted',
        'focus-visible:border-ring focus-visible:bg-card focus-visible:ring-[3px] focus-visible:ring-ring/25',
        'disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
