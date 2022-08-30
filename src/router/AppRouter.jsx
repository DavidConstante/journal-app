import { Routes, Route, Navigate } from 'react-router-dom'

import AuthRoutes from '../auth/routes/AuthRoutes'
import JournalRoutes from '../journal/routes/Journalroutes'

import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../hooks'

const AppRouter = () => {

    const { status } = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />
    }

    return (
        <Routes>

            {
                (status === 'authenticated')
                    ? < Route path='/*' element={<JournalRoutes />} /> // Journal App
                    : <Route path='/auth/*' element={<AuthRoutes />} /> // Login and Register
            }

            <Route path='/*' element={<Navigate to='/auth/login' />} />


        </Routes>
    )
}

export default AppRouter