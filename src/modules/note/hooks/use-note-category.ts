import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { useAtom } from 'jotai'

import type { Category } from '&/modules/category/types'
import { useCategories } from '&/modules/category/hooks'
import { categoryAtom } from '&/modules/category/atoms'

import type { Note } from '../types'
import { NOTE_KEYS } from '../constants'
import { editNoteCategory } from '../mutations'
import { NOTE_FOLDER_KEYS } from '&/modules/note-folder/constants'
import { NoteFolder } from '&/modules/note-folder/types'

// TODO!: use setQueriesData

export function useNoteCategory(note: Note) {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()
  const { categoryList, isLoading, error } = useCategories()
  const [selectedCategory, setSelectedCategory] = useAtom(categoryAtom)

  const { mutate } = useMutation({
    mutationFn: editNoteCategory,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: NOTE_KEYS.all, exact: false })

      // Note item
      const prevNote = queryClient.getQueryData(NOTE_KEYS.detail(data.id))
      queryClient.setQueryData(NOTE_KEYS.detail(data.id), () => data)

      // Note list
      const previousNoteList = queryClient.getQueryData(NOTE_KEYS.list({ folderId: note.folder?.id }))
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: note.folder?.id }), (old: Note[] = []) => {
        const noteIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, noteIndex), data, ...old.slice(noteIndex + 1)]
      })

      // Folder list count (previous category)
      const previousCategoryId = note.category?.id
      const previousFolderListPrevCategory = queryClient.getQueryData(
        NOTE_FOLDER_KEYS.list({ categoryId: previousCategoryId })
      )
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: previousCategoryId }), (old: NoteFolder[] = []) => {
        if (!previousCategoryId) return old
        const folderIndex = old.findIndex((item) => item.id === data.folder?.id)
        if (folderIndex < 0) return old
        const oldFolder = old[folderIndex]
        const count = (oldFolder.noteCount?.[0].count || 1) - 1
        const newFolder = { ...oldFolder, noteCount: [{ count }] }
        return [...old.slice(0, folderIndex), newFolder, ...old.slice(folderIndex + 1)]
      })

      // Folder list count (new category)
      const newCategoryId = data.category?.id
      const previousFolderListNewCategory = queryClient.getQueryData(
        NOTE_FOLDER_KEYS.list({ categoryId: newCategoryId })
      )
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: newCategoryId }), (old: NoteFolder[] = []) => {
        if (!newCategoryId) return old
        const folderIndex = old.findIndex((item) => item.id === data.folder?.id)
        if (folderIndex < 0) return old
        const oldFolder = old[folderIndex]
        const count = (oldFolder.noteCount?.[0].count || 0) + 1
        const newFolder = { ...oldFolder, noteCount: [{ count }] }
        return [...old.slice(0, folderIndex), newFolder, ...old.slice(folderIndex + 1)]
      })

      return { previousNoteList, previousFolderListPrevCategory, previousFolderListNewCategory, prevNote }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(NOTE_KEYS.detail(item.id), context?.prevNote)
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: item.folder?.id }), context?.previousNoteList)
      queryClient.setQueryData(
        NOTE_FOLDER_KEYS.list({ categoryId: note.category?.id }),
        context?.previousFolderListPrevCategory
      )
      queryClient.setQueryData(
        NOTE_FOLDER_KEYS.list({ categoryId: item.category?.id }),
        context?.previousFolderListNewCategory
      )

      toast.error(t('errorModification'))
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.list({ folderId: note.folder?.id }) })
      queryClient.invalidateQueries({ queryKey: NOTE_FOLDER_KEYS.list({ categoryId: note.category?.id }) })
      queryClient.invalidateQueries({ queryKey: NOTE_FOLDER_KEYS.list({ categoryId: variables.category?.id }) })
    },
  })

  const onSelect = (category: Category) => {
    if (category.id === note.category?.id) return
    mutate({ ...note, category })
    // update selected category if there is one selected
    if (selectedCategory?.id && category?.id) {
      setSelectedCategory(category)
    }
  }

  return { onSelect, categoryList, isLoading, error }
}
