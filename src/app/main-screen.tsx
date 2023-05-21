import { Route, Routes } from 'react-router-dom'

import { Today } from '&/screens/board/today'
import { Week } from '&/screens/board/week'
import { Month } from '&/screens/board/month'

import { RoutineList } from '&/screens/routine-list'
import { SettingsMain } from '&/screens/settings/settings-main'

import { NotFoundMain } from '&/screens/errors/not-found-main'

export function MainScreen() {
  return (
    <main className="absolute bottom-0 left-0 right-0 top-0 h-screen min-h-screen w-full flex-col pb-8  sm:w-full sm:flex-1  md:flex lg:relative lg:w-1/2 lg:border-r">
      <Routes>
        {/* Board */}
        <Route path="/today/*" element={<Today />} />
        <Route path="/week/*" element={<Week />} />
        <Route path="/month/*" element={<Month />} />
        {/* Nav */}
        <Route path="/routines/*" element={<RoutineList />} />
        <Route path="/settings/*" element={<SettingsMain />} />
        {/* catch all */}
        <Route path="*" element={<NotFoundMain />} />
      </Routes>
    </main>
  )
}
