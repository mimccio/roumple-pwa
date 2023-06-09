import { Route, Routes, useMatch } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { cl } from '&/common/utils'
import { FatalError, NotFoundDetails } from '&/screens/errors'
import { EmptyItem } from '&/screens/empty-item'
import { SettingsDetails } from '&/screens/settings/settings-details'
import { CategoryDetailsScreen } from '&/screens/categories/category-details-screen'
import { RoutineScreen } from '&/screens/routine'
import { NoteDetailsScreen } from '&/screens/note-details'

export function DetailsScreen() {
  const matchNav = useMatch('/:nav/d/*')
  const matchSubNav = useMatch('/:nav/:subnav/d/*')
  const showDetails = matchNav || matchSubNav

  return (
    <section
      className={cl(
        'no-scrollbar absolute bottom-0 left-0 right-0 top-0 flex h-screen min-h-screen w-full flex-col overflow-y-auto bg-white lg:relative lg:w-1/2',
        showDetails ? 'z-10 lg:z-0' : '-z-10 lg:z-0'
      )}
    >
      <ErrorBoundary fallback={<FatalError />}>
        <Routes>
          <Route path=":nav/d/routine/:routineId/*" element={<RoutineScreen />} />
          <Route path=":nav/d/routine/:routineId/note/:noteId/*" element={<NoteDetailsScreen />} />
          <Route path=":nav/:folderId/d/note/:noteId/*" element={<NoteDetailsScreen />} />

          <Route path="categories" element={<CategoryDetailsScreen />} />
          <Route path="settings" element={<SettingsDetails />} />

          <Route path=":nav/d/*" element={<NotFoundDetails />} />
          <Route path="*" element={<EmptyItem />} />
        </Routes>
      </ErrorBoundary>
    </section>
  )
}
