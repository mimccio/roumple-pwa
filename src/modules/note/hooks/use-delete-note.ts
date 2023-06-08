import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Note } from '../types'
import { LIST, NOTE } from '../constants'
import { deleteNote } from '../mutations'
import { useNavigate } from 'react-router-dom'
import { useMainPath } from '&/common/hooks'

export function useDeleteNote() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mainPath = useMainPath()

  const { mutate } = useMutation(deleteNote, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [NOTE, LIST], exact: false })
      const previousNoteList = queryClient.getQueryData([
        [NOTE, LIST, { folderId: data.folder?.id, categoryId: data.category?.id }],
      ])

      queryClient.setQueryData(
        [NOTE, LIST, { folderId: data.folder?.id, categoryId: data.category?.id }],
        (old: Note[] = []) => {
          const noteIndex = old.findIndex((item) => item.id === data.id)
          return [...old.slice(0, noteIndex), ...old.slice(noteIndex + 1)]
        }
      )
      navigate(mainPath)
      return { previousNoteList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([NOTE, item.id], item)
      queryClient.setQueryData(
        [NOTE, LIST, { folderId: item.folder?.id, categoryId: item.category?.id }],
        context?.previousNoteList
      )
      toast.error("Deletion didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([NOTE, variables.id])
      queryClient.invalidateQueries([
        NOTE,
        LIST,
        { folderId: variables.folder?.id, categoryId: variables.category?.id },
      ])
    },
  })

  const onDelete = (note: Note) => mutate(note)
  return { onDelete }
}
