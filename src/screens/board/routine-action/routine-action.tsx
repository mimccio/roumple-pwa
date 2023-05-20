import { useRoutine } from '&/modules/routine/hooks'
import { Header } from './header'

export function RoutineAction() {
  const { routine } = useRoutine()

  if (!routine) return null

  return (
    <>
      <Header routine={routine} />
    </>
  )
}
