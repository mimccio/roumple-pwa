import { db } from '&/db'
import type { Template } from '../types'

interface IParams {
  queryKey: readonly ['TEMPLATE', 'DETAIL', string | undefined]
}

export const fetchTemplateDetails = async ({ queryKey }: IParams) => {
  const [, , templateId] = queryKey

  if (!templateId) throw new Error('Template id is missing')

  const { data, error } = await db
    .from('template')
    .select(
      'id, name, createdAt:created_at, description, categories:template_category(id, name, color), routines:template_routine(*, category:template_category(id, name, color)), tasks:template_task(*, category:template_category(id, name, color)), notes:template_note(*, category:template_category(id, name, color), folder: template_note_folder(id, name))'
    )
    .eq('published', true)
    .eq('id', templateId)
    .returns<Template>()
    .single()

  if (error) throw error
  return data as Template
}
