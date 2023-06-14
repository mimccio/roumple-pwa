import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { useMainPath } from '&/common/hooks'
import type { NoteFolder } from '&/modules/note-folder/types'
import { NOTE_FOLDER_KEYS } from '&/modules/note-folder/constants'
import type { Note } from '../types'
import { NOTE_KEYS } from '../constants'
import { deleteNote } from '../mutations'

export function useDeleteNote() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mainPath = useMainPath()

  const { mutate } = useMutation(deleteNote, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: NOTE_KEYS.all, exact: false })

      queryClient.setQueryData(NOTE_KEYS.detail(data.id), () => null)

      const previousNoteList = queryClient.getQueryData(NOTE_KEYS.list({ folderId: data.folder?.id }))
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: data.folder?.id }), (old: Note[] = []) => {
        const noteIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, noteIndex), ...old.slice(noteIndex + 1)]
      })

      const previousFolderListAllCategory = queryClient.getQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }))
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }), (old: NoteFolder[] = []) => {
        const folderIndex = old.findIndex((item) => item.id === data.folder?.id)
        if (folderIndex < 0) return old
        const oldFolder = old[folderIndex]
        const count = (oldFolder.noteCount?.[0].count || 1) - 1
        const newFolder = { ...oldFolder, noteCount: [{ count }] }
        return [...old.slice(0, folderIndex), newFolder, ...old.slice(folderIndex + 1)]
      })

      const previousFolderListCategoryId = queryClient.getQueryData(
        NOTE_FOLDER_KEYS.list({ categoryId: data.category?.id })
      )
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: data.category?.id }), (old: NoteFolder[] = []) => {
        if (!data.category?.id) return old
        const folderIndex = old.findIndex((item) => item.id === data.folder?.id)
        if (folderIndex < 0) return old
        const oldFolder = old[folderIndex]
        const count = (oldFolder.noteCount?.[0].count || 1) - 1
        const newFolder = { ...oldFolder, noteCount: [{ count }] }
        return [...old.slice(0, folderIndex), newFolder, ...old.slice(folderIndex + 1)]
      })

      navigate(mainPath)
      return { previousNoteList, previousFolderListAllCategory, previousFolderListCategoryId }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(NOTE_KEYS.detail(item.id), item)
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: item.folder?.id }), context?.previousNoteList)
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }), context?.previousFolderListAllCategory)
      queryClient.setQueryData(
        NOTE_FOLDER_KEYS.list({ categoryId: item.category?.id }),
        context?.previousFolderListCategoryId
      )

      toast.error("Deletion didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(NOTE_KEYS.detail(variables.id))
      queryClient.invalidateQueries(NOTE_KEYS.list({ folderId: variables.folder?.id }))
      queryClient.invalidateQueries(NOTE_FOLDER_KEYS.list({ categoryId: undefined }))
      queryClient.invalidateQueries(NOTE_FOLDER_KEYS.list({ categoryId: variables.category?.id }))
    },
  })

  const onDelete = (note: Note) => mutate(note)
  return { onDelete }
}
