import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Button, Grid, TextField, Typography, Link, Alert } from '@mui/material'
import AuthLayout from '../layout/AuthLayout'

import { useForm } from '../../hooks'
import { startGoogleSigin, startLoginWithEmailAndPassword } from '../../store/auth'
import { useMemo } from 'react'

const formData = {
    email: 'david@mail.com',
    password: '1234567890',
}

const LoginPage = () => {

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(state => state.auth);

    const { email, password, onInputChange, onResetForm } = useForm(formData);

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailAndPassword({ email, password }));
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSigin());
        console.log('Google sign in');
    }



    return (
        <AuthLayout title='Login'>

            <form onSubmit={onSubmit}
                className='animate__animated animate__fadeIn animate__faster'
            >

                <Grid container >
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='correo'
                            type="email"
                            placeholder='correo@gmail.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='contraseña'
                            type="password"
                            placeholder='contraseña'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    {/* Buttons */}
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid>


                        <Grid item xs={12} sm={6} >
                            <Button
                                disabled={isAuthenticating}
                                type='submit'
                                variant='contained'
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Button
                                disabled={isAuthenticating}
                                variant='contained'
                                fullWidth
                                onClick={onGoogleSignIn}
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Link component={RouterLink} color="inherit" to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>

                </Grid>

            </form>

        </AuthLayout>

    )
}

export default LoginPage