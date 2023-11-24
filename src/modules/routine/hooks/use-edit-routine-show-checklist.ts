import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { ROUTINE_KEYS } from '../constants'
import { editRoutineShowChecklist } from '../mutations'

export function useEditRoutineShowChecklist() {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()
  const { routineId } = useParams()

  const { mutate } = useMutation({
    mutationFn: editRoutineShowChecklist,
    onMutate: async (data) => {
      // 🗝️ Keys
      const detailKey = ROUTINE_KEYS.detail(data.id)
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: detailKey })
      // ⛳ Update Item
      const prevRoutine = queryClient.getQueryData(detailKey)
      queryClient.setQueryData(detailKey, (old) => old && { ...old, showChecklist: data.showChecklist })

      return { prevRoutine }
    },
    onError: (_err, variables, context) => {
      queryClient.setQueryData(ROUTINE_KEYS.detail(variables.id), context?.prevRoutine)
      toast.error(t('errorModification'))
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ROUTINE_KEYS.detail(variables.id) })
    },
  })

  const toggleShowChecklist = (curValue: boolean) => {
    if (!routineId) throw new Error('Routine ID is missing')
    mutate({ id: routineId, showChecklist: !curValue })
  }
  return { toggleShowChecklist }
}
