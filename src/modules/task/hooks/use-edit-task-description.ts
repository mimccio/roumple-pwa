import { useMutation, useQueryClient } from '@tanstack/react-query'
import { JSONContent } from '@tiptap/react'
import { toast } from 'react-hot-toast'

import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { editTaskDescription } from '../mutations'

export function useEditTaskDescription(task: Task) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(editTaskDescription, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(data.id) })
      queryClient.setQueryData(TASK_KEYS.detail(data.id), data)
    },
    onError: (_err, item) => {
      queryClient.setQueryData(TASK_KEYS.detail(item.id), item)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(TASK_KEYS.detail(variables.id))
    },
  })

  const submit = (description?: JSONContent) => mutate({ ...task, description })
  return { submit }
}