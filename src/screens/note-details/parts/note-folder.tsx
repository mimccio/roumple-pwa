import { FolderIcon, InboxIcon } from '@heroicons/react/24/solid'
import { Selector } from '&/common/components/inputs/selector'
import type { Note } from '&/modules/note/types'
import { useNoteFolder } from '&/modules/note/hooks'

interface Props {
  note: Note
}

export function NoteFolder({ note }: Props) {
  const { folderList, isLoading, isError, onSelect } = useNoteFolder(note)
  const ButtonIcon = note.folder?.id ? FolderIcon : InboxIcon

  return (
    <Selector
      item={note.folder}
      options={folderList}
      isLoading={isLoading}
      isError={isError}
      onSelect={onSelect}
      ButtonIcon={ButtonIcon}
      DefaultOptionIcon={InboxIcon}
      OptionIcon={FolderIcon}
      defaultName="inbox"
    />
  )
}
