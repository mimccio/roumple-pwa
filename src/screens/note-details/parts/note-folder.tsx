import { Selector } from '&/common/components/inputs/selector'
import { useNoteFolder } from '&/modules/note/hooks'
import { Note } from '&/modules/note/types'
import { FolderIcon } from '@heroicons/react/24/outline'

interface Props {
  note: Note
}

export function NoteFolder({ note }: Props) {
  const { folderList, isLoading, error, onSelect } = useNoteFolder(note)

  return (
    <Selector
      item={note.folder}
      options={folderList}
      isLoading={isLoading}
      isError={Boolean(error)}
      onSelect={onSelect}
      Icon={FolderIcon}
    />
  )
}
