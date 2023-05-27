import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Category } from '../types'
import { CATEGORY_LIST } from '../constants'
import { deleteCategory } from '../mutations'

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(deleteCategory, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [CATEGORY_LIST] })
      const previousCategoryList = queryClient.getQueryData([CATEGORY_LIST])

      queryClient.setQueryData([CATEGORY_LIST], (old: Category[] = []) => {
        const categoryIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, categoryIndex), ...old.slice(categoryIndex + 1)]
      })
      return { previousCategoryList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([CATEGORY_LIST], context?.previousCategoryList)
      toast.error("Deletion didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries([CATEGORY_LIST])
    },
  })

  const onDelete = (category: Category) => mutate(category)
  return { onDelete }
}
