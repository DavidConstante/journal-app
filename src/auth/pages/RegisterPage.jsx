import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks'
import AuthLayout from '../layout/AuthLayout'
import { startCreatingUserWithEmailAndPassword } from '../../store/auth'

const formData = {
    displayName: '',
    email: '',
    password: '',
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value) => value.length > 6, 'El password debe tener mas de 6 caracteres'],
    displayName: [(value) => value.length > 1, 'El nombre es obligatorio']
}

const RegisterPage = () => {

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(state => state.auth);

    const [formSubmited, setformSubmited] = useState(false)

    const {
        formState, displayName, email, password, onInputChange, onResetForm,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const onSubmit = (e) => {
        e.preventDefault();
        setformSubmited(true);

        if (!isFormValid) return;
        dispatch(startCreatingUserWithEmailAndPassword(formState));
        onResetForm();
    }



    return (
        <AuthLayout title="Register">

            <form onSubmit={onSubmit}>

                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre Completo'
                            type="text"
                            placeholder='David Constante'
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmited}
                            helperText='Este campo es obligatorio'
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='correo'
                            type="mail"
                            placeholder='correo@example.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmited}
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
                            error={!!passwordValid && formSubmited}
                        />
                    </Grid>

                    {/* Buttons */}
                    <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>

                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid>

                        <Grid item xs={12} sm={12} >
                            <Button
                                disabled={isCheckingAuthentication}
                                type='submit'
                                variant='contained'
                                fullWidth
                            >
                                Crear Cuenta
                            </Button>
                        </Grid>


                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 2 }}>¿Ya tienes cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to="/auth/login">
                            ingresar
                        </Link>
                    </Grid>

                </Grid>

            </form>
        </AuthLayout>
    )
}

export default RegisterPage