export const ROUTINE_NOTE_KEYS = {
  all: ['ROUTINE_NOTE'] as const,
  byRoutineLists: () => [...ROUTINE_NOTE_KEYS.all, 'ROUTINE'] as const,
  routine: (routineId?: string) => [...ROUTINE_NOTE_KEYS.byRoutineLists(), routineId] as const,
  byNoteLists: () => [...ROUTINE_NOTE_KEYS.all, 'NOTE'] as const,
  note: (noteId?: string) => [...ROUTINE_NOTE_KEYS.byNoteLists(), noteId] as const,
}
