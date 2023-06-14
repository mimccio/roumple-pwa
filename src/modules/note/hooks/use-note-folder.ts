import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { NoteFolder } from '&/modules/note-folder/types'
import { NOTE_FOLDER_KEYS } from '&/modules/note-folder/constants'
import { useFolderList } from '&/modules/note-folder/hooks'
import type { Note } from '../types'
import { LIST, NOTE } from '../constants'
import { sortNotes } from '../utils'
import { editNoteFolder } from '../mutations'

export function useNoteFolder(note: Note) {
  const queryClient = useQueryClient()
  const { folderList, isLoading, error } = useFolderList()

  const { mutate } = useMutation(editNoteFolder, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [NOTE], exact: false })
      queryClient.setQueryData([NOTE, data.id], () => data)

      const previousNoteListPreviousFolder = queryClient.getQueryData([NOTE, LIST, { folderId: note.folder?.id }])
      queryClient.setQueryData([NOTE, LIST, { folderId: note.folder?.id }], (old: Note[] = []) => {
        const noteIndex = old.findIndex((item) => item.id === note.id)
        return [...old.slice(0, noteIndex), ...old.slice(noteIndex + 1)]
      })

      const previousNoteListNewFolder = queryClient.getQueryData([NOTE, LIST, { folderId: data.folder?.id }])
      queryClient.setQueryData([NOTE, LIST, { folderId: data.folder?.id }], (old: Note[] = []) => {
        return [...old, data].sort(sortNotes)
      })

      // Folder list (no category)
      const previousNoteFolder = queryClient.getQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }))
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }), (old: NoteFolder[] = []) => {
        const newList = old.map((item) => {
          if (item.id === note.folder?.id) {
            const prevCount = item?.noteCount?.[0]?.count || 1
            return { ...item, noteCount: [{ count: prevCount - 1 }] }
          }
          if (item.id === data.folder?.id) {
            const prevCount = item?.noteCount?.[0]?.count || 0
            const count = prevCount + 1
            return { ...item, noteCount: [{ count }] }
          }
          return item
        })
        return newList
      })

      // Folder list (note category)
      const previousNoteFolderCategory = queryClient.getQueryData(
        NOTE_FOLDER_KEYS.list({ categoryId: note.category?.id })
      )
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: note.category?.id }), (old: NoteFolder[] = []) => {
        if (!note.category?.id) return old

        const newList = old.map((item) => {
          if (item.id === note.folder?.id) {
            const prevCount = item?.noteCount?.[0]?.count || 1
            return { ...item, noteCount: [{ count: prevCount - 1 }] }
          }
          if (item.id === data.folder?.id) {
            const prevCount = item?.noteCount?.[0]?.count || 0
            return { ...item, noteCount: [{ count: prevCount + 1 }] }
          }
          return item
        })
        return newList
      })

      return {
        previousNoteListPreviousFolder,
        previousNoteListNewFolder,
        previousNoteFolder,
        previousNoteFolderCategory,
      }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([NOTE, item.id], item)
      queryClient.setQueryData([NOTE, LIST, { folderId: note.folder?.id }], context?.previousNoteListPreviousFolder)
      queryClient.setQueryData([NOTE, LIST, { folderId: item.folder?.id }], context?.previousNoteListNewFolder)
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }), context?.previousNoteFolder)
      queryClient.setQueryData(
        NOTE_FOLDER_KEYS.list({ categoryId: note.category?.id }),
        context?.previousNoteFolderCategory
      )

      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([NOTE, variables.id])
      queryClient.invalidateQueries([NOTE, LIST], { exact: false })
      queryClient.invalidateQueries(NOTE_FOLDER_KEYS.list({ categoryId: undefined }))
      queryClient.invalidateQueries(NOTE_FOLDER_KEYS.list({ categoryId: note.category?.id }))
    },
  })

  const onSelect = (folder: NoteFolder) => {
    if (folder.id === note.folder?.id) return
    mutate({ ...note, folder })
  }

  return { onSelect, folderList, isLoading, error }
}
