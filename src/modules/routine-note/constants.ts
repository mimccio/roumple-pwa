export const ROUTINE_NOTE_KEYS = {
  all: ['ROUTINE_NOTE'] as const,
  lists: () => [...ROUTINE_NOTE_KEYS.all, 'LIST'] as const,
  list: (routineId?: string) => [...ROUTINE_NOTE_KEYS.lists(), routineId] as const,
}
