import groupBy from 'lodash/groupBy'
import { motion, AnimatePresence } from 'framer-motion'

import type { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'
import { usePeriodText } from '&/common/hooks'
import { Disclosure } from '&/common/components/disclosure'

import type { Routine, UpdateStatusParams } from '&/modules/routine/types'
import type { Task } from '&/modules/task/types'
import { ItemList } from './item-list'

interface Props {
  list?: (Routine | Task)[]
  scheduleType: ScheduleType
  handleUpdateRoutineStatus: ({ routine, action, status }: UpdateStatusParams) => void
}

export function PeriodList({ scheduleType, list = [], handleUpdateRoutineStatus }: Props) {
  const { getPeriodText } = usePeriodText()

  const items = Object.entries(groupBy(list, 'period'))

  let color = 'indigo' as 'indigo' | 'sky' | 'purple'
  if (scheduleType === SCHEDULE_TYPES.weekly) color = 'sky'
  if (scheduleType === SCHEDULE_TYPES.monthly) color = 'purple'

  const listVariant = {
    visible: { opacity: 1, scaleY: 1 },
    hidden: {
      opacity: 0,
      scaleY: 0,
      height: 0,
      marginBottom: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="flex flex-col ">
      <AnimatePresence>
        {items.map((group) => (
          <motion.div
            key={group[0]}
            animate="visible"
            exit="hidden"
            className="mb-8"
            style={{ originY: 0 }}
            variants={listVariant}
          >
            <Disclosure color={color} title={getPeriodText({ scheduleType, period: Number(group[0]) })}>
              <ItemList list={group[1]} handleUpdateRoutineStatus={handleUpdateRoutineStatus} />
            </Disclosure>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
