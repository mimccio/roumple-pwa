import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import groupBy from 'lodash/groupBy'

import { SCHEDULE_TYPES } from '&/common/constants'
import { Disclosure } from '&/common/components/disclosure'

import type { Routine } from '&/modules/routine/types'
import { SimpleList } from './simple-list'

interface Props {
  list?: Routine[]
  archived: boolean
}

export function GroupedByScheduleRoutineList({ list = [], archived }: Props) {
  const { t } = useTranslation('schedule')
  const items = Object.entries(groupBy(list, 'scheduleType')).sort((a, b) => {
    if (a[0] === SCHEDULE_TYPES.daily) return -1
    if (a[0] === SCHEDULE_TYPES.weekly && b[0] === SCHEDULE_TYPES.daily) return 1
    if (a[0] === SCHEDULE_TYPES.weekly && b[0] === SCHEDULE_TYPES.monthly) return -1
    if (a[0] === SCHEDULE_TYPES.monthly) return 1
    return 1
  })

  const getTypeColor = (scheduleType: string) => {
    let color = 'indigo' as 'indigo' | 'sky' | 'purple'
    if (scheduleType === SCHEDULE_TYPES.weekly) color = 'sky'
    if (scheduleType === SCHEDULE_TYPES.monthly) color = 'purple'
    return color
  }

  return (
    <ul className="flex flex-col gap-4">
      <AnimatePresence initial={false} key={`${archived}`}>
        {items.map((group) => {
          return (
            <motion.li
              key={group[0]}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, x: 0, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0, height: '0px', marginBottom: '0px' }}
              transition={{ duration: 0.3 }}
              className="origin-top"
            >
              <Disclosure color={getTypeColor(group[0])} title={t(group[0].toLocaleLowerCase())}>
                <SimpleList routineList={group[1]} />
              </Disclosure>
            </motion.li>
          )
        })}
      </AnimatePresence>
    </ul>
  )
}
