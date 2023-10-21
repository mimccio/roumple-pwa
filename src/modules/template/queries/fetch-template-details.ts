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
      'id, name, createdAt:created_at, description, entryId: entry_id, entryType: entry_type, entryNoteFolderId: entry_note_folder_id, categories:template_category(id, name, color), routines:template_routine(*, templateCategory:template_category(id, name, color), templateChecklist:template_routine_checklist_item(id, name)), tasks:template_task(*, templateCategory:template_category(id, name, color)), notes:template_note(*, templateCategory:template_category(id, name, color), templateNoteFolder: template_note_folder(id, name)), templateRoutineChecklistItems:template_routine_checklist_item(id, template_routine_id, name), templateTaskChecklistItems:template_task_checklist_item(id, template_task_id, name), noteFolders: template_note_folder(id, name)'
    )
    .eq('published', true)
    .eq('id', templateId)
    .returns<Template>()
    .single()

  if (error) throw error
  return data as Template
}
