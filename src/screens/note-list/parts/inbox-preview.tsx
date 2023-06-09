import { Link } from 'react-router-dom'
import { InboxIcon } from '@heroicons/react/24/solid'

import { ListSkeletonSmall } from '&/common/components/list-skeleton-small'
import { useNoteList } from '&/modules/note/hooks'
import { InboxPreviewItem } from './inbox-preview-item'

const LIMIT = 5

export function InboxPreview() {
  const { noteList, isLoading } = useNoteList(LIMIT)

  return (
    <div className="min-h-[80px]">
      <Link to="/notes/inbox" className="flex items-center gap-x-4 p-2">
        <InboxIcon width={20} className="text-gray-400" /> <span className="font-semibold text-gray-600">Inbox</span>
      </Link>
      <div className="ml-8 flex flex-col gap-y-1">
        {isLoading && <ListSkeletonSmall count={1} />}
        {noteList?.map((note) => (
          <InboxPreviewItem key={note.id} note={note} />
        ))}
      </div>
      {noteList && noteList?.length >= LIMIT && (
        <Link
          to="/notes/inbox"
          className="ml-8 mt-4 flex items-center justify-start gap-x-4 rounded-md p-2 text-xs font-semibold text-gray-400"
        >
          See more...
        </Link>
      )}
    </div>
  )
}
