import { compareAsc } from 'date-fns'
import { SortType, Task } from '../types'
import { SORT_TYPES } from '../constants'

export const sortTaskByDate = (a: Task, b: Task) => {
  if (a.date == null) return 1
  if (b.date == null) return -1
  if (new Date(a.date) === new Date(b.date)) {
    if (a.priority === b.priority) {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    } else {
      return b.priority - a.priority
    }
  } else {
    return compareAsc(new Date(a.date), new Date(b.date))
  }
}

export const sortTaskByPriority = (a: Task, b: Task) => {
  if (a.priority === b.priority) {
    if (a.name.toLowerCase() === b.name.toLowerCase()) return compareAsc(new Date(b.created_at), new Date(a.created_at))
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  } else {
    return b.priority - a.priority
  }
}

export const sortTaskByName = (a: Task, b: Task) => {
  if (a.name.toLowerCase() === b.name.toLowerCase()) {
    if (b.priority === a.priority) return compareAsc(new Date(b.created_at), new Date(a.created_at))
    return b.priority - a.priority
  } else {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  }
}

export const sortTask = (sortType: SortType) => {
  if (sortType === SORT_TYPES.date) return sortTaskByDate
  if (sortType === SORT_TYPES.priority) return sortTaskByPriority
  if (sortType === SORT_TYPES.name) return sortTaskByName
}
