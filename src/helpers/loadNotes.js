import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '@/firebase/config'

/** Load all of a user's notes, newest first. */
export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('El UID del usuario no existe')

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
  const docs = await getDocs(collectionRef)

  const notes = []
  docs.forEach((doc) => notes.push({ id: doc.id, ...doc.data() }))

  return notes.sort((a, b) => (b.date ?? 0) - (a.date ?? 0))
}
