import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FireBaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";


export const startNewNote = () => {
    return async (dispatch, getState) => { //getState obtains all the redux store
        console.log('Start a new Note - thunk');
        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FireBaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote); // (place in collection, note to save)

        newNote.id = newDoc.id;




        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');

        dispatch(setNotes(await loadNotes(uid)));

    }
}

export const startSavingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const fileUploadPromises = [];

        //Create a array of promises
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photosUrl = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrl))

        console.log(photosUrl);
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}
