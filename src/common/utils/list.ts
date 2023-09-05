import { compareAsc } from 'date-fns'

interface Item {
  created_at: Date
  priority: number
  name: string
}

export const sortItems = (a: Item, b: Item) => {
  if (a.priority === b.priority) {
    if (a.name.toLowerCase() === b.name.toLowerCase()) return compareAsc(new Date(b.created_at), new Date(a.created_at))
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  } else {
    return b.priority - a.priority
  }
}

// const removeItem = (list, item) => {
//   const routineIndex = list.findIndex((x) => x.id === item.id)
//   if (routineIndex >= 0) return [...list.slice(0, routineIndex), ...list.slice(routineIndex + 1)]
//   return [...list, item]
// }
