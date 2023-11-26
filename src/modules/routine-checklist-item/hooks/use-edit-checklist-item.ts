import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Routine } from '&/modules/routine/types'
import { ROUTINE_KEYS } from '&/modules/routine/constants'
import { useOutsideClick } from '&/common/hooks'
import type { RoutineChecklistItem } from '../types'
import { editRoutineChecklistItem } from '../mutations'

export function useEditChecklistItem(checklistItem: RoutineChecklistItem) {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()
  const routineKey = ROUTINE_KEYS.detail(checklistItem.routine_id)

  const { mutate } = useMutation({
    mutationFn: editRoutineChecklistItem,
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: routineKey })

      // ⛳ Update Item
      const previousRoutine = queryClient.getQueryData(routineKey)
      queryClient.setQueryData(routineKey, (old?: Routine) => {
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
      queryClient.setQueryData(routineKey, context?.previousRoutine)
      toast.error(t('errorModification'))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: routineKey })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<{ name: string; id: string }>({
    values: checklistItem,
  })

  const name = watch('name')

  const submit = handleSubmit(({ name }) => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    if (name === checklistItem.name) return
    mutate({ ...checklistItem, name })
  })

  const ref = useOutsideClick(clearErrors)

  return { register, handleSubmit, errors, submit, ref, name }
}
