import { db } from '@/db'

interface FetchTemplatesParams {
  queryKey: readonly ['TEMPLATE', 'LIST', { lang: string }]
}

export const fetchTemplates = async ({ queryKey }: FetchTemplatesParams) => {
  const [, , { lang }] = queryKey

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
