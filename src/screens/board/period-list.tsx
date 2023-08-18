import groupBy from 'lodash/groupBy'

import type { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'
import { usePeriodText } from '&/common/hooks'
import { Disclosure } from '&/common/components/disclosure'

import type { Routine, UpdateStatusParams } from '&/modules/routine/types'
import type { Task } from '&/modules/task/types'
import { TaskListItem } from '&/modules/task/components'
import { RoutineActionListItem } from './components'

interface Props {
  list?: (Routine | Task)[]
  type: ScheduleType
  handleUpdateStatus: ({ routine, action, status }: UpdateStatusParams) => void
}

export function PeriodList({ type, list = [], handleUpdateStatus }: Props) {
  const { getPeriodText } = usePeriodText()

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
