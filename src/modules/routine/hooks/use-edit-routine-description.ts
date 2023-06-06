import { useMutation, useQueryClient } from '@tanstack/react-query'
import { JSONContent } from '@tiptap/react'
import { toast } from 'react-hot-toast'

import type { Routine } from '../types'
import { ROUTINE } from '../constants'
import { editRoutineDescription } from '../mutations'

export function useEditRoutineDescription(routine: Routine) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(editRoutineDescription, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE, data.id] })
      queryClient.setQueryData([ROUTINE, data.id], { ...routine, description: data.description })
    },
    onError: (_err, item) => {
      queryClient.setQueryData([ROUTINE, item.id], item)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([ROUTINE, variables.id])
    },
  })

  const submit = (description?: JSONContent) => mutate({ ...routine, description })
  return { submit }
}
