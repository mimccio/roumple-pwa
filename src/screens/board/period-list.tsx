import groupBy from 'lodash/groupBy'
import { Disclosure } from '&/common/components/disclosure'
import { SCHEDULE_TYPES } from '&/modules/routine/constants'
import { Routine, ScheduleType, UpdateStatusParams } from '&/modules/routine/types'
import { getPeriodText } from '&/modules/routine/utils'
import { RoutineActionListItem } from './components'
import { Task } from '&/modules/task/types'
import { TaskListItem } from '&/modules/task/components'

interface Props {
  list?: (Routine | Task)[]
  type: ScheduleType
  handleUpdateStatus: ({ routine, actionId, status }: UpdateStatusParams) => void
}

export function PeriodList({ type, list = [], handleUpdateStatus }: Props) {
  const items = Object.entries(groupBy(list, 'period'))

  let color = 'indigo' as 'indigo' | 'sky' | 'purple'
  if (type === SCHEDULE_TYPES.weekly) color = 'sky'
  if (type === SCHEDULE_TYPES.monthly) color = 'purple'

  return (
    <div className="flex flex-col gap-8">
      {items.map((group) => (
        <div key={group[0]}>
          <Disclosure color={color} title={getPeriodText({ type, period: Number(group[0]) })}>
            {group[1].map((item) => {
              if (Object.prototype.hasOwnProperty.call(item, 'status')) {
                return <TaskListItem key={item.id} task={item as Task} />
              } else {
                return (
                  <RoutineActionListItem
                    key={item.id}
                    routine={item as Routine}
                    handleUpdateStatus={handleUpdateStatus}
                  />
                )
              }
            })}
          </Disclosure>
        </div>
      ))}
    </div>
  )
}
