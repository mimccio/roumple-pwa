import { Route, Routes } from 'react-router-dom'

import { RoutineList } from '&/screens/routine-list'

export function MainScreen() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 w-full border-r bg-white lg:relative lg:w-1/2">
      <Routes>
        <Route element={<p>Hello !</p>} index />
        <Route element={<RoutineList />} path="/routines/*" />
        <Route element={<div>404</div>} path="*" />
      </Routes>
    </div>
  )
}
