import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'

import type { NoteFolder } from '@/modules/note-folder/types'
import { NOTE_FOLDER_KEYS } from '@/modules/note-folder/constants'
import { useGetAllFolderList } from '@/modules/note-folder/hooks'
import type { Note } from '../types'
import { NOTE_KEYS } from '../constants'
import { sortNotes } from '../utils'
import { editNoteFolder } from '../mutations'

export function useNoteFolder(note: Note) {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()
  const { folderList, isLoading, isError } = useGetAllFolderList()

  const { mutate } = useMutation({
    mutationFn: editNoteFolder,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: NOTE_KEYS.all, exact: false })

      const prevNoteFolder = queryClient.getQueryData(NOTE_KEYS.detail(data.id))
      queryClient.setQueryData(NOTE_KEYS.detail(data.id), () => data)

      const previousNoteListPreviousFolder = queryClient.getQueryData(NOTE_KEYS.list({ folderId: note.folder?.id }))
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: note.folder?.id }), (old: Note[] = []) => {
        const noteIndex = old.findIndex((item) => item.id === note.id)
        return [...old.slice(0, noteIndex), ...old.slice(noteIndex + 1)]
      })

      const previousNoteListNewFolder = queryClient.getQueryData(NOTE_KEYS.list({ folderId: data.folder?.id }))
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: data.folder?.id }), (old: Note[] = []) => {
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
        prevNoteFolder,
      }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(NOTE_KEYS.detail(item.id), context?.prevNoteFolder)
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: note.folder?.id }), context?.previousNoteListPreviousFolder)
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: item.folder?.id }), context?.previousNoteListNewFolder)
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }), context?.previousNoteFolder)
      queryClient.setQueryData(
        NOTE_FOLDER_KEYS.list({ categoryId: note.category?.id }),
        context?.previousNoteFolderCategory
      )

      toast.error(t('errorModification'))
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.lists() })
      queryClient.invalidateQueries({ queryKey: NOTE_FOLDER_KEYS.list({ categoryId: undefined }) })
      queryClient.invalidateQueries({ queryKey: NOTE_FOLDER_KEYS.list({ categoryId: note.category?.id }) })
    },
  })

  const onSelect = (folder: NoteFolder) => {
    if (folder.id === note.folder?.id) return
    mutate({ ...note, folder })
  }

  return { onSelect, folderList, isLoading, isError }
}
