import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import { useOutsideClick } from '&/common/hooks'

import { createTaskChecklistItem } from '../mutations'
import { TASK_KEYS } from '&/modules/task/constants'
import { Task } from '&/modules/task/types'

export function useCreateChecklistItem(task: Task) {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()
  const id = uuidv4()

  const { mutate } = useMutation({
    mutationFn: createTaskChecklistItem,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.detail(task.id) })

      const previousTask = queryClient.getQueryData(TASK_KEYS.detail(task.id))
      queryClient.setQueryData(TASK_KEYS.detail(task.id), () => {
        return {
          ...data.task,
          checklist: data.task.checklist ? [...data.task.checklist, data] : [data],
        }
      })

      return { previousTask }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(task.id), context?.previousTask)
      toast.error(t('errorCreation'))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.detail(task.id) })
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
    mutate({ task, id, name, created_at: new Date() })
    reset()
  })

  const ref = useOutsideClick(clearErrors)

  return { register, handleSubmit, errors, submit, ref, name }
}
