import { useTranslation } from 'react-i18next'
import { ListSkeleton } from '@/common/components/skeletons'
import { useNoteList } from '@/modules/note/hooks/use-note-list'
import { MainError, OfflineError } from '@/screens/errors'
import { NoteListItem } from './note-list-item'

export function NoteListFolder() {
  const { t } = useTranslation('note')
  const { noteList, show } = useNoteList()

  if (show.error) return <MainError />
  if (show.offline) return <OfflineError />

  return (
    <div className="flex flex-col gap-2 p-2 px-4">
      {show.loading && <ListSkeleton />}
      {show.empty && <p className="ml-8 text-sm font-semibold text-gray-300">{t('emptyFolder')}</p>}
      {noteList?.map((note) => (
        <NoteListItem key={note.id} note={note} />
      ))}
    </div>
  )
}
