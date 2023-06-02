import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { useAtom } from 'jotai'

import { createRoutine } from '../mutations'
import { Routine } from '../types'
import { BOARD, DAILY, LIST, ROUTINE, SCHEDULE_TYPES } from '../constants'
import { categoryAtom } from '&/modules/category/atoms'
import { getTodayDate } from '&/common/utils'

export function useCreateRoutine() {
  const queryClient = useQueryClient()
  const id = uuidv4()
  const navigate = useNavigate()
  const [category] = useAtom(categoryAtom)
  const date = getTodayDate()

  const name = 'New Routine'
  const { mutate } = useMutation(createRoutine, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE, LIST, { archived: false }] })

      queryClient.setQueryData([ROUTINE, id], () => data)

      const previousRoutineList = queryClient.getQueryData([ROUTINE, LIST, { archived: false }])

      queryClient.setQueryData([ROUTINE, LIST, { archived: false }], (old: Routine[] = []) => [...old, data])

      const previousBoardList = queryClient.getQueryData([
        ROUTINE,
        BOARD,
        { type: SCHEDULE_TYPES.daily, date: getTodayDate() },
      ])

      queryClient.setQueryData([ROUTINE, BOARD, { type: SCHEDULE_TYPES.daily, date }], (old: Routine[] = []) => [
        ...old,
        data,
      ])

      navigate(`d/routine/${id}`)
      return { previousRoutineList, previousBoardList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([ROUTINE, LIST, { archived: false }], context?.previousRoutineList)
      queryClient.setQueryData([ROUTINE, BOARD, { type: SCHEDULE_TYPES.daily, date }], context?.previousBoardList)

      toast.error("Creation didn't work")
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([ROUTINE, data.id])
      queryClient.invalidateQueries([ROUTINE, LIST, { archived: false }])
      queryClient.invalidateQueries([ROUTINE, BOARD, { type: SCHEDULE_TYPES.daily, dated: false }])
    },
  })

  const defaultDailyRecurrence = [0, 1, 2, 3, 4, 5, 6]
  const defaultMonthlyRecurrence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const onCreateRoutine = () =>
    mutate({
      id,
      name,
      archived: false,
      priority: 0,
      type: DAILY,
      daily_recurrence: defaultDailyRecurrence,
      period: 3,
      weekly_recurrence: [0, 1],
      monthly_recurrence: defaultMonthlyRecurrence,
      actions: [],
      category: category,
      category_id: null,
      created_at: new Date(),
    })

  return { onCreateRoutine }
}
