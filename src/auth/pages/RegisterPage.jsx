import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout'

const RegisterPage = () => {
    return (
        <AuthLayout title="Register">

            <form action="">

                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre Completo'
                            type="text"
                            placeholder='David Constante'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='correo'
                            type="mail"
                            placeholder='correo@example.com'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='contraseña'
                            type="password"
                            placeholder='contraseña'
                            fullWidth
                        />
                    </Grid>

                    {/* Buttons */}
                    <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                        <Grid item xs={12} sm={12} >
                            <Button variant='contained' fullWidth>
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