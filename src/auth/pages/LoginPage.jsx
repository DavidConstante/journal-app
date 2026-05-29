import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AlertCircle, Loader2 } from 'lucide-react'

import AuthLayout from '@/auth/layout/AuthLayout'
import { GoogleIcon } from '@/components/icons/google'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from '@/hooks'
import { startGoogleSignIn, startLoginWithEmailAndPassword } from '@/store/auth'

const initialForm = { email: '', password: '' }

export default function LoginPage() {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector((state) => state.auth)
  const { email, password, onInputChange } = useForm(initialForm)

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(startLoginWithEmailAndPassword({ email, password }))
  }

  return (
    <AuthLayout title="Bienvenido de vuelta" subtitle="Entra para seguir escribiendo tu diario.">
      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 duration-500 animate-in fade-in-0 slide-in-from-bottom-1"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            autoComplete="email"
            value={email}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={onInputChange}
            required
          />
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isAuthenticating}>
          {isAuthenticating && <Loader2 className="size-4 animate-spin" />}
          Iniciar sesión
        </Button>

        <div className="flex items-center gap-3 py-1 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          o
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => dispatch(startGoogleSignIn())}
          disabled={isAuthenticating}
        >
          <GoogleIcon className="size-4" />
          Continuar con Google
        </Button>

        <p className="pt-1 text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{' '}
          <RouterLink to="/auth/register" className="font-medium text-ribbon-strong hover:underline">
            Crea una
          </RouterLink>
        </p>
      </form>
    </AuthLayout>
  )
}
