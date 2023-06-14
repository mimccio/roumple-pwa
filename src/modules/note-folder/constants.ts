export const NOTE_FOLDER_KEYS = {
  all: ['NOTE_FOLDER'] as const,
  lists: () => [...NOTE_FOLDER_KEYS.all, 'LIST'] as const,
  list: ({ categoryId }: { categoryId?: string }) => [...NOTE_FOLDER_KEYS.lists(), { categoryId }] as const,
  details: () => [...NOTE_FOLDER_KEYS.all, 'DETAIL'] as const,
  detail: (id?: string) => [...NOTE_FOLDER_KEYS.details(), id] as const,
}
