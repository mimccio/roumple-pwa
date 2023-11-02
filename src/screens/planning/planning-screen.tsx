import { useState } from 'react'
import { eachDayOfInterval, endOfMonth, endOfWeek, startOfWeek } from 'date-fns'

import { ScheduleType } from '&/common/types'
import { SCHEDULE_TYPES } from '&/common/constants'
import { useCalendar } from '&/common/components/calendars/hooks'

import type { Routine } from '&/modules/routine/types'
import type { Task } from '&/modules/task/types'
import { useRoutineList } from '&/modules/routine/hooks'
import { useTaskList } from '&/modules/task/hooks'

import { MainError, OfflineError } from '../errors'
import { MainLoadingScreen } from '../main-loading-screen'
import { CalendarContent } from './parts/calendar-content'
import { DaysHeader } from './parts/days-header'
import { WeekPlanning } from './parts/week-planning'
import { MonthPlanning } from './parts/month-planning'
import { PlanningHeader } from './parts/planning-header'
import { PlanningModale } from './parts/planning-modale'

export function PlanningScreen() {
  const { routineList, showStatus: routineStatus } = useRoutineList()
  const { taskList, showStatus: taskStatus } = useTaskList()

  const [selected, setSelected] = useState<{ date: Date; scheduleType: ScheduleType }>()
  const { onNextMonth, onPreviousMonth, firstDayCurrentMonth, onThisMonth, today } = useCalendar()

  if (
    routineStatus.loading ||
    routineStatus.error ||
    routineStatus.offline ||
    taskStatus.loading ||
    taskStatus.error ||
    taskStatus.offline
  )
    return (
      <div className="flex h-full min-h-screen w-full items-center justify-center ">
        {(routineStatus.loading || routineStatus.loading) && <MainLoadingScreen />}
        {(routineStatus.error || taskStatus.error) && <MainError />}
        {(routineStatus.offline || taskStatus.offline) && <OfflineError />}
      </div>
    )

  const onSelect = ({ scheduleType, date }: { scheduleType: ScheduleType; date: Date }) =>
    setSelected({ scheduleType, date })

  const dailyRoutines = [] as Routine[]
  const weeklyRoutines = [] as Routine[]
  const monthlyRoutines = [] as Routine[]

  routineList.forEach((r) => {
    if (r.scheduleType === SCHEDULE_TYPES.daily) dailyRoutines.push(r)
    if (r.scheduleType === SCHEDULE_TYPES.weekly) weeklyRoutines.push(r)
    if (r.scheduleType === SCHEDULE_TYPES.monthly) monthlyRoutines.push(r)
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
    if (selected?.scheduleType === SCHEDULE_TYPES.daily) return dailyRoutines
    if (selected?.scheduleType === SCHEDULE_TYPES.weekly) return weeklyRoutines
    if (selected?.scheduleType === SCHEDULE_TYPES.monthly) return monthlyRoutines
    return []
  }

  const getSelectedTasks = () => {
    if (selected?.scheduleType === SCHEDULE_TYPES.daily) return dailyTasks
    if (selected?.scheduleType === SCHEDULE_TYPES.weekly) return weeklyTasks
    if (selected?.scheduleType === SCHEDULE_TYPES.monthly) return monthlyTasks
    return []
  }

  return (
    <div className="mb-4 w-full  p-2 lg:flex lg:flex-col">
      <PlanningHeader
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
        <WeekPlanning
          firstDayCurrentMonth={firstDayCurrentMonth}
          weeklyRoutines={weeklyRoutines}
          onSelect={onSelect}
          weeklyTasks={weeklyTasks}
        />
      </div>
      <MonthPlanning
        firstDayCurrentMonth={firstDayCurrentMonth}
        monthlyRoutines={monthlyRoutines}
        onSelect={onSelect}
        monthlyTasks={monthlyTasks}
      />
      <PlanningModale
        date={selected?.date}
        scheduleType={selected?.scheduleType}
        onClose={() => setSelected(undefined)}
        routines={getSelectedRoutines()}
        tasks={getSelectedTasks()}
      />
    </div>
  )
}
