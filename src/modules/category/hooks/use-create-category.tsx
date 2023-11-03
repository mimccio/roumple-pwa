import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import type { TwColor } from '&/common/types'
import { useOutsideClick } from '&/common/hooks'
import { createCategory } from '../mutations'
import { Category } from '../types'
import { CATEGORY_LIST } from '../constants'

export function useCreateCategory() {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()
  const id = uuidv4()
  const [color, setColor] = useState<TwColor>('gray')

  const { mutate } = useMutation({
    mutationFn: createCategory,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [CATEGORY_LIST] })

      const previousCategoryList = queryClient.getQueryData([CATEGORY_LIST])

      queryClient.setQueryData([CATEGORY_LIST], (old: Category[] = []) => [...old, data])

      return { previousCategoryList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([CATEGORY_LIST], context?.previousCategoryList)
      toast.error(t('errorCreation'))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORY_LIST] })
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

  const submit = handleSubmit((formData) => {
    reset()
    mutate({ ...formData, id, color })
    setColor('gray')
  })

  const handleColorChange = (color: TwColor) => setColor(color)

  const ref = useOutsideClick(clearErrors)

  return { register, handleSubmit, errors, submit, handleColorChange, ref, name, color }
}
