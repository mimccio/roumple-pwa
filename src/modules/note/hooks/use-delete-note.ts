import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { useMainPath } from '&/common/hooks'
import type { Note } from '../types'
import { NOTE_KEYS } from '../constants'
import { deleteNote } from '../mutations'

// TODO!: handle count in folder

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
      navigate(mainPath)
      return { previousNoteList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(NOTE_KEYS.detail(item.id), item)
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: item.folder?.id }), context?.previousNoteList)
      toast.error("Deletion didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(NOTE_KEYS.detail(variables.id))
      queryClient.invalidateQueries(NOTE_KEYS.list({ folderId: variables.folder?.id }))
    },
  })

  const onDelete = (note: Note) => mutate(note)
  return { onDelete }
}
