import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { createRoutine } from '../mutations'
import { RoutineDetails } from '../types'
import { DAILY, LIST, ROUTINE } from '../constants'

export function useCreateRoutine() {
  const queryClient = useQueryClient()
  const id = uuidv4()
  const navigate = useNavigate()

  const name = 'New Routine'
  const { mutate } = useMutation(createRoutine, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE, LIST, { archived: false }] })

      const previousRoutineList = queryClient.getQueryData([ROUTINE, LIST, { archived: false }])

      queryClient.setQueryData([ROUTINE, LIST, { archived: false }], (old: RoutineDetails[] = []) => [...old, data])
      navigate(`d/routine/${id}`)
      return { previousRoutineList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([ROUTINE, LIST, { archived: false }], context?.previousRoutineList)
      toast.error("Creation didn't work")
    },
    onSettled: () => {
      queryClient.invalidateQueries([ROUTINE, LIST, { archived: false }])
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
      category: null,
      category_id: null,
    })

  return { onCreateRoutine }
}
