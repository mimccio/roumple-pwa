import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { TASK_KEYS } from '../constants'
import { editTaskShowChecklist } from '../mutations'

export function useEditTaskShowChecklist() {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()
  const { taskId } = useParams()

  const { mutate } = useMutation({
    mutationFn: editTaskShowChecklist,
    onMutate: async (data) => {
      // 🗝️ Keys
      const detailKey = TASK_KEYS.detail(data.id)
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: detailKey })
      // ⛳ Update Item
      const prevTask = queryClient.getQueryData(detailKey)
      queryClient.setQueryData(detailKey, (old) => old && { ...old, showChecklist: data.showChecklist })

      return { prevTask }
    },
    onError: (_err, variables, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(variables.id), context?.prevTask)
      toast.error(t('errorModification'))
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.detail(variables.id) })
    },
  })

  const toggleShowChecklist = (curValue: boolean) => {
    if (!taskId) throw new Error('Task ID is missing')
    mutate({ id: taskId, showChecklist: !curValue })
  }
  return { toggleShowChecklist }
}
