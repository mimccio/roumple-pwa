import { useState, useEffect } from 'react'
import type { ScheduleType } from '&/common/types'
import type { Task } from '../types'
import { editTaskSchedule } from '../mutations'
import { useMutateTask } from './use-mutate-task'

export function useTaskSchedule(task: Task) {
  const [scheduleType, setScheduleType] = useState(task.scheduleType)
  const [period, setPeriod] = useState(task.period)
  const [date, setDate] = useState(task.date ? new Date(task.date) : null)

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
    setDate(task.date ? new Date(task.date) : null)
  }

  useEffect(() => {
    setScheduleType(task.scheduleType)
    setPeriod(task.period)
    setDate(task.date ? new Date(task.date) : null)
  }, [task.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return { onSelectPeriod, onSelectDate, onSubmit, scheduleType, period, date, reset }
}
