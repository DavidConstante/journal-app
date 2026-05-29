import { useSelector } from 'react-redux'

import JournalLayout from '../layout/JournalLayout'
import { EmptyState } from '../views/EmptyState'
import { NoteEditor } from '../views/NoteEditor'

export default function JournalPage() {
  const active = useSelector((state) => state.journal.active)

  return (
    <JournalLayout>
      {active ? <NoteEditor key={active.id} /> : <EmptyState />}
    </JournalLayout>
  )
}
