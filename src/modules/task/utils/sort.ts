import { compareAsc } from 'date-fns'
import { Task } from '../types'

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

type SortType = 'DATE' | 'PRIORITY' | 'NAME'

export const sortTask = (sortType: SortType) => {
  if (sortType === 'DATE') return sortTaskByDate
}
