import { Grid, Typography } from '@mui/material'
import React from 'react'

function AuthLayout({ children, title = '' }) {
    return (

        <Grid container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: '4' }}
        >

            <Grid item
                className='shadow-md'
                xs={3}
                sx={{
                    width: { sm: 450 },
                    backgroundColor: "white",
                    padding: 3,
                    borderRadius: 2
                }}
            >
                <Typography variant='h5' sx={{ mb: 1 }}>{title}</Typography>

                {children}

            </Grid>
        </Grid>

    )
}

export default AuthLayout