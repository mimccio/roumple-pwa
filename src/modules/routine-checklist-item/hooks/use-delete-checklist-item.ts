import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Routine } from '&/modules/routine/types'
import { ROUTINE_KEYS } from '&/modules/routine/constants'
import { deletedRoutineChecklistItem } from '../mutations'

export function useDeleteChecklistItem(routine: Routine) {
  const queryClient = useQueryClient()
  const routineKey = ROUTINE_KEYS.detail(routine.id)

  const { mutate } = useMutation({
    mutationFn: deletedRoutineChecklistItem,
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: routineKey })

      // ⛳ Update Item
      const previousRoutine = queryClient.getQueryData(routineKey)
      queryClient.setQueryData(routineKey, (old?: Routine) => {
        if (!old) return
        return { ...old, checklist: old.checklist?.filter((item) => item.id !== data) }
      })
      return { previousRoutine }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData(routineKey, context?.previousRoutine)

      toast.error("Delete didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: routineKey })
    },
  })

  const onDelete = (routineChecklistItemId: string) => mutate(routineChecklistItemId)

  return { onDelete }
}
