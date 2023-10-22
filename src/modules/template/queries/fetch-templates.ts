import { db } from '&/db'
import type { Language } from '&/common/types'
import { LANGUAGES } from '&/common/constants'

interface FetchTemplatesParams {
  queryKey: readonly ['TEMPLATE', 'LIST', { lang: string }]
}

export const fetchTemplates = async ({ queryKey }: FetchTemplatesParams) => {
  const [, , { lang }] = queryKey
  const language = lang as Language
  if (!Object.values(LANGUAGES).includes(language)) throw new Error('Wrong lang')

  const { data, error } = await db
    .from('template')
    .select('id, name, description, createdAt:created_at, published')
    .eq('published', true)
    .eq('lang', lang)
    .order('created_at')
    .limit(10)

  if (error) throw error
  return data
}
