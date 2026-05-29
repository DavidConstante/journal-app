import { Toaster as Sonner } from 'sonner'
import { useTheme } from '@/components/theme/theme-provider'

function Toaster(props) {
  const { resolvedTheme } = useTheme()
  return (
    <Sonner
      theme={resolvedTheme}
      position="bottom-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast !font-sans !rounded-xl !border-border !bg-popover !text-popover-foreground !shadow-page',
          title: '!font-display !font-medium',
          description: '!text-muted-foreground',
          actionButton: '!bg-primary !text-primary-foreground !rounded-md',
          cancelButton: '!bg-muted !text-muted-foreground !rounded-md',
        },
      }}
      style={{
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--popover-foreground)',
        '--normal-border': 'var(--border)',
        '--success-text': 'var(--ribbon)',
        '--error-text': 'var(--destructive)',
      }}
      {...props}
    />
  )
}

export { Toaster }
