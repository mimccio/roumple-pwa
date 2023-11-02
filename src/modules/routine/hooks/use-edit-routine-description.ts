import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { JSONContent } from '@tiptap/react'
import { toast } from 'react-hot-toast'

import type { Routine } from '../types'
import { ROUTINE_KEYS } from '../constants'
import { editRoutineDescription } from '../mutations'

export function useEditRoutineDescription(routine: Routine) {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()

  const { mutate } = useMutation(editRoutineDescription, {
    onMutate: async (data) => {
      // 🗝️ Keys
      const detailKey = ROUTINE_KEYS.detail(data.id)
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: detailKey })
      // ⛳ Update Item
      const prevRoutine = queryClient.getQueryData(detailKey)
      queryClient.setQueryData(detailKey, { ...routine, description: data.description })

      return { prevRoutine }
    },
    onError: (_err, variables, context) => {
      queryClient.setQueryData(ROUTINE_KEYS.detail(variables.id), context?.prevRoutine)
      toast.error(t('errorModification'))
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries(ROUTINE_KEYS.detail(variables.id))
    },
  })

  const submit = (description?: JSONContent) => mutate({ ...routine, description })
  return { submit }
}
