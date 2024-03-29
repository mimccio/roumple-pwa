import { Status } from '&/common/types'

export const getItemUrl = (item: { status?: Status; id: string }) => {
  if (Object.prototype.hasOwnProperty.call(item, 'status')) return `/tasks/d/task/${item.id}`
  return `/routines/d/routine/${item.id}`
}
