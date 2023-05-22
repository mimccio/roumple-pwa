import { Routes, Route } from 'react-router-dom'
import { RoutineHeader } from './routine-header'
import { RoutineDetails } from './routine-details'
import { useRoutine } from '&/modules/routine/hooks'
import { NotFoundDetails } from '../errors/not-found-details'

export function Routine() {
  const { routine } = useRoutine()

  if (!routine) {
    return <NotFoundDetails />
  }

  return (
    <>
      <RoutineHeader routine={routine} />
      <Routes>
        {/* <Route path="activity" element={<RoutineDetails />} /> */}
        <Route path="*" element={<RoutineDetails routine={routine} />} />
      </Routes>
    </>
  )
}
