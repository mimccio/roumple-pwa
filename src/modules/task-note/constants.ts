export const TASK_NOTES_KEYS = {
  all: ['TASK_NOTE'] as const,
  lists: () => [...TASK_NOTES_KEYS.all, 'LIST'] as const,
  list: ({ taskId }: { taskId?: string }) => [...TASK_NOTES_KEYS.lists(), { taskId }] as const,
}
