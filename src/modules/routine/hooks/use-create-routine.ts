import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { createRoutine } from '../mutations'
import { RoutineDetails } from '../types'
import { ROUTINE } from '../constants'

export function useCreateRoutine() {
  const queryClient = useQueryClient()
  const id = uuidv4()
  const navigate = useNavigate()

  const name = 'New Routine'
  const { mutate } = useMutation(createRoutine, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE] })

      const previousRoutineList = queryClient.getQueryData([ROUTINE])

      queryClient.setQueryData([ROUTINE], (old: RoutineDetails[] = []) => [...old, data])
      navigate(`d/routine/${id}`)
      return { previousRoutineList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([ROUTINE], context?.previousRoutineList)
      toast.error("Creation didn't work")
    },
    onSettled: () => {
      queryClient.invalidateQueries([ROUTINE])
    },
  })

  const defaultRecurrence = [true, true, true, true, true, true, true]

  const onCreateRoutine = () =>
    mutate({ id, name, priority: 0, type: 'DAILY', recurrence: defaultRecurrence, period: 3 })
  return { onCreateRoutine }
}
