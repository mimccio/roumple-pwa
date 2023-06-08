import { useMutation, useQueryClient } from '@tanstack/react-query'
import { JSONContent } from '@tiptap/react'
import { toast } from 'react-hot-toast'

import type { Note } from '../types'
import { LIST, NOTE } from '../constants'
import { editNoteContent } from '../mutations'

export function useEditNoteContent(note: Note) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(editNoteContent, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [NOTE], exact: false })
      queryClient.setQueryData([NOTE, note.id], data)

      const previousNoteList = queryClient.getQueryData([NOTE, LIST])

      queryClient.setQueryData(
        [NOTE, LIST, { folderId: note.folder?.id, categoryId: note.category?.id }],
        (old: Note[] = []) => {
          const noteIndex = old.findIndex((item) => item.id === note.id)
          return [...old.slice(0, noteIndex), { ...old[noteIndex], title: data.title }, ...old.slice(noteIndex + 1)]
        }
      )

      return { previousNoteList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData([NOTE, note.id], item)
      queryClient.setQueryData(
        [NOTE, LIST, { folderId: note.folder?.id, categoryId: note.category?.id }],
        context?.previousNoteList
      )

      toast.error("Modification didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries([NOTE, note.id])
      queryClient.invalidateQueries([NOTE, LIST, { folderId: note.folder?.id, categoryId: note.category?.id }])
    },
  })

  const submit = (json?: JSONContent) => {
    const title = json?.content?.[0]?.content?.[0]?.text || 'new note'
    mutate({ ...note, title, content: json })
  }
  return { submit }
}
