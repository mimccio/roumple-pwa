import type { Task } from '../types'
import { editTaskSchedule } from '../mutations'
import { useMutateTask } from './use-mutate-task'
import { ScheduleType } from '&/common/types'
import { useState } from 'react'

export function useTaskSchedule(task: Task) {
  const [scheduleType, setScheduleType] = useState(task.scheduleType)
  const [period, setPeriod] = useState(task.period)
  const [date, setDate] = useState(task.date)

  const onSelectPeriod = ({ scheduleType, period }: { scheduleType: ScheduleType; period: number }) => {
    setScheduleType(scheduleType)
    setPeriod(period)
  }

  const onSelectDate = (date: Date | null) => setDate(date)

  const { mutate } = useMutateTask(editTaskSchedule)
  const onSubmit = () => mutate({ ...task, scheduleType, period, date })
  const reset = () => {
    setScheduleType(task.scheduleType)
    setPeriod(task.period)
    setDate(task.date)
  }

  return { onSelectPeriod, onSelectDate, onSubmit, scheduleType, period, date, reset }
}
