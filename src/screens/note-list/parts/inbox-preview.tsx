import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { InboxIcon } from '@heroicons/react/24/solid'
import { ExclamationTriangleIcon, SignalSlashIcon } from '@heroicons/react/24/outline'

import { ListSkeletonSmall } from '@/common/components/skeletons'
import { useNoteList } from '@/modules/note/hooks'
import { InboxPreviewItem } from './inbox-preview-item'

const LIMIT = 5

export function InboxPreview() {
  const { t } = useTranslation('note')
  const { noteList, show } = useNoteList(LIMIT)

  return (
    <div className="min-h-[80px]">
      <Link
        to="/notes/inbox"
        className="flex items-center gap-x-4 p-2 text-gray-400 transition-colors hover:text-gray-500"
      >
        <InboxIcon width={20} /> <span className="font-bold ">{t('inbox')}</span>
      </Link>
      <div className="ml-0 flex flex-col gap-y-1 font-normal">
        {show.error && (
          <p className="flex items-center justify-center gap-x-2 text-xs text-red-300">
            <ExclamationTriangleIcon className="w-3" />
            {t('Error fetching notes', { ns: 'note' })}
          </p>
        )}
        {show.offline && (
          <p className="flex items-center justify-center gap-x-2 text-xs text-orange-300">
            <SignalSlashIcon className="w-3" />
            {t('Offline, no note to show', { ns: 'note' })}
          </p>
        )}
        {show.loading && <ListSkeletonSmall count={1} />}
        {noteList?.map((note) => (
          <InboxPreviewItem key={note.id} note={note} />
        ))}
      </div>
      {noteList && noteList?.length >= LIMIT && (
        <Link
          to="/notes/inbox"
          className="ml-8 mt-4 flex items-center justify-start gap-x-4 rounded-md p-2 text-xs font-semibold text-gray-400"
        >
          {t('seeMore')}.
        </Link>
      )}
      {show.empty && <p className="px-2 py-1 text-gray-300">{t('empty')}</p>}
    </div>
  )
}
