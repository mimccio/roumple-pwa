import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Routine } from '../types'
import { ROUTINE } from '../constants'
import { deleteRoutine } from '../mutations'

export function useDeleteRoutine() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate } = useMutation(deleteRoutine, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })
      const previousRoutineList = queryClient.getQueryData([ROUTINE])

      queryClient.setQueryData([ROUTINE], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
      })
      navigate('/routines')

      return { previousRoutineList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([ROUTINE], context?.previousRoutineList)
      toast.error("Deletion didn't work")
    },
    onSettled: () => {
      queryClient.invalidateQueries([ROUTINE])
    },
  })

  const onDeleteRoutine = (id?: string) => mutate({ id })
  return { onDeleteRoutine }
}
