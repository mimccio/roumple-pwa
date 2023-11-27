import { db } from '@/db'

interface EditShowChecklistParams {
  id: string
  showChecklist: boolean
}

export const editRoutineShowChecklist = async ({ id, showChecklist }: EditShowChecklistParams) => {
  const { error } = await db.from('routine').update({ show_checklist: showChecklist }).eq('id', id)
  if (error) throw error
}
