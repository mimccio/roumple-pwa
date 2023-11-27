import { ContentLayout } from '@/common/components/layouts'
import { useNoteFolderDetails } from '@/modules/note-folder/hooks'
import { MainError, OfflineError } from '@/screens/errors'
import { MainLoadingScreen } from '../main-loading-screen'
import { FolderTitle } from './parts/folder-title'
import { NoteListFolder } from './parts/note-list-folder'
import { NoteListHeader } from './parts/note-list-header'

export function NoteListByFolderScreen() {
  const { folder, show } = useNoteFolderDetails()

  if (show.offline) return <OfflineError />
  if (show.error) return <MainError />
  if (show.loading) return <MainLoadingScreen />

  return (
    <>
      <NoteListHeader />
      <ContentLayout>
        {folder && <FolderTitle folder={folder} />}
        <NoteListFolder />
      </ContentLayout>
    </>
  )
}
