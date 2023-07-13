import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { startOfToday } from 'date-fns'

import type { ScheduleType } from '&/common/types'
import { useShow } from '&/common/hooks'
import { categoryAtom } from '&/modules/category/atoms'

import { ROUTINE_KEYS } from '../constants'
import { filterRoutines } from '../utils'
import { fetchBoardRoutines } from '../queries'

interface Params {
  type: ScheduleType
  showDone: boolean
}

export function useBoardRoutines({ type, showDone }: Params) {
  const date = startOfToday()

  const [category] = useAtom(categoryAtom)
  const { data, isLoading, error, isPaused } = useQuery(ROUTINE_KEYS.board({ date, type }), fetchBoardRoutines)

  const routines = data?.filter((routine) => filterRoutines({ routine, category, showDone }))

  const routinesShowStatus = useShow({ data, isLoading, error, isPaused })

  return { routines, date, routinesShowStatus }
}
