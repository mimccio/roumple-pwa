import { format, startOfWeek } from 'date-fns'

import { db } from '&/db'
import { DATE_FORMAT } from '&/common/constants'
import { getUserId } from '&/modules/utils'
import { DAILY, MONTHLY, WEEKLY } from '&/modules/routine/constants'
import { Routine, ScheduleType } from '../types'

interface Params {
  done: boolean
  actionId?: number
  routine: Routine
  type: ScheduleType
  date: number
}

export const upsertRoutineAction = async ({ done, actionId, type, date, routine }: Params) => {
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
    done,
  }

  const { error, data } = await db.from('routine_action').upsert(action).select('*').single()

  if (error) throw error
  return data
}
