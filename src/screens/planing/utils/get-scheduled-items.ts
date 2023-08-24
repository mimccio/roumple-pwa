import { SCHEDULE_TYPES } from '&/common/constants'
import { ScheduleType } from '&/common/types'
import { Routine } from '&/modules/routine/types'
import { Task } from '&/modules/task/types'
import {
  compareAsc,
  getDay,
  getMonth,
  getWeek,
  isSameDay,
  isSameMonth,
  isSameWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns'

const getDailyScheduledRoutines = ({ date, routines }: { date: Date; routines: Routine[] }) =>
  routines.filter((r) => compareAsc(date, new Date(r.created_at)) >= 0 && r.daily_recurrence.includes(getDay(date)))

const getWeeklyScheduledRoutines = ({ date, routines }: { date: Date; routines: Routine[] }) =>
  routines.filter(
    (r) => compareAsc(date, startOfWeek(new Date(r.created_at))) >= 0 && r.daily_recurrence.includes(getWeek(date) % 2)
  )

const getMonthlyScheduledRoutines = ({ date, routines }: { date: Date; routines: Routine[] }) =>
  routines.filter(
    (r) => compareAsc(date, startOfMonth(new Date(r.created_at))) >= 0 && r.monthly_recurrence.includes(getMonth(date))
  )

const getScheduledRoutines = ({ type, date, routines }: { type?: ScheduleType; date: Date; routines: Routine[] }) => {
  if (type === SCHEDULE_TYPES.daily) return getDailyScheduledRoutines({ date, routines })
  if (type === SCHEDULE_TYPES.weekly) return getWeeklyScheduledRoutines({ date, routines })
  if (type === SCHEDULE_TYPES.monthly) return getMonthlyScheduledRoutines({ date, routines })
  return []
}

const getDailyScheduledTask = ({ tasks, date }: { tasks: Task[]; date: Date }) =>
  tasks.filter((t) => t.date && isSameDay(new Date(t.date), date))

const getWeeklyScheduledTask = ({ tasks, date }: { tasks: Task[]; date: Date }) =>
  tasks.filter((t) => t.date && isSameWeek(new Date(t.date), date, { weekStartsOn: 1 }))

const getMonthlyScheduledTask = ({ tasks, date }: { tasks: Task[]; date: Date }) =>
  tasks.filter((t) => t.date && isSameMonth(new Date(t.date), date))

const getScheduledTask = ({ tasks, type, date }: { tasks: Task[]; date: Date; type: ScheduleType }) => {
  if (type === SCHEDULE_TYPES.daily) return getDailyScheduledTask({ date, tasks })
  if (type === SCHEDULE_TYPES.weekly) return getWeeklyScheduledTask({ date, tasks })
  if (type === SCHEDULE_TYPES.monthly) return getMonthlyScheduledTask({ date, tasks })
  return []
}

export const mergeTaskAndRoutines = ({
  tasks,
  type,
  date,
  routines,
}: {
  tasks: Task[]
  date: Date
  type: ScheduleType
  routines: Routine[]
}) => {
  const scheduledRoutines = getScheduledRoutines({ type, date, routines })
  const scheduledTasks = getScheduledTask({ type, date, tasks })
  return [...scheduledRoutines, ...scheduledTasks].sort((a, b) => b.priority - a.priority)
}
