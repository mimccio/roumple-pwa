import { Route, Routes } from 'react-router-dom'

import { RoutineList } from '&/screens/routine-list'

export function MainScreen() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 w-full flex-col  sm:w-full  sm:flex-1  md:flex lg:relative lg:w-1/2 lg:border-r">
      <Routes>
        <Route element={<p>Hello !</p>} index />
        <Route element={<RoutineList />} path="/routines/*" />
        <Route element={<div>404</div>} path="*" />
      </Routes>
    </div>
  )
}
