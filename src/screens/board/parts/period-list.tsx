import { AnimatePresence, motion } from 'framer-motion'
import groupBy from 'lodash/groupBy'

import type { ScheduleType } from '@/common/types'
import { SCHEDULE_TYPES } from '@/common/constants'
import { usePeriodText } from '@/common/hooks'
import { Disclosure } from '@/common/components/disclosure'

import type { Routine, UpdateStatusParams } from '@/modules/routine/types'
import type { Task } from '@/modules/task/types'
import { ItemList } from './item-list'

interface Props {
  list?: (Routine | Task)[]
  scheduleType: ScheduleType
  handleUpdateRoutineStatus: ({ routine, action, status }: UpdateStatusParams) => void
  showDone: boolean
}

export function PeriodList({ scheduleType, list = [], handleUpdateRoutineStatus, showDone }: Props) {
  const { getPeriodText } = usePeriodText()

  const items = Object.entries(groupBy(list, 'period'))

  let color = 'indigo' as 'indigo' | 'sky' | 'purple'
  if (scheduleType === SCHEDULE_TYPES.weekly) color = 'sky'
  if (scheduleType === SCHEDULE_TYPES.monthly) color = 'purple'

  return (
    <ul>
      <AnimatePresence initial={false} key={`${showDone}`}>
        {items.map((group) => (
          <motion.li
            key={group[0]}
            animate={{ opacity: 1, x: 0, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0, height: '0px' }}
            transition={{ duration: 0.3 }}
            className="origin-top"
          >
            <Disclosure key={group[0]} color={color} title={getPeriodText({ scheduleType, period: Number(group[0]) })}>
              <ItemList list={group[1]} handleUpdateRoutineStatus={handleUpdateRoutineStatus} />
            </Disclosure>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
