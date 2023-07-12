import { useRef } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useOutsideClick } from '&/common/hooks'
import type { Task } from '&/modules/task/types'
import { TASK_KEYS } from '&/modules/task/constants'
import type { TaskChecklistItem } from '../types'
import { editTaskChecklistItem } from '../mutations'

export function useEditChecklistItem(checklistItem: TaskChecklistItem) {
  const queryClient = useQueryClient()
  const ref = useRef<HTMLFormElement>(null)

  const { mutate } = useMutation(editTaskChecklistItem, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(checklistItem.task_id) })

      const previousTask = queryClient.getQueryData(TASK_KEYS.detail(checklistItem.task_id))

      queryClient.setQueryData(TASK_KEYS.detail(checklistItem.task_id), (old?: Task) => {
        if (!old) return
        const oldChecklist = old.checklist || []
        const itemIndex = old.checklist?.findIndex((item) => item.id === data.id)
        const newChecklist =
          itemIndex >= 0
            ? [
                ...oldChecklist.slice(0, itemIndex),
                { ...checklistItem, name: data.name },
                ...oldChecklist.slice(itemIndex + 1),
              ]
            : oldChecklist

        return { ...old, checklist: newChecklist }
      })

      return { previousTask }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(checklistItem.task_id), context?.previousTask)
      toast.error("Modification didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries(TASK_KEYS.detail(checklistItem.task_id))
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<{ name: string; id: string }>({
    values: checklistItem,
  })

  const name = watch('name')

  const submit = handleSubmit(({ name }) => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    if (name === checklistItem.name) return
    mutate({ ...checklistItem, name })
  })

  useOutsideClick({ handler: clearErrors, ref })

  return { register, handleSubmit, errors, submit, ref, name }
}
