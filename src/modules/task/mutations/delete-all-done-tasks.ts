import { STATUSES } from '&/common/constants'
import { db } from '&/db'
import { getUserId } from '&/modules/utils'

export const deleteAllDoneTasks = async () => {
  const userId = await getUserId()

  const { data, error } = await db.from('task').delete().eq('user_id', userId).eq('status', STATUSES.done)
  if (error) throw error
  return data
}
