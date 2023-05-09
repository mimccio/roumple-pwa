import { Routes, Route } from 'react-router-dom'
import { RoutineHeader } from './routine-header'
import { RoutineDetails } from './routine-details'

export function Routine() {
  return (
    <>
      <RoutineHeader />
      <Routes>
        <Route path="activity" element={<RoutineDetails />} />
        <Route path="*" element={<RoutineDetails />} />
      </Routes>
    </>
  )
}
