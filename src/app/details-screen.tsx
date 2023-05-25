import { Route, Routes, useMatch } from 'react-router-dom'

import { cl } from '&/common/utils'
import { EmptyItem } from '&/screens/empty-item'
import { Routine } from '&/screens/routine'
import { NotFoundDetails } from '&/screens/errors/not-found-details'
import { SettingsDetails } from '&/screens/settings/settings-details'
import { RoutineAction } from '&/screens/board/routine-action'

export function DetailsScreen() {
  const showDetails = useMatch('/:nav/d/*')

  return (
    <section
      className={cl(
        'no-scrollbar absolute bottom-0 left-0 right-0 top-0 h-screen min-h-screen w-full overflow-y-auto bg-white lg:relative lg:w-1/2',
        showDetails ? 'z-10 lg:z-0' : '-z-10 lg:z-0'
      )}
    >
      <Routes>
        <Route path=":nav/d/routine/:routineId/*" element={<Routine />} />
        <Route path=":nav/d/action/:routineId/*" element={<RoutineAction />} />

        <Route path="settings" element={<SettingsDetails />} />

        <Route path=":nav/d/*" element={<NotFoundDetails />} />
        <Route path="*" element={<EmptyItem />} />
      </Routes>
    </section>
  )
}
