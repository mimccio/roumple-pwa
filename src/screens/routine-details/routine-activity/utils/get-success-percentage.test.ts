import { it, describe } from 'vitest'
import { eachDayOfInterval, lastDayOfMonth, startOfMonth } from 'date-fns'
import { getSuccessPercentage } from './get-success-percentage'
import { RoutineAction } from '&/modules/routine/types'
import { STATUSES } from '&/common/constants'

describe('getSuccessPercentage', () => {
  const today = new Date('1/01/2023')

  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: lastDayOfMonth(today),
  })

  it.concurrent('should return 0 when no done status & no in progress', ({ expect }) => {
    const actions = [] as RoutineAction[]
    const recurrence = [0, 1, 2, 3, 4, 5, 6]
    expect(getSuccessPercentage({ actions, days, occurrence: 3, recurrence })).toEqual(0)
  })

  it.concurrent('should return 100 when no recurrence', ({ expect }) => {
    const actions = [] as RoutineAction[]
    const recurrence = [] as number[]
    expect(getSuccessPercentage({ actions, days: days.slice(0, 2), occurrence: 3, recurrence })).toEqual(100)
  })

  it.only.concurrent('should return 100 when no schedule day', ({ expect }) => {
    const actions = [] as RoutineAction[]
    expect(getSuccessPercentage({ actions, days: days.slice(0, 4), occurrence: 3, recurrence: [5, 6] })).toEqual(100)
  })

  it.concurrent('should return 100 when done == days.length', ({ expect }) => {
    const actions = [
      { status: STATUSES.done, doneOccurrence: 3, date: days[0] },
      { status: STATUSES.done, doneOccurrence: 3, date: days[1] },
      { status: STATUSES.done, doneOccurrence: 3, date: days[2] },
    ] as RoutineAction[]
    const recurrence = [1, 2, 3, 4, 5, 0]
    expect(getSuccessPercentage({ actions, days: days.slice(0, 2), occurrence: 3, recurrence })).toEqual(100)
  })

  it.concurrent('should return the right number when mixed statuses', ({ expect }) => {
    const actions = [
      { status: STATUSES.done, doneOccurrence: 3, date: days[0] }, // 1
      { status: STATUSES.todo, doneOccurrence: 2, date: days[1] }, // 2 / 3
      { status: STATUSES.inProgress, doneOccurrence: 1, date: days[2] }, // 1,5 / 3
      { status: STATUSES.inProgress, doneOccurrence: 2, date: days[3] }, // 2.5 / 3
    ] as RoutineAction[]
    const recurrence = [0, 1, 2, 3, 4, 5, 6]
    expect(getSuccessPercentage({ actions, days: days.slice(0, 4), occurrence: 3, recurrence })).toEqual(75)
  })
})
