import { useRef } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useOutsideClick } from '&/common/hooks'
import { Routine } from '&/modules/routine/types'
import { ROUTINE } from '&/modules/routine/constants'
import { editRoutineChecklistItem } from '../mutations/edit-routine-checklist-item'
import { RoutineChecklistItem } from '../types'

export function useEditChecklistItem(checklistItem: RoutineChecklistItem) {
  const queryClient = useQueryClient()
  const ref = useRef<HTMLFormElement>(null)

  const { mutate } = useMutation(editRoutineChecklistItem, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE, checklistItem.routine_id] })

      const previousRoutine = queryClient.getQueryData([ROUTINE, checklistItem.routine_id])

      queryClient.setQueryData([ROUTINE, checklistItem.routine_id], (old?: Routine) => {
        if (!old) return
        const oldChecklist = old.checklist || []
        const itemIndex = old.checklist?.findIndex((item) => item.id === data.id)
        const newChecklist = itemIndex
          ? [...oldChecklist.slice(0, itemIndex), data, ...oldChecklist.slice(itemIndex + 1)]
          : oldChecklist

        return { ...old, checklist: newChecklist }
      })

      return { previousRoutine }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([ROUTINE, checklistItem.routine_id], context?.previousRoutine)
      toast.error("Modification didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries([ROUTINE, checklistItem.routine_id])
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
    reset,
  } = useForm<{ name: string; id: string }>({
    values: checklistItem,
  })

  const name = watch('name')

  const submit = handleSubmit(({ name, id }) => {
    if (name === checklistItem.name) return
    mutate({ id, name })
    reset()
  })

  useOutsideClick({ handler: clearErrors, ref })

  return { register, handleSubmit, errors, submit, ref, name }
}
