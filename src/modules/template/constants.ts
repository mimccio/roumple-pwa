import { Language } from '&/common/types'

export const TEMPLATE_KEYS = {
  all: ['TEMPLATE'] as const,
  lists: () => [...TEMPLATE_KEYS.all, 'LIST'] as const,
  list: ({ lang }: { lang: Language }) => [...TEMPLATE_KEYS.lists(), { lang }] as const,
  details: () => [...TEMPLATE_KEYS.all, 'DETAIL'] as const,
  detail: (id?: string) => [...TEMPLATE_KEYS.details(), id] as const,
}

const ROUTINE = 'ROUTINE'
const TASK = 'TASK'
const NOTE = 'NOTE'

export const ENTRY_TYPES = {
  routine: ROUTINE as 'ROUTINE',
  task: TASK as 'TASK',
  note: NOTE as 'NOTE',
}
