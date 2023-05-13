import { Routes, Route } from 'react-router-dom'
import { RoutineHeader } from './routine-header'
import { RoutineDetails } from './routine-details'
import { useRoutineDetails } from '&/modules/routine/hooks'

export function Routine() {
  const { routine } = useRoutineDetails()

  return (
    <>
      {!routine && <p>error</p>}
      {routine && (
        <>
          <RoutineHeader routineId={routine.id} />
          <Routes>
            <Route path="activity" element={<RoutineDetails />} />
            <Route path="*" element={<RoutineDetails />} />
          </Routes>
        </>
      )}
    </>
  )
}
