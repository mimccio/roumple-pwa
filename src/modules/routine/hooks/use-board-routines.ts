import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { compareDesc, startOfToday } from 'date-fns'

import type { ScheduleType } from '&/common/types'
import { useShow } from '&/common/hooks'
import { categoryAtom } from '&/modules/category/atoms'

import { ROUTINE_KEYS } from '../constants'
import { filterRoutines } from '../utils'
import { fetchBoardRoutines } from '../queries'

interface Params {
  scheduleType: ScheduleType
  showDone: boolean
}

export function useBoardRoutines({ scheduleType, showDone }: Params) {
  const queryClient = useQueryClient()
  const date = startOfToday()
  const [category] = useAtom(categoryAtom)
  const { data, isLoading, error, isPaused } = useQuery(ROUTINE_KEYS.board({ date, scheduleType }), fetchBoardRoutines)

  queryClient.removeQueries({
    queryKey: ROUTINE_KEYS.boards(),
    type: 'inactive',
    predicate: (query) => {
      const queryOptions = query.queryKey[2] as { date: Date }
      return Boolean(compareDesc(new Date(queryOptions.date), date))
    },
  })

  const routines = data?.filter((routine) => filterRoutines({ routine, category, showDone }))

  const routinesShowStatus = useShow({ data, isLoading, error, isPaused })

  return { routines, date, routinesShowStatus }
}
