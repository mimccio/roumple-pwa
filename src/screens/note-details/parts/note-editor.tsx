import { DocumentEditor } from '&/common/components/document-editor'
import type { Note } from '&/modules/note/types'
import { useEditNoteContent } from '&/modules/note/hooks/use-edit-note-content'

interface Props {
  note: Note
}

export function NoteEditor({ note }: Props) {
  const { submit } = useEditNoteContent(note)

  return <DocumentEditor content={note.content} id={note.id} submit={submit} forceTitle />
}
