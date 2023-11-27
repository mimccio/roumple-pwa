import { it, describe } from 'vitest'
import { addDays, eachDayOfInterval, lastDayOfMonth, startOfMonth, subDays } from 'date-fns'

import { STATUSES } from '@/common/constants'
import type { RoutineAction } from '@/modules/routine/types'
import { getDaySuccessPercentage, getWeekSuccessPercentage } from './get-success-percentage'

const today = new Date('01/01/2023')

// Need to add 1 day, don't know why it doesn't work in test env
const days = eachDayOfInterval({
  start: addDays(startOfMonth(today), 1),
  end: addDays(lastDayOfMonth(today), 1),
})

const oldest = days[0]

describe('getDaySuccessPercentage', () => {
  it.concurrent('should return 0 when no done status & no in progress', ({ expect }) => {
    const actions = [] as RoutineAction[]
    const recurrence = [0, 1, 2, 3, 4, 5, 6]
    expect(getDaySuccessPercentage({ actions, days, occurrence: 1, recurrence, oldest })).toEqual(0)
  })

  it.concurrent('should return 100 when no recurrence', ({ expect }) => {
    const actions = [] as RoutineAction[]
    const recurrence = [] as number[]
    expect(getDaySuccessPercentage({ actions, days: days.slice(0, 2), occurrence: 3, recurrence, oldest })).toEqual(100)
  })

  it.concurrent('should return 100 when no schedule day', ({ expect }) => {
    const actions = [] as RoutineAction[]
    expect(
      getDaySuccessPercentage({ actions, days: days.slice(0, 4), occurrence: 3, recurrence: [5, 6], oldest })
    ).toEqual(100)
  })

  it.concurrent('should return 100 when done == days.length', ({ expect }) => {
    const actions = [
      { status: STATUSES.done, doneOccurrence: 3, date: days[0] },
      { status: STATUSES.done, doneOccurrence: 3, date: days[1] },
      { status: STATUSES.done, doneOccurrence: 3, date: days[2] },
    ] as RoutineAction[]
    const recurrence = [1, 2, 3, 4, 5, 0]
    expect(getDaySuccessPercentage({ actions, days: days.slice(0, 2), occurrence: 3, recurrence, oldest })).toEqual(100)
  })

  it.concurrent('should return the right number when mixed statuses', ({ expect }) => {
    const actions = [
      { status: STATUSES.done, doneOccurrence: 3, date: days[0] }, // 1
      { status: STATUSES.todo, doneOccurrence: 2, date: days[1] }, // 2 / 3
      { status: STATUSES.inProgress, doneOccurrence: 1, date: days[2] }, // 1,5 / 3
      { status: STATUSES.inProgress, doneOccurrence: 2, date: days[3] }, // 2.5 / 3
    ] as RoutineAction[]
    const recurrence = [0, 1, 2, 3, 4, 5, 6]
    expect(getDaySuccessPercentage({ actions, days: days.slice(0, 4), occurrence: 3, recurrence, oldest })).toEqual(75)
  })

  it.concurrent('should return the right number when mixed statuses and not full recurrence', ({ expect }) => {
    const occurrence = 2
    const actions = [
      { status: STATUSES.todo, doneOccurrence: 0, date: days[1] }, // 0
      { status: STATUSES.done, doneOccurrence: occurrence, date: days[3] }, // 1
      { status: STATUSES.inProgress, doneOccurrence: 0, date: days[5] }, // 0.5/2
      { status: STATUSES.done, doneOccurrence: occurrence, date: days[8] }, // 1
      { status: STATUSES.todo, doneOccurrence: 0, date: days[10] }, // 0
      { status: STATUSES.inProgress, doneOccurrence: 1, date: days[12] }, // 1.5/2
    ] as RoutineAction[]
    expect(
      getDaySuccessPercentage({ actions, days: days.slice(0, 14), occurrence, recurrence: [1, 3, 5], oldest })
    ).toEqual(50)
  })

  it.concurrent('should return the right number when oldest is in this month', ({ expect }) => {
    const occurrence = 2
    const oldest = days[5]
    const actions = [
      { status: STATUSES.todo, doneOccurrence: 0, date: days[3] }, // 0
      { status: STATUSES.done, doneOccurrence: occurrence, date: days[5] }, // 1
      { status: STATUSES.inProgress, doneOccurrence: 0, date: days[8] }, // 0.5/2
      { status: STATUSES.done, doneOccurrence: occurrence, date: days[10] }, // 1
      { status: STATUSES.todo, doneOccurrence: 0, date: days[12] }, // 0
    ] as RoutineAction[]
    // days scheduled = 5, 11, 13 => 3
    // done points = 2.25
    // result = 75
    expect(
      getDaySuccessPercentage({ actions, days: days.slice(0, 14), occurrence, recurrence: [1, 3, 5], oldest })
    ).toEqual(75)
  })
})

