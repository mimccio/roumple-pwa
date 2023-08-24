import { useState } from 'react'
import { eachDayOfInterval, endOfMonth, endOfWeek, startOfWeek } from 'date-fns'

import { SCHEDULE_TYPES } from '&/common/constants'
import { useCalendar } from '&/common/components/calendars/hooks'

import type { Routine } from '&/modules/routine/types'
import { useRoutineList } from '&/modules/routine/hooks'

import { MainError, OfflineError } from '../errors'
import { CalendarContent } from './parts/calendar-content'
import { DaysHeader } from './parts/days-header'
import { WeekPlaning } from './parts/week-planing'
import { MonthPlaning } from './parts/month-planing'
import { PlaningHeader } from './parts/planing-header'
import { ScheduleType } from '&/common/types'
import { PlaningModale } from './parts/planing-modale'
import { useTaskList } from '&/modules/task/hooks'
import { Task } from '&/modules/task/types'

export function PlaningScreen() {
  const { routineList, showStatus: routineStatus } = useRoutineList()
  const { taskList, showStatus: taskStatus } = useTaskList()

  const [selected, setSelected] = useState<{ date: Date; type: ScheduleType }>()
  const { onNextMonth, onPreviousMonth, firstDayCurrentMonth, onThisMonth, today } = useCalendar()

  if (routineStatus.error || taskStatus.error) return <MainError />
  if (routineStatus.offline || taskStatus.offline) return <OfflineError />

  const onSelect = ({ type, date }: { type: ScheduleType; date: Date }) => setSelected({ type, date })

  const dailyRoutines = [] as Routine[]
  const weeklyRoutines = [] as Routine[]
  const monthlyRoutines = [] as Routine[]

  routineList.forEach((r) => {
    if (r.type === SCHEDULE_TYPES.weekly) weeklyRoutines.push(r)
    if (r.type === SCHEDULE_TYPES.monthly) monthlyRoutines.push(r)
    dailyRoutines.push(r)
  })

  const dailyTasks = [] as Task[]
  const weeklyTasks = [] as Task[]
  const monthlyTasks = [] as Task[]

  taskList?.forEach((task) => {
    if (task.scheduleType === SCHEDULE_TYPES.daily) dailyTasks.push(task)
    if (task.scheduleType === SCHEDULE_TYPES.weekly) weeklyTasks.push(task)
    if (task.scheduleType === SCHEDULE_TYPES.monthly) monthlyTasks.push(task)
  })

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  })

  const getSelectedRoutines = () => {
    if (selected?.type === SCHEDULE_TYPES.daily) return dailyRoutines
    if (selected?.type === SCHEDULE_TYPES.weekly) return weeklyRoutines
    if (selected?.type === SCHEDULE_TYPES.monthly) return monthlyRoutines
    return []
  }

  const getSelectedTasks = () => {
    if (selected?.type === SCHEDULE_TYPES.daily) return dailyTasks
    if (selected?.type === SCHEDULE_TYPES.weekly) return weeklyTasks
    if (selected?.type === SCHEDULE_TYPES.monthly) return monthlyTasks
    return []
  }

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
          <CalendarContent
            days={days}
            dailyRoutines={dailyRoutines}
            today={today}
            onSelect={onSelect}
            dailyTasks={dailyTasks}
          />
        </div>
        <WeekPlaning
          firstDayCurrentMonth={firstDayCurrentMonth}
          weeklyRoutines={weeklyRoutines}
          onSelect={onSelect}
          weeklyTasks={weeklyTasks}
        />
      </div>
      <MonthPlaning
        firstDayCurrentMonth={firstDayCurrentMonth}
        monthlyRoutines={monthlyRoutines}
        onSelect={onSelect}
        monthlyTasks={monthlyTasks}
      />
      <PlaningModale
        date={selected?.date}
        scheduleType={selected?.type}
        onClose={() => setSelected(undefined)}
        routines={getSelectedRoutines()}
        tasks={getSelectedTasks()}
      />
    </div>
  )
}
