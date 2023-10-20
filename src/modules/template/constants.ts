export const TEMPLATE_KEYS = {
  all: ['TEMPLATE'] as const,
  lists: () => [...TEMPLATE_KEYS.all, 'LIST'] as const,
  list: () => [...TEMPLATE_KEYS.lists()] as const,
  details: () => [...TEMPLATE_KEYS.all, 'DETAIL'] as const,
  detail: (id?: string) => [...TEMPLATE_KEYS.details(), id] as const,
}
