import { useQueryClient, useMutation } from '@tanstack/react-query'

import { toast } from 'react-hot-toast'

import type { Task } from '&/modules/task/types'
import { TASK_KEYS } from '&/modules/task/constants'
import type { TaskChecklistItem } from '../types'
import { checkTaskChecklistItem } from '../mutations'
import { useTaskStatus } from '&/modules/task/hooks'
import { STATUSES } from '&/common/constants'
import { Status } from '&/common/types'

export function useCheckChecklistItem(task: Task) {
  const queryClient = useQueryClient()
  const { onSelect } = useTaskStatus(task)

  const { mutate } = useMutation(checkTaskChecklistItem, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(task.id) })

      const previousTask = queryClient.getQueryData(TASK_KEYS.detail(task.id))

      queryClient.setQueryData(TASK_KEYS.detail(task.id), (old?: Task) => {
        if (!old) return
        const oldChecklist = old.checklist || []
        const itemIndex = old.checklist?.findIndex((item) => item.id === data.id)

        const newChecklist =
          itemIndex >= 0
            ? [...oldChecklist.slice(0, itemIndex), data, ...oldChecklist.slice(itemIndex + 1)]
            : oldChecklist

        let newStatus: Status = STATUSES.todo

        const doneChecklist = newChecklist.filter((item) => item.checked === true)
        if (doneChecklist.length > 0 && task.status === STATUSES.todo) {
          newStatus = STATUSES.inProgress
        } else if (doneChecklist.length === task.checklist.length && task.status !== STATUSES.done) {
          newStatus = STATUSES.done
        }

        return { ...old, checklist: newChecklist, status: newStatus }
      })

      return { previousTask }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(task.id), context?.previousTask)
      onSelect(task.status)
      toast.error("Modification didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries(TASK_KEYS.detail(task.id))
    },
  })

  const onCheck = (checklistItem: TaskChecklistItem) => {
    mutate({ ...checklistItem, checked: !checklistItem.checked })
  }

  return { onCheck }
}
