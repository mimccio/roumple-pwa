import { format, startOfWeek } from 'date-fns'

import { db } from '&/db'
import { DATE_FORMAT } from '&/common/constants'
import { getUserId } from '&/modules/utils'
import { DAILY, MONTHLY, WEEKLY } from '&/modules/routine/constants'
import { Routine, RoutineStatuses, ScheduleType } from '../types'

interface Params {
  actionId?: number
  date: number
  routine: Routine
  status: RoutineStatuses
  type: ScheduleType
  checkedList?: string[]
}

export const upsertRoutineAction = async ({ status, actionId, type, date, routine, checkedList }: Params) => {
  const userId = await getUserId()

  const getDate = () => {
    if (type === MONTHLY) return format(date, 'yyyy-MM-01')
    if (type === WEEKLY) return format(startOfWeek(date), DATE_FORMAT)
    if (type === DAILY) return format(date, DATE_FORMAT)
  }

  const action = {
    date: getDate(),
    id: actionId,
    routine_id: routine.id,
    user_id: userId,
    status,
    checked_list: checkedList,
  }

  const { error, data } = await db.from('routine_action').upsert(action).select('*').single()

  if (error) throw error
  return data
}
