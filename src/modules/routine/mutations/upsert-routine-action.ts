import { format, startOfWeek } from 'date-fns'
import { v5 as uuidv5 } from 'uuid'

import { db } from '&/db'
import type { Status } from '&/common/types'
import { DATE_FORMAT, SCHEDULE_TYPES } from '&/common/constants'
import { getUserId } from '&/modules/utils'
import type { Routine } from '../types'

interface Params {
  actionId?: string
  date: Date
  routine: Routine
  status: Status
  checkedList?: string[]
  doneOccurrence: number
}

export const upsertRoutineAction = async ({ status, date, routine, checkedList, doneOccurrence, actionId }: Params) => {
  const userId = await getUserId()

  const getDate = () => {
    if (routine.scheduleType === SCHEDULE_TYPES.monthly) return format(date, 'yyyy-MM-01')
    if (routine.scheduleType === SCHEDULE_TYPES.weekly)
      return format(startOfWeek(date, { weekStartsOn: 1 }), DATE_FORMAT)
    if (routine.scheduleType === SCHEDULE_TYPES.daily) return format(date, DATE_FORMAT)
  }

  const newAction = {
    date: getDate(),
    id: actionId || uuidv5(format(date, DATE_FORMAT), routine.id),
    routine_id: routine.id,
    user_id: userId,
    status,
    checked_list: checkedList,
    done_occurrence: doneOccurrence,
    schedule_type: routine.scheduleType,
  }

  const { error, data } = await db.from('routine_action').upsert(newAction).select('*').single()
  if (error) throw error
  return data
}
