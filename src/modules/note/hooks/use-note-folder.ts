import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Note } from '../types'
import { LIST, NOTE } from '../constants'
import { useFolderList } from '&/modules/note-folder/hooks/use-folder-list'
import { sortNotes } from '../utils'
import { NoteFolder } from '&/modules/note-folder/types'
import { editNoteFolder } from '../mutations'

export function useNoteFolder(note: Note) {
  const queryClient = useQueryClient()
  const { folderList, isLoading, error } = useFolderList()

  const { mutate } = useMutation(editNoteFolder, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [NOTE], exact: false })
      queryClient.setQueryData([NOTE, data.id], () => data)

      const previousNoteListPreviousFolder = queryClient.getQueryData([NOTE, LIST, { folderID: note.folder?.id }])

      queryClient.setQueryData([NOTE, LIST, { folderID: note.folder?.id }], (old: Note[] = []) => {
        const noteIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, noteIndex), ...old.slice(noteIndex + 1)]
      })

      const previousNoteListNewFolder = queryClient.getQueryData([NOTE, LIST, { folderID: data.folder?.id }])

      queryClient.setQueryData([NOTE, LIST, { folderID: data.folder?.id }], (old: Note[] = []) => {
        return [...old, data].sort(sortNotes)
      })

      return {
        previousNoteListPreviousFolder,
        previousNoteListNewFolder,
      }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([NOTE, item.id], item)
      queryClient.setQueryData([NOTE, LIST, { folderID: note.folder?.id }], context?.previousNoteListPreviousFolder)
      queryClient.setQueryData([NOTE, LIST, { folderID: item.folder?.id }], context?.previousNoteListNewFolder)

      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([NOTE, variables.id])
      queryClient.invalidateQueries([NOTE, LIST], { exact: false })
    },
  })

  const onSelect = (folder: NoteFolder) => {
    if (folder.id === note.folder?.id) return
    mutate({ ...note, folder })
  }

  return { onSelect, folderList, isLoading, error }
}
