import { db } from '&/db'
import type { Language } from '&/common/types'
import { LANGUAGES } from '&/common/constants'

interface FetchTemplatesParams {
  queryKey: readonly ['TEMPLATE', 'LIST', { lang: string }]
}

export const fetchTemplates = async ({ queryKey }: FetchTemplatesParams) => {
  const [, , { lang }] = queryKey
  let language = lang as Language
  if (!Object.values(LANGUAGES).includes(language)) language = LANGUAGES.en

  const { data, error } = await db
    .from('template')
    .select('id, name, description, createdAt:created_at, published')
    .eq('published', true)
    .eq('lang', language)
    .order('created_at')
    .limit(10)

  if (error) throw error
  return data
}
