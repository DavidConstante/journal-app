import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/theme/theme-provider'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function ThemeToggle({ className, ...props }) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={cn('relative', className)}
          aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo noche'}
          {...props}
        >
          <Sun
            className={cn(
              'size-4 transition-all duration-300',
              isDark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            )}
          />
          <Moon
            className={cn(
              'absolute size-4 transition-all duration-300',
              isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
            )}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{isDark ? 'Modo claro' : 'Modo noche'}</TooltipContent>
    </Tooltip>
  )
}
