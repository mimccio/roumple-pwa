import { compareAsc } from 'date-fns'

export const getTodayDate = () => new Date().setHours(0, 0, 0, 0)

export const sortByCreatedAtAsc = (a: { created_at?: Date }, b: { created_at?: Date }) => {
  if (b.created_at && a.created_at) return compareAsc(new Date(b.created_at), new Date(a.created_at))
  return 0
}
