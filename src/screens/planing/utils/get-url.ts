export const getUrl = (item: { type?: string; id: string }) =>
  item.type ? `/routines/d/routine/${item.id}` : `/tasks/d/task/${item.id}`
