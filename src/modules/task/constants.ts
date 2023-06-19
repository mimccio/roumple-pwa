export const TASK_KEYS = {
  all: ['TASK'] as const,
  lists: () => [...TASK_KEYS.all, 'LIST'] as const,
  list: () => [...TASK_KEYS.lists()] as const,
  details: () => [...TASK_KEYS.all, 'DETAIL'] as const,
  detail: (id?: string) => [...TASK_KEYS.details(), id] as const,
}