describe('getWeekSuccessPercentage', () => {
  const recurrence = [0, 1]
  it.concurrent('should return 0 when no done status & no in progress', ({ expect }) => {
    const actions = [] as RoutineAction[]
    expect(getWeekSuccessPercentage({ actions, days, occurrence: 3, recurrence, oldest })).toEqual(0)
  })

  it.concurrent('should return 100 when no recurrence', ({ expect }) => {
    const actions = [] as RoutineAction[]
    const recurrence = [] as number[]
    expect(getWeekSuccessPercentage({ actions, days: days.slice(0, 2), occurrence: 3, recurrence, oldest })).toEqual(
      100
    )
  })

  it.concurrent('should return 100 when no schedule week', ({ expect }) => {
    const actions = [] as RoutineAction[]
    expect(
      getWeekSuccessPercentage({ actions, days: days.slice(0, 4), occurrence: 3, recurrence: [5, 6], oldest })
    ).toEqual(100)
  })

  it.concurrent('should return 100 when all weeks are done', ({ expect }) => {
    const actions = [
      { status: STATUSES.done, doneOccurrence: 3, date: days[0] },
      { status: STATUSES.done, doneOccurrence: 3, date: days[7] },
      { status: STATUSES.done, doneOccurrence: 3, date: days[14] },
      { status: STATUSES.done, doneOccurrence: 3, date: days[21] },
    ] as RoutineAction[]
    expect(getWeekSuccessPercentage({ actions, days, occurrence: 3, recurrence, oldest })).toEqual(100)
  })

  it.concurrent('should return the right number when mixed statuses', ({ expect }) => {
    const occurrence = 2
    const actions = [
      { status: STATUSES.done, doneOccurrence: occurrence, date: days[0] }, // 1
      { status: STATUSES.todo, doneOccurrence: 0, date: days[7] }, // 0
      { status: STATUSES.inProgress, doneOccurrence: 0, date: days[14] }, // 0.5/2
      { status: STATUSES.inProgress, doneOccurrence: 1, date: days[21] }, // 1.5/2
    ] as RoutineAction[]
    expect(getWeekSuccessPercentage({ actions, days, occurrence, recurrence, oldest })).toEqual(50)
  })

  it.concurrent('should return the right number when mixed statuses && not full recurrence', ({ expect }) => {
    const actions = [
      { status: STATUSES.inProgress, doneOccurrence: 0, date: days[0] }, // 1
      { status: STATUSES.inProgress, doneOccurrence: 1, date: days[14] }, // 1.5/2
    ] as RoutineAction[]
    expect(getWeekSuccessPercentage({ actions, days, occurrence: 2, recurrence: [0], oldest })).toEqual(50)
  })

  it.concurrent('should return the right number when oldest is in this month', ({ expect }) => {
    const occurrence = 2
    const oldest = days[5]
    const actions = [
      { status: STATUSES.todo, doneOccurrence: 0, date: subDays(days[0], 6) },
      { status: STATUSES.done, doneOccurrence: occurrence, date: days[7] },
      { status: STATUSES.done, doneOccurrence: occurrence, date: days[14] },
      { status: STATUSES.done, doneOccurrence: occurrence, date: days[21] },
      { status: STATUSES.inProgress, doneOccurrence: 1, date: days[28] },
    ] as RoutineAction[]

    expect(getWeekSuccessPercentage({ actions, days, occurrence, recurrence: [0, 1], oldest })).toEqual(75)
  })
})
