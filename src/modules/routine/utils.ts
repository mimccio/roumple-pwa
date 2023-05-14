import { Routine } from './types'

export const sortRoutines = (a: Routine, b: Routine) => {
  if (a.priority === b.priority) {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  } else {
    return b.priority - a.priority
  }
}
