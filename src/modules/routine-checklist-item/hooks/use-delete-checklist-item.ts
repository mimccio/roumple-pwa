import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Routine } from '&/modules/routine/types'
import { ROUTINE } from '&/modules/routine/constants'
import { deletedRoutineChecklistItem } from '../mutations'

export function useDeleteChecklistItem(routine: Routine) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(deletedRoutineChecklistItem, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE, routine.id] })

      queryClient.setQueryData([ROUTINE, routine.id], (old?: Routine) => {
        if (!old) return
        const oldChecklist = old.checklist || []
        const itemIndex = old.checklist?.findIndex((item) => item.id === data)
        const newChecklist = itemIndex
          ? [...oldChecklist.slice(0, itemIndex), ...oldChecklist.slice(itemIndex + 1)]
          : oldChecklist

        return { ...old, checklist: newChecklist }
      })
    },

    onError: () => {
      queryClient.setQueryData([ROUTINE, routine.id], routine)
      toast.error("Delete didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries([ROUTINE, routine.id])
    },
  })

  const onDelete = (routineChecklistItemId: string) => mutate(routineChecklistItemId)

  return { onDelete }
}
