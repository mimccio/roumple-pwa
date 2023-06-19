import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { editTaskName } from '../mutations'

export function useEditTaskName(task: Task) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(editTaskName, {
    onMutate: async (data) => {
      // cancel related queries
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(data.id) })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.list() })

      // Update item
      queryClient.setQueryData(TASK_KEYS.detail(data.id), data)

      // Update task list
      const previousTaskList = queryClient.getQueryData(TASK_KEYS.list())
      queryClient.setQueryData(TASK_KEYS.list(), (old: Task[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), data, ...old.slice(i + 1)]
      })

      return { previousTaskList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(item.id), item)
      queryClient.setQueryData(TASK_KEYS.list(), context?.previousTaskList)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(TASK_KEYS.list())
      queryClient.invalidateQueries(TASK_KEYS.detail(variables.id))
    },
  })

  const submit = (name: string) => mutate({ ...task, name })
  return { submit }
}
