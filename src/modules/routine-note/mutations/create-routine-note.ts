import { db } from '@/db'
import { getUserId } from '@/modules/utils'
import { RoutineNote } from '../types'

export const createRoutineNote = async ({ id, note, routine }: RoutineNote) => {
  const user_id = await getUserId()

  const { error } = await db
    .from('routine_note')
    .insert({ user_id, id, note_id: note.id, routine_id: routine.id })
    .select('*')
    .single()
  if (error) throw error
}
