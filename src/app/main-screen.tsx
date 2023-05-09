import { Route, Routes } from 'react-router-dom'

import { RoutineList } from '&/screens/routine-list'
import { NotFoundMain } from '&/screens/errors/not-found-main'
import { SettingsMain } from '&/screens/settings/settings-main'

export function MainScreen() {
  return (
    <section className="absolute bottom-0 left-0 right-0 top-0 h-screen min-h-screen w-full flex-col overflow-y-auto sm:w-full sm:flex-1  md:flex lg:relative lg:w-1/2 lg:border-r">
      <Routes>
        <Route element={<p>Hello !</p>} index />
        <Route path="/routines/*" element={<RoutineList />} />
        <Route path="/settings/*" element={<SettingsMain />} />

        <Route path="*" element={<NotFoundMain />} />
      </Routes>
    </section>
  )
}
