import { useRef } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import { useOutsideClick } from '&/common/hooks'
import { createRoutineChecklistItem } from '../mutations/create-routine-checklist-item'
import { Routine } from '&/modules/routine/types'
import { ROUTINE_KEYS } from '&/modules/routine/constants'

export function useCreateChecklistItem(routine: Routine) {
  const queryClient = useQueryClient()
  const id = uuidv4()
  const ref = useRef<HTMLFormElement>(null)
  const routineKey = ROUTINE_KEYS.detail(routine.id)

  const { mutate } = useMutation(createRoutineChecklistItem, {
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: routineKey })

      // ⛳ Update Item
      const previousRoutine = queryClient.getQueryData(routineKey)
      queryClient.setQueryData(routineKey, () => {
        const newChecklistItem = { id, name: data.name }
        return {
          ...data.routine,
          checklist: data.routine.checklist ? [...data.routine.checklist, newChecklistItem] : [newChecklistItem],
        }
      })
      return { previousRoutine }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData(routineKey, context?.previousRoutine)
      toast.error("Creation didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries(routineKey)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
    reset,
  } = useForm<{ name: string }>({
    values: { name: '' },
  })

  const name = watch('name')

  const submit = handleSubmit(({ name }) => {
    mutate({ routine, id, name })
    reset()
  })

  useOutsideClick({ handler: clearErrors, ref })

  return { register, handleSubmit, errors, submit, ref, name }
}
