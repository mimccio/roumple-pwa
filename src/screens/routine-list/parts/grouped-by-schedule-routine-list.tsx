import { useTranslation } from 'react-i18next'
import groupBy from 'lodash/groupBy'

import { SCHEDULE_TYPES } from '&/common/constants'
import { Disclosure } from '&/common/components/disclosure'

import type { Routine } from '&/modules/routine/types'
import { SimpleList } from './simple-list'

interface Props {
  list?: Routine[]
}

export function GroupedByScheduleRoutineList({ list = [] }: Props) {
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
    <div className="flex flex-col gap-4">
      {items.map((group) => {
        return (
          <div key={group[0]}>
            <Disclosure color={getTypeColor(group[0])} title={t(group[0].toLocaleLowerCase())}>
              <SimpleList routineList={group[1]} />
            </Disclosure>
          </div>
        )
      })}
    </div>
  )
}
