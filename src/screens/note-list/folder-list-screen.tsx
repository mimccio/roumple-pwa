import { ListSkeletonSmall } from '&/common/components/list-skeleton-small'
import { ContentLayout } from '&/common/components/layouts'
import { useFolderList } from '&/modules/note-folder/hooks/use-folder-list'
import { FolderItem } from './parts/folder-item'
import { NewFolderItem } from './parts/new-folder-item'
import { InboxPreview } from './parts/inbox-preview'
import { NoteListHeader } from './parts/note-list-header'

export function FolderListScreen() {
  const { folderList, isLoading, category } = useFolderList()

  return (
    <>
      <NoteListHeader />
      <ContentLayout>
        <div className="flex flex-col gap-y-8 px-4">
          <InboxPreview />

          <div className="border-t border-gray-100 pt-8">
            {!category?.id && <NewFolderItem />}
            {isLoading && <ListSkeletonSmall />}
            {folderList?.map((folder) =>
              category?.id && !folder.noteCount?.[0].count ? null : <FolderItem key={folder.id} folder={folder} />
            )}
          </div>
        </div>
      </ContentLayout>
    </>
  )
}
