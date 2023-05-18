import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import type { Routine } from '../types'
import { ROUTINE } from '../constants'
import { sortRoutines } from '../utils'
import { editRoutinePriority } from '../mutations'

export function useRoutinePriority() {
  const { routineId } = useParams()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(editRoutinePriority, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })

      queryClient.setQueryData([ROUTINE, data.id], (old: object = {}) => ({ ...old, priority: data.priority }))

      const previousRoutineList = queryClient.getQueryData([ROUTINE])

      queryClient.setQueryData([ROUTINE], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        const newRoutine = { ...old[routineIndex], priority: data.priority }
        return [...old.slice(0, routineIndex), newRoutine, ...old.slice(routineIndex + 1)].sort(sortRoutines)
      })

      return { previousRoutineList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, item.id], item)
      queryClient.setQueryData([ROUTINE], context?.previousRoutineList)
      toast.error("Modification didn't work")
    },
    onSettled: () => {
      queryClient.invalidateQueries([ROUTINE])
    },
  })

  const onSelect = (priority: number) => {
    if (!routineId) throw new Error('Routine ID is missing')

    mutate({ priority, id: routineId })
  }

  return { onSelect }
}
