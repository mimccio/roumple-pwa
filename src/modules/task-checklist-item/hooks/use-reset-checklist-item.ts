import { useQueryClient, useMutation } from '@tanstack/react-query'

import { toast } from 'react-hot-toast'

import type { Task } from '&/modules/task/types'
import { TASK_KEYS } from '&/modules/task/constants'
import { resetTaskChecklistItem } from '../mutations'

export function useResetChecklistItem(task: Task) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(resetTaskChecklistItem, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(task.id) })

      const previousTask = queryClient.getQueryData(TASK_KEYS.detail(task.id))

      queryClient.setQueryData(TASK_KEYS.detail(task.id), (old?: Task) => {
        if (!old) return
        return { ...old, checklist: data }
      })

      return { previousTask }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(task.id), context?.previousTask)
      toast.error("Modification didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries(TASK_KEYS.detail(task.id))
    },
  })

  const onResetChecklist = () => {
    if (!task.checklist) return
    const checklist = task.checklist.map((item) => ({ ...item, checked: false }))
    mutate(checklist)
  }

  return { onResetChecklist }
}
