import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Category } from '../types'
import { CATEGORY_LIST } from '../constants'
import { editCategory } from '../mutations'

interface Params {
  category: Category
}

export function useEditCategory({ category }: Params) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(editCategory, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [CATEGORY_LIST] })

      const previousCategoryList = queryClient.getQueryData([CATEGORY_LIST])

      queryClient.setQueryData([CATEGORY_LIST], (old: Category[] = []) => {
        const categoryIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, categoryIndex), data, ...old.slice(categoryIndex + 1)]
      })

      return { previousCategoryList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([CATEGORY_LIST], context?.previousCategoryList)
      toast.error("Modification didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries([CATEGORY_LIST])
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    values: category,
    mode: 'onBlur',
  })

  const submit = handleSubmit((formData) => mutate({ ...category, ...formData }))
  const handleColorChange = (color: string) => mutate({ ...category, color })

  return { handleColorChange, errors, register, submit }
}
