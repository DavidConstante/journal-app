import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from '../../hooks/useForm'
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal'
import { ImageGallery } from '../components/ImageGallery'

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString()
    }, [date])

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire("Nota Actualizada", messageSaved, "success");
        }
    }, [messageSaved])



    const onSaveNote = () => {
        dispatch(startSavingNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }


    return (
        <Grid
            container
            className='animate__animated animate__fadeIn animate__faster'
            direction='row'
            justifyContent='space-between'
            alignItems='center' sx={{ mb: 1 }}
        >
            <Typography fontSize={39} fontWeight='ligth' > {dateString}</Typography>

            <Grid item>

                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                />

                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}

                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    disabled={isSaving}
                    color='primary'
                    sx={{ padding: 2 }}
                    onClick={onSaveNote}
                >
                    <SaveOutlined sx={{ fontSize: 30 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    name='title'
                    value={title}
                    placeholder='Ingrese un Título'
                    label='Título'
                    sx={{ border: 'none', mb: 1 }}
                    onChange={onInputChange}
                />

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    name='body'
                    value={body}
                    multiline
                    placeholder='¿Qué está pasando?'
                    minRows={5}
                    sx={{ border: 'none', mb: 1 }}
                    onChange={onInputChange}
                />

            </Grid>

            <Grid container justifyContent='end' >
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                </Button>
            </Grid>

            <ImageGallery images={note.imageUrls} />

        </Grid>
    )
}
