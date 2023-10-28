import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { InboxIcon } from '@heroicons/react/24/solid'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

import { ListSkeleton } from '&/common/components/skeletons'
import { ContentLayout } from '&/common/components/layouts'
import { useNoteList } from '&/modules/note/hooks'
import { MainError } from '&/screens/errors'
import { NoteListItem } from './parts/note-list-item'
import { NoteListHeader } from './parts/note-list-header'

export function NoteListInboxScreen() {
  const { t } = useTranslation('note')
  const { noteList, show } = useNoteList()

  if (show.error) return <MainError />

  return (
    <>
      <NoteListHeader />
      <ContentLayout>
        <Link to="/notes" className="group flex items-center gap-x-4 p-2 px-4">
          <ChevronLeftIcon width={18} className="text-gray-300 transition-colors  group-hover:text-gray-500" />
          <InboxIcon width={20} className="text-gray-400 transition-colors group-hover:text-gray-300" />
          <span className="font-semibold text-gray-500 transition-colors  group-hover:text-gray-400">{t('inbox')}</span>
        </Link>
        <div className="flex flex-col gap-2 p-2 px-4">
          {show.loading && <ListSkeleton />}
          {noteList?.map((note) => (
            <NoteListItem key={note.id} note={note} />
          ))}
        </div>
      </ContentLayout>
    </>
  )
}
