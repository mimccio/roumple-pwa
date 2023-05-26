import groupBy from 'lodash/groupBy'
import { Disclosure } from '&/common/components/disclosure'
import { SCHEDULE_TYPES } from '&/modules/routine/constants'
import { Routine, ScheduleType, UpdateStatusParams } from '&/modules/routine/types'
import { getPeriodText } from '&/modules/routine/utils'
import { RoutineActionListItem } from './components'

interface Props {
  routines: Routine[] | null
  type: ScheduleType
  handleUpdateStatus: ({ routine, actionId, status }: UpdateStatusParams) => void
}

export function PeriodList({ type, routines, handleUpdateStatus }: Props) {
  const list = Object.entries(groupBy(routines, 'period'))

  let color = 'indigo'
  if (type === SCHEDULE_TYPES.weekly) color = 'sky'
  if (type === SCHEDULE_TYPES.monthly) color = 'purple'

  return (
    <div className="flex flex-col gap-8">
      {list.map((group) => (
        <div key={group[0]}>
          <Disclosure color={color} title={getPeriodText({ type, period: Number(group[0]) })}>
            {group[1].map((routine) => (
              <RoutineActionListItem key={routine.id} routine={routine} handleUpdateStatus={handleUpdateStatus} />
            ))}
          </Disclosure>
        </div>
      ))}
    </div>
  )
}
