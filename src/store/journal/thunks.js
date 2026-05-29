import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '@/firebase/config'
import { fileUpload, loadNotes } from '@/helpers'

import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  setSavingError,
  updateNote,
} from './journalSlice'

export const startNewNote = () => async (dispatch, getState) => {
  dispatch(savingNewNote())
  const { uid } = getState().auth

  const newNote = { title: '', body: '', date: new Date().getTime(), imageUrls: [] }

  try {
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)
    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
    return { ok: true }
  } catch (error) {
    dispatch(setSavingError(error.message))
    return { ok: false, error: error.message }
  }
}

// Guards against the duplicate boot fetch React StrictMode triggers
// (subscribe → cleanup → subscribe) by collapsing concurrent loads for the same uid.
let inFlightUid = null

export const startLoadingNotes = () => async (dispatch, getState) => {
  const { uid } = getState().auth
  if (!uid) throw new Error('El UID del usuario no existe')
  if (inFlightUid === uid) return

  inFlightUid = uid
  try {
    dispatch(setNotes(await loadNotes(uid)))
  } catch (error) {
    dispatch(setSavingError(error.message))
  } finally {
    inFlightUid = null
  }
}

// Accepts an explicit note to persist. The editor passes the note it is editing so a
// pending autosave still targets the right entry even after the active note has switched.
export const startSavingNote = (noteOverride) => async (dispatch, getState) => {
  const { uid } = getState().auth
  const note = noteOverride ?? getState().journal.active
  if (!note) return { ok: true, skipped: true }

  dispatch(setSaving())
  try {
    const noteToFirestore = { ...note }
    delete noteToFirestore.id

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    await setDoc(docRef, noteToFirestore, { merge: true })

    dispatch(updateNote(note))
    return { ok: true }
  } catch (error) {
    dispatch(setSavingError(error.message))
    return { ok: false, error: error.message }
  }
}

export const startUploadingFiles =
  (files = []) =>
  async (dispatch) => {
    const list = Array.from(files)
    if (!list.length) return { ok: true, uploaded: 0, failed: 0 }

    dispatch(setSaving())

    const results = await Promise.allSettled(list.map((file) => fileUpload(file)))
    const urls = results
      .filter((result) => result.status === 'fulfilled' && result.value)
      .map((result) => result.value)
    const failed = results.length - urls.length

    dispatch(setPhotosToActiveNote(urls))
    return { ok: failed === 0, uploaded: urls.length, failed }
  }

export const startDeletingNote = () => async (dispatch, getState) => {
  const { uid } = getState().auth
  const { active: note } = getState().journal
  if (!note) return { ok: false }

  try {
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    await deleteDoc(docRef)
    dispatch(deleteNoteById(note.id))
    return { ok: true }
  } catch (error) {
    dispatch(setSavingError(error.message))
    return { ok: false, error: error.message }
  }
}
