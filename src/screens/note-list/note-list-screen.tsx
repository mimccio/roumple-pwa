import { Navigate, Route, Routes } from 'react-router-dom'

import { ContentLayout } from '&/common/components/layouts'
import { NoteListHeader } from './parts/note-list-header'
import { FolderList } from './parts/folder-list'
import { NoteListInbox } from './parts/note-list-inbox'
import { NoteListFolder } from './parts/note-list-folder'

export function NoteListScreen() {
  return (
    <>
      <NoteListHeader />
      <ContentLayout>
        <Routes>
          <Route path="folders/*" element={<FolderList />} />
          <Route index element={<Navigate to="folders" />} />
          <Route path="inbox/*" element={<NoteListInbox />} />
          <Route path=":folderId/*" element={<NoteListFolder />} />
        </Routes>
      </ContentLayout>
    </>
  )
}