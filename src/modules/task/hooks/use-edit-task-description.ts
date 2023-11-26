import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { JSONContent } from '@tiptap/react'
import { toast } from 'react-hot-toast'

import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { editTaskDescription } from '../mutations'

export function useEditTaskDescription(task: Task) {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: editTaskDescription,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(data.id) })
      const prevTask = queryClient.getQueryData(TASK_KEYS.detail(data.id))
      queryClient.setQueryData(TASK_KEYS.detail(data.id), data)
      return { prevTask }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(item.id), context?.prevTask)
      toast.error(t('errorModification'))
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.detail(variables.id) })
    },
  })

  const submit = (description?: JSONContent) => mutate({ ...task, description })
  return { submit }
}
