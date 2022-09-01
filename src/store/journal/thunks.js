import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FireBaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice";


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