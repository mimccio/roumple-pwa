import { ListSkeletonSmall } from '&/common/components/list-skeleton-small'
import { useFolderList } from '&/modules/note-folder/hooks/use-folder-list'
import { FolderItem } from './folder-item'
import { NewFolderItem } from './new-folder-item'
import { InboxPreview } from './inbox-preview'

export function FolderList() {
  const { folderList, isLoading } = useFolderList()

  return (
    <div className="flex flex-col gap-y-8 px-4">
      <InboxPreview />

      <div className="border-t border-gray-100 pt-8">
        <NewFolderItem />
        {isLoading && <ListSkeletonSmall />}
        {folderList?.map((folder) => (
          <FolderItem key={folder.id} folder={folder} />
        ))}
      </div>
    </div>
  )
}
