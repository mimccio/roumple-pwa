import { SCHEDULE_TYPES } from '&/common/constants'
import { useBoardRoutineCount } from '&/modules/routine/hooks'
import { useBoardTaskCount } from '&/modules/task/hooks'

export function useBoardCount() {
  const routineDailyQuery = useBoardRoutineCount({ type: SCHEDULE_TYPES.daily })
  const routineWeeklyQuery = useBoardRoutineCount({ type: SCHEDULE_TYPES.weekly })
  const routineMonthlyQuery = useBoardRoutineCount({ type: SCHEDULE_TYPES.monthly })

  const taskDailyQuery = useBoardTaskCount({ type: SCHEDULE_TYPES.daily })
  const taskWeeklyQuery = useBoardTaskCount({ type: SCHEDULE_TYPES.weekly })
  const taskMonthlyQuery = useBoardTaskCount({ type: SCHEDULE_TYPES.monthly })

  const todayCount = (routineDailyQuery.count || 0) + (taskDailyQuery.count || 0)
  const weekCount = (routineWeeklyQuery.count || 0) + (taskWeeklyQuery.count || 0)
  const monthCount = (routineMonthlyQuery.count || 0) + (taskMonthlyQuery.count || 0)

  return {
    todayNum: todayCount > 0 ? todayCount : null,
    weekNum: weekCount > 0 ? weekCount : null,
    monthNum: monthCount > 0 ? monthCount : null,
  }
}
