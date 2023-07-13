import { useMutation, useQueryClient } from '@tanstack/react-query'
import { JSONContent } from '@tiptap/react'
import { toast } from 'react-hot-toast'

import type { Routine } from '../types'
import { ROUTINE_KEYS } from '../constants'
import { editRoutineDescription } from '../mutations'

export function useEditRoutineDescription(routine: Routine) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(editRoutineDescription, {
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.detail(data.id) })
      // ⛳ Update Item
      queryClient.setQueryData(ROUTINE_KEYS.detail(data.id), { ...routine, description: data.description })
    },
    onError: (_err, item) => {
      queryClient.setQueryData(ROUTINE_KEYS.detail(item.id), item)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(ROUTINE_KEYS.detail(variables.id))
    },
  })

  const submit = (description?: JSONContent) => mutate({ ...routine, description })
  return { submit }
}
