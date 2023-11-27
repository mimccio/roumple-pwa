import { it, describe } from 'vitest'
import { STATUSES } from '@/common/constants'
import { Routine, RoutineAction } from '../types'
import { getRoutineIsDone } from './status'

describe('getRoutineIsDone', () => {
  describe.concurrent('should return true', () => {
    it.concurrent(' when status is done', ({ expect }) => {
      const action = { status: STATUSES.done } as RoutineAction
      const routine = { occurrence: 1 } as Routine
      expect(getRoutineIsDone({ routine, action })).toBe(true)
    })
    it.concurrent('when status is todo & doneOccurrence === occurrence', ({ expect }) => {
      const action = { status: STATUSES.todo, doneOccurrence: 2 } as RoutineAction
      const routine = { occurrence: 2 } as Routine
      expect(getRoutineIsDone({ routine, action })).toBe(true)
    })
    it.concurrent('when status is todo & doneOccurrence > occurrence', ({ expect }) => {
      const action = { status: STATUSES.todo, doneOccurrence: 3 } as RoutineAction
      const routine = { occurrence: 2 } as Routine
      expect(getRoutineIsDone({ routine, action })).toBe(true)
    })
  })

  describe.concurrent('should return false', () => {
    it.concurrent(' when status is todo & doneOccurrence < occurrence', ({ expect }) => {
      const action = { status: STATUSES.todo, doneOccurrence: 1 } as RoutineAction
      const routine = { occurrence: 2 } as Routine
      expect(getRoutineIsDone({ routine, action })).toBe(false)
    })
    it.concurrent('when status is todo & doneOccurrence is undefined', ({ expect }) => {
      const action = { status: STATUSES.todo } as RoutineAction
      const routine = { occurrence: 2 } as Routine
      expect(getRoutineIsDone({ routine, action })).toBe(false)
    })
    it.concurrent('when action is undefined', ({ expect }) => {
      const routine = { occurrence: 1 } as unknown as Routine
      expect(getRoutineIsDone({ routine })).toBe(false)
    })
  })
})
