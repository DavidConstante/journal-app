import { Navigate, Route, Routes } from 'react-router-dom'

import AuthRoutes from '@/auth/routes/AuthRoutes'
import JournalRoutes from '@/journal/routes/JournalRoutes'
import { CheckingAuth } from '@/ui'
import { useCheckAuth } from '@/hooks'

export default function AppRouter() {
  const { status } = useCheckAuth()

  if (status === 'checking') return <CheckingAuth />

  const isAuthenticated = status === 'authenticated'

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route
        path="/*"
        element={<Navigate to={isAuthenticated ? '/' : '/auth/login'} replace />}
      />
    </Routes>
  )
}
