import { Navigate, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { Today } from '&/screens/board/today'
import { Week } from '&/screens/board/week'
import { Month } from '&/screens/board/month'

import { RoutineList } from '&/screens/routine-list'
import { SettingsMain } from '&/screens/settings/settings-main'
import { Categories } from '&/screens/categories'
import { FatalError, NotFoundMain } from '&/screens/errors'
import { FolderListScreen, NoteListByFolderScreen, NoteListInboxScreen } from '&/screens/note-list'
import { TaskListScreen } from '&/screens/task-list'

export function MainScreen() {
  return (
    <main className="absolute bottom-0 left-0 right-0 top-0 h-screen min-h-screen w-full flex-col sm:w-full sm:flex-1  md:flex lg:relative lg:w-1/2 lg:border-r">
      <ErrorBoundary fallback={<FatalError />}>
        <Routes>
          {/* Board */}
          <Route path="/today/*" element={<Today />} />
          <Route path="/week/*" element={<Week />} />
          <Route path="/month/*" element={<Month />} />
          {/* Nav */}
          <Route path="/routines/*" element={<RoutineList />} />
          <Route path="/tasks/*" element={<TaskListScreen />} />

          <Route path="/notes" element={<Navigate to="folders" />} />
          <Route path="/notes/inbox/*" element={<NoteListInboxScreen />} />
          <Route path="/notes/folders/*" element={<FolderListScreen />} />
          <Route path="/notes/:folderId/*" element={<NoteListByFolderScreen />} />

          <Route path="/categories/*" element={<Categories />} />
          <Route path="/settings/*" element={<SettingsMain />} />
          {/* catch all */}
          <Route path="*" element={<NotFoundMain />} />
        </Routes>
      </ErrorBoundary>
    </main>
  )
}
