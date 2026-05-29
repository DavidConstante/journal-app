import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AlertCircle, Loader2 } from 'lucide-react'

import AuthLayout from '@/auth/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from '@/hooks'
import { startCreatingUserWithEmailAndPassword } from '@/store/auth'

const initialForm = { displayName: '', email: '', password: '' }

const formValidations = {
  displayName: [(value) => value.trim().length >= 2, 'Escribe tu nombre.'],
  email: [(value) => /\S+@\S+\.\S+/.test(value), 'El correo no es válido.'],
  password: [(value) => value.length >= 6, 'Mínimo 6 caracteres.'],
}

export default function RegisterPage() {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector((state) => state.auth)
  const [submitted, setSubmitted] = useState(false)

  const {
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(initialForm, formValidations)

  const isCheckingAuth = useMemo(() => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    if (!isFormValid) return
    dispatch(startCreatingUserWithEmailAndPassword({ displayName, email, password }))
  }

  const fieldError = (validity) => (submitted && validity ? validity : null)

  return (
    <AuthLayout title="Crea tu diario" subtitle="Un espacio privado para escribir cada día.">
      <form
        onSubmit={onSubmit}
        noValidate
        className="mt-8 space-y-4 duration-500 animate-in fade-in-0 slide-in-from-bottom-1"
      >
        <div className="space-y-2">
          <Label htmlFor="displayName">Nombre</Label>
          <Input
            id="displayName"
            name="displayName"
            placeholder="Tu nombre"
            autoComplete="name"
            value={displayName}
            onChange={onInputChange}
            aria-invalid={!!fieldError(displayNameValid)}
            aria-describedby={fieldError(displayNameValid) ? 'displayName-error' : undefined}
          />
          {fieldError(displayNameValid) && (
            <p id="displayName-error" role="alert" className="text-xs text-destructive">
              {displayNameValid}
            </p>
          )}
        </div>

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
            aria-invalid={!!fieldError(emailValid)}
            aria-describedby={fieldError(emailValid) ? 'email-error' : undefined}
          />
          {fieldError(emailValid) && (
            <p id="email-error" role="alert" className="text-xs text-destructive">
              {emailValid}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            value={password}
            onChange={onInputChange}
            aria-invalid={!!fieldError(passwordValid)}
            aria-describedby={fieldError(passwordValid) ? 'password-error' : undefined}
          />
          {fieldError(passwordValid) && (
            <p id="password-error" role="alert" className="text-xs text-destructive">
              {passwordValid}
            </p>
          )}
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

        <Button type="submit" className="w-full" disabled={isCheckingAuth}>
          {isCheckingAuth && <Loader2 className="size-4 animate-spin" />}
          Crear cuenta
        </Button>

        <p className="pt-1 text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{' '}
          <RouterLink to="/auth/login" className="font-medium text-ribbon-strong hover:underline">
            Inicia sesión
          </RouterLink>
        </p>
      </form>
    </AuthLayout>
  )
}
