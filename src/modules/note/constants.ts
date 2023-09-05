export const NOTE_KEYS = {
  all: ['NOTE'] as const,
  lists: () => [...NOTE_KEYS.all, 'LIST'] as const,
  list: ({ folderId }: { folderId?: string }) => [...NOTE_KEYS.lists(), { folderId }] as const,
  details: () => [...NOTE_KEYS.all, 'DETAIL'] as const,
  detail: (id?: string) => [...NOTE_KEYS.details(), id] as const,
  searches: () => [...NOTE_KEYS.all, 'SEARCH'] as const,
  search: ({ searchText }: { searchText?: string }) => [...NOTE_KEYS.searches(), { searchText }] as const,
}
