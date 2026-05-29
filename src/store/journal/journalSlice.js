import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    isLoading: true,
    errorMessage: null,
    searchTerm: '',
    notes: [],
    active: null,
    // active shape: { id, title, body, date, imageUrls: [] }
  },
  reducers: {
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload
    },
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, { payload }) => {
      state.notes.unshift(payload)
      state.isSaving = false
    },
    setActiveNote: (state, { payload }) => {
      state.active = payload
    },
    setNotes: (state, { payload }) => {
      state.notes = payload
      state.isLoading = false
    },
    setSaving: (state) => {
      state.isSaving = true
      state.errorMessage = null
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false
      state.notes = state.notes.map((note) => (note.id === payload.id ? payload : note))
    },
    setPhotosToActiveNote: (state, { payload }) => {
      if (!state.active) return
      state.active.imageUrls = [...(state.active.imageUrls ?? []), ...payload]
      state.isSaving = false
    },
    removeImageFromActiveNote: (state, { payload }) => {
      if (!state.active) return
      state.active.imageUrls = (state.active.imageUrls ?? []).filter((url) => url !== payload)
    },
    clearNotesLogout: (state) => {
      state.isSaving = false
      state.isLoading = false
      state.errorMessage = null
      state.searchTerm = ''
      state.notes = []
      state.active = null
    },
    deleteNoteById: (state, { payload }) => {
      if (state.active?.id === payload) state.active = null
      state.notes = state.notes.filter((note) => note.id !== payload)
    },
    setSavingError: (state, { payload }) => {
      state.isSaving = false
      state.errorMessage = payload
    },
  },
})

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  removeImageFromActiveNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  setSavingError,
  setSearchTerm,
  updateNote,
} = journalSlice.actions
