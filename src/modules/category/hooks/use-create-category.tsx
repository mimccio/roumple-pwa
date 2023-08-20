import { useRef, useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import type { TwColor } from '&/common/types'
import { createCategory } from '../mutations'
import { Category } from '../types'
import { CATEGORY_LIST } from '../constants'
import { useOutsideClick } from '&/common/hooks'

export function useCreateCategory() {
  const queryClient = useQueryClient()
  const id = uuidv4()
  const ref = useRef<HTMLFormElement>(null)
  const [color, setColor] = useState<TwColor>('gray')

  const { mutate } = useMutation(createCategory, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [CATEGORY_LIST] })

      const previousCategoryList = queryClient.getQueryData([CATEGORY_LIST])

      queryClient.setQueryData([CATEGORY_LIST], (old: Category[] = []) => [...old, data])

      return { previousCategoryList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([CATEGORY_LIST], context?.previousCategoryList)
      toast.error("Creation didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries([CATEGORY_LIST])
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

  useOutsideClick({ handler: clearErrors, ref })

  return { register, handleSubmit, errors, submit, handleColorChange, ref, name, color }
}
