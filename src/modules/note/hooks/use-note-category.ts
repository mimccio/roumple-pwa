import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useAtom } from 'jotai'

import type { Category } from '&/modules/category/types'
import { useCategories } from '&/modules/category/hooks'
import { categoryAtom } from '&/modules/category/atoms'

import type { Note } from '../types'
import { LIST, NOTE } from '../constants'
import { editNoteCategory } from '../mutations'

export function useNoteCategory(note: Note) {
  const queryClient = useQueryClient()
  const { categoryList, isLoading, error } = useCategories()
  const [selectedCategory, setSelectedCategory] = useAtom(categoryAtom)

  const { mutate } = useMutation(editNoteCategory, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [NOTE], exact: false })
      queryClient.setQueryData([NOTE, data.id], () => data)

      const previousNoteList = queryClient.getQueryData([NOTE, LIST, { folderID: note.folder?.id }])

      queryClient.setQueryData([NOTE, LIST, { folderID: note.folder?.id }], (old: Note[] = []) => {
        const noteIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, noteIndex), data, ...old.slice(noteIndex + 1)]
      })

      return {
        previousNoteList,
      }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([NOTE, item.id], item)
      queryClient.setQueryData([NOTE, LIST, { folderID: item.folder?.id }], context?.previousNoteList)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([NOTE, variables.id])
      queryClient.invalidateQueries([NOTE, LIST], { exact: false })
    },
  })

  const onSelect = (category: Category) => {
    if (category.id === note.category?.id) return
    mutate({ ...note, category })
    // update selected category if there is one selected
    if (selectedCategory?.id) {
      setSelectedCategory(category)
    }
  }

  return { onSelect, categoryList, isLoading, error }
}
