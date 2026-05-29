import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import AppRouter from '@/router/AppRouter'

export default function JournalApp() {
  return (
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <AppRouter />
      </TooltipProvider>
      <Toaster />
    </ThemeProvider>
  )
}
