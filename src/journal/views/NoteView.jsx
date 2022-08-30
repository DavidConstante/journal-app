import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { ImageGallery } from '../components/ImageGallery'

export const NoteView = () => {
    return (
        <Grid
            container
            className='animate__animated animate__fadeIn animate__faster'
            direction='row'
            justifyContent='space-between'
            alignItems='center' sx={{ mb: 1 }}
        >
            <Typography fontSize={39} fontWeight='ligth' > 28 de Agosto, 2023</Typography>

            <Grid item>
                <Button color='primary' sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un Título'
                    label='Título'
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Qué está pasando?'
                    minRows={5}
                    sx={{ border: 'none', mb: 1 }}
                />

            </Grid>

            <ImageGallery />

        </Grid>
    )
}
