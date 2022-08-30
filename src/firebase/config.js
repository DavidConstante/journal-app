import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQgV7BBDbQLIfWgWoWorNzgLCpz6jr080",
    authDomain: "react-cursos-9ad79.firebaseapp.com",
    projectId: "react-cursos-9ad79",
    storageBucket: "react-cursos-9ad79.appspot.com",
    messagingSenderId: "729081740474",
    appId: "1:729081740474:web:d791bf8195c7f1ea1dd683"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FireBaseDB = getFirestore(FirebaseApp);
