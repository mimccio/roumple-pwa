import { compareAsc } from 'date-fns'

import type { Routine, SortType } from '../types'
import { SORT_TYPES } from '../constants'

export const sortTaskByPriority = (a: Routine, b: Routine) => {
  if (a.priority === b.priority) {
    if (a.name.toLowerCase() === b.name.toLowerCase()) return compareAsc(new Date(b.created_at), new Date(a.created_at))
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  } else {
    return b.priority - a.priority
  }
}

export const sortTaskByName = (a: Routine, b: Routine) => {
  if (a.name.toLowerCase() === b.name.toLowerCase()) {
    if (b.priority === a.priority) return compareAsc(new Date(b.created_at), new Date(a.created_at))
    return b.priority - a.priority
  } else {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  }
}

export const sortRoutines = (sortType: SortType) => {
  if (sortType === SORT_TYPES.priority) return sortTaskByPriority
  if (sortType === SORT_TYPES.name) return sortTaskByName
}
