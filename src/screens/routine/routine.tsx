import { Routes, Route } from 'react-router-dom'
import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { useRoutine } from '&/modules/routine/hooks'
import { NotFoundDetails, OfflineError } from '../errors'
import { RoutineHeader } from './routine-header'
import { RoutineDetails } from './routine-details'
import { RoutineChecklist } from './checklist/routine-checklist'

export function Routine() {
  const { routine, isPaused, isLoading } = useRoutine()

  if (isLoading) return <DetailsLoadingPage />
  if (!routine && isPaused) return <OfflineError />
  if (!routine) return <NotFoundDetails />

  return (
    <>
      <RoutineHeader routine={routine} />
      <Routes>
        <Route path="checklist" element={<RoutineChecklist routine={routine} />} />
        <Route path="*" element={<RoutineDetails routine={routine} />} />
      </Routes>
    </>
  )
}
