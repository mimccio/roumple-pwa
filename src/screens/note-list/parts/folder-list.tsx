import { InboxIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { FolderItem } from './folder-item'
import { NewFolderItem } from './new-folder-item'
import { useFolderList } from '&/modules/note-folder/hooks/use-folder-list'
import { ListSkeletonSmall } from '&/common/components/list-skeleton-small'

export function FolderList() {
  const { folderList, isLoading } = useFolderList()

  return (
    <div className="flex flex-col p-4">
      <NewFolderItem />
      <Link to="/notes/inbox" className="flex items-center gap-x-4 p-2">
        <InboxIcon width={20} className="text-gray-500" /> <span className="font-semibold text-gray-600">Inbox</span>
      </Link>
      {isLoading && <ListSkeletonSmall />}

      {folderList?.map((folder) => (
        <FolderItem key={folder.id} folder={folder} />
      ))}
    </div>
  )
}
