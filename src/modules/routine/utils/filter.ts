import { STATUSES } from '&/common/constants'
import type { Category } from '../../category/types'
import { Routine } from '../types'

export const filterRoutines = ({
  showDone,
  category,
  routine,
}: {
  showDone: boolean
  category: Category | null
  routine: Routine
}) => {
  if (showDone)
    return (
      routine.actions?.[0]?.status === STATUSES.done && (category?.id ? routine.category?.id === category.id : true)
    )
  if (!showDone) {
    return (
      routine.actions?.[0]?.status !== STATUSES.done && (category?.id ? routine.category?.id === category.id : true)
    )
  }
}
