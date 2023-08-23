import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { eachDayOfInterval, endOfMonth, endOfWeek, startOfWeek } from 'date-fns'

import orderCompletedImg from '&/assets/illustrations/order-completed.png'
import { SCHEDULE_TYPES } from '&/common/constants'
import { useCalendar } from '&/common/components/calendars/hooks'
import { EmptyScreen } from '&/common/components/empty-screen'

import type { Routine } from '&/modules/routine/types'
import { useRoutineList } from '&/modules/routine/hooks'

import { MainError, OfflineError } from '../errors'
import { CalendarContent } from './parts/calendar-content'
import { DaysHeader } from './parts/days-header'
import { WeekPlaning } from './parts/week-planing'
import { MonthPlaning } from './parts/month-planing'
import { PlaningHeader } from './parts/planing-header'
import { ScheduleType } from '&/common/types'

export function PlaningScreen() {
  const { t } = useTranslation('routine')
  const { routineList, showStatus } = useRoutineList()
  const [selected, setSelected] = useState({})
  const { onNextMonth, onPreviousMonth, firstDayCurrentMonth, onThisMonth, today } = useCalendar()

  console.log('selected :', selected) // TODO: create modale to show list of selected date

  const onSelect = ({ type, date }: { type: ScheduleType; date: Date }) => setSelected({ type, date })

  const dailyRoutines = [] as Routine[]
  const weeklyRoutines = [] as Routine[]
  const monthlyRoutines = [] as Routine[]

  routineList.forEach((r) => {
    if (r.type === SCHEDULE_TYPES.weekly) weeklyRoutines.push(r)
    if (r.type === SCHEDULE_TYPES.monthly) monthlyRoutines.push(r)
    dailyRoutines.push(r)
  })

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  })

  if (showStatus.error) return <MainError />
  if (showStatus.offline) return <OfflineError />
  if (showStatus.empty) return <EmptyScreen opacity text={t('noRoutine')} image={orderCompletedImg} />

  return (
    <div className="mb-4 w-full  p-2 lg:flex lg:flex-col">
      <PlaningHeader
        date={firstDayCurrentMonth}
        onNextMonth={onNextMonth}
        onPreviousMonth={onPreviousMonth}
        today={today}
        onThisMonth={onThisMonth}
      />
      <div className="grid grid-cols-8 ">
        <div className="col-span-7 rounded-t-md  border lg:flex lg:flex-col ">
          <DaysHeader />
          <CalendarContent days={days} dailyRoutines={dailyRoutines} today={today} onSelect={onSelect} />
        </div>
        <WeekPlaning firstDayCurrentMonth={firstDayCurrentMonth} weeklyRoutines={weeklyRoutines} onSelect={onSelect} />
      </div>
      <MonthPlaning firstDayCurrentMonth={firstDayCurrentMonth} monthlyRoutines={monthlyRoutines} onSelect={onSelect} />
    </div>
  )
}
