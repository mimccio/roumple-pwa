import { Route, Routes } from 'react-router-dom'

import { RoutineList } from '&/screens/routine-list'
import { NotFoundMain } from '&/screens/errors/not-found-main'
import { SettingsMain } from '&/screens/settings/settings-main'
import { Today } from '&/screens/today'

export function MainScreen() {
  return (
    <main className="absolute bottom-0 left-0 right-0 top-0 h-screen min-h-screen w-full flex-col  sm:w-full sm:flex-1  md:flex lg:relative lg:w-1/2 lg:border-r">
      <Routes>
        <Route path="/today/*" element={<Today />} />
        <Route path="/routines/*" element={<RoutineList />} />
        <Route path="/settings/*" element={<SettingsMain />} />

        <Route path="*" element={<NotFoundMain />} />
      </Routes>
    </main>
  )
}
