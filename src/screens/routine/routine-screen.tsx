import { Routes, Route } from 'react-router-dom'

import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { useRoutine } from '&/modules/routine/hooks'

import { NotFoundDetails, OfflineError } from '../errors'
import { RoutineNavbar } from './nav'
import { RoutineDetails } from './details'

export function RoutineScreen() {
  const { routine, isPaused, isLoading } = useRoutine()

  if (isLoading) return <DetailsLoadingPage />
  if (!routine && isPaused) return <OfflineError />
  if (!routine) return <NotFoundDetails />

  return (
    <>
      <RoutineNavbar routine={routine} />
      <Routes>
        <Route path="*" element={<RoutineDetails routine={routine} />} />
      </Routes>
    </>
  )
}
