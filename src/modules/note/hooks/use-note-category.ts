import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
// import { useAtom } from 'jotai'

import type { Category } from '&/modules/category/types'
import { useCategories } from '&/modules/category/hooks'
// import { categoryAtom } from '&/modules/category/atoms'

// TODO?: change selected category when user change note category ?

import type { Note } from '../types'
import { LIST, NOTE } from '../constants'
import { editNoteCategory } from '../mutations'
import { NOTE_FOLDER } from '&/modules/note-folder/constants'
import { NoteFolder } from '&/modules/note-folder/types'

export function useNoteCategory(note: Note) {
  const queryClient = useQueryClient()
  const { categoryList, isLoading, error } = useCategories()
  // const [selectedCategory] = useAtom(categoryAtom)

  const { mutate } = useMutation(editNoteCategory, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [NOTE], exact: false })

      // Note item
      queryClient.setQueryData([NOTE, data.id], () => data)

      // Note list
      const previousNoteList = queryClient.getQueryData([NOTE, LIST, { folderId: note.folder?.id }])
      queryClient.setQueryData([NOTE, LIST, { folderId: note.folder?.id }], (old: Note[] = []) => {
        const noteIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, noteIndex), data, ...old.slice(noteIndex + 1)]
      })

      // Folder list count (previous category)
      const previousFolderListPrevCategory = queryClient.getQueryData([
        NOTE_FOLDER,
        LIST,
        { categoryId: note.category?.id },
      ])

      queryClient.setQueryData([NOTE_FOLDER, LIST, { categoryId: note.category?.id }], (old: NoteFolder[] = []) => {
        const folderIndex = old.findIndex((item) => item.id === data.folder?.id)
        if (folderIndex < 0) return old
        const oldFolder = old[folderIndex]
        const oldCount = oldFolder.noteCount?.[0].count || 1
        const newCount = oldCount - 1
        const newFolder = { ...oldFolder, noteCount: [{ count: newCount }] }
        return [...old.slice(0, folderIndex), newFolder, ...old.slice(folderIndex + 1)]
      })

      // Folder list count (new category)
      const previousFolderListNewCategory = queryClient.getQueryData([
        NOTE_FOLDER,
        LIST,
        { categoryId: data.category?.id },
      ])

      queryClient.setQueryData([NOTE_FOLDER, LIST, { categoryId: data.category?.id }], (old: NoteFolder[] = []) => {
        const folderIndex = old.findIndex((item) => item.id === data.folder?.id)
        if (folderIndex < 0) return old
        const oldFolder = old[folderIndex]
        const count = oldFolder.noteCount?.[0].count || 0 + 1
        const newFolder = { ...oldFolder, noteCount: [{ count }] }
        return [...old.slice(0, folderIndex), newFolder, ...old.slice(folderIndex + 1)]
      })

      return { previousNoteList, previousFolderListPrevCategory, previousFolderListNewCategory }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([NOTE, item.id], item)
      queryClient.setQueryData([NOTE, LIST, { folderId: item.folder?.id }], context?.previousNoteList)
      queryClient.setQueryData(
        [NOTE_FOLDER, LIST, { categoryId: note.category?.id }],
        context?.previousFolderListPrevCategory
      )
      queryClient.setQueryData(
        [NOTE_FOLDER, LIST, { categoryId: item.category?.id }],
        context?.previousFolderListNewCategory
      )

      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([NOTE, variables.id])
      queryClient.invalidateQueries([NOTE, LIST, { folderId: note.folder?.id }])
      queryClient.invalidateQueries([NOTE_FOLDER, LIST, { categoryId: note.category?.id }])
      queryClient.invalidateQueries([NOTE_FOLDER, LIST, { categoryId: variables.category?.id }])
    },
  })

  const onSelect = (category: Category) => {
    if (category.id === note.category?.id) return
    mutate({ ...note, category })
    // update selected category if there is one selected
    // if (selectedCategory?.id) {
    // setSelectedCategory(category)
    // }
  }

  return { onSelect, categoryList, isLoading, error }
}
