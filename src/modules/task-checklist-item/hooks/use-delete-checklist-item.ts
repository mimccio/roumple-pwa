import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Task } from '&/modules/task/types'
import { TASK_KEYS } from '&/modules/task/constants'
import { deletedTaskChecklistItem } from '../mutations'

export function useDeleteChecklistItem(task: Task) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(deletedTaskChecklistItem, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(task.id) })

      queryClient.setQueryData(TASK_KEYS.detail(task.id), (old?: Task) => {
        if (!old) return
        const oldChecklist = old.checklist || []
        const itemIndex = old.checklist?.findIndex((item) => item.id === data)
        const newChecklist =
          itemIndex >= 0 ? [...oldChecklist.slice(0, itemIndex), ...oldChecklist.slice(itemIndex + 1)] : oldChecklist

        return { ...old, checklist: newChecklist }
      })
    },

    onError: () => {
      queryClient.setQueryData(TASK_KEYS.detail(task.id), task)
      toast.error("Delete didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries(TASK_KEYS.detail(task.id))
    },
  })

  const onDelete = (routineChecklistItemId: string) => mutate(routineChecklistItemId)

  return { onDelete }
}
