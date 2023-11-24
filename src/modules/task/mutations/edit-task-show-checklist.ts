import { db } from '&/db'

interface EditShowChecklistParams {
  id: string
  showChecklist: boolean
}

export const editTaskShowChecklist = async ({ id, showChecklist }: EditShowChecklistParams) => {
  const { error } = await db.from('task').update({ show_checklist: showChecklist }).eq('id', id)
  if (error) throw error
}
