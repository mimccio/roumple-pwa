import { useMutation, useQueryClient } from '@tanstack/react-query'
import { JSONContent } from '@tiptap/react'
import { toast } from 'react-hot-toast'

import type { Note } from '../types'
import { NOTE_KEYS } from '../constants'
import { editNoteContent } from '../mutations'

export function useEditNoteContent(note: Note) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(editNoteContent, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: NOTE_KEYS.all, exact: false })
      queryClient.setQueryData(NOTE_KEYS.detail(note.id), data)

      const previousNoteList = queryClient.getQueryData(NOTE_KEYS.list({ folderId: note.folder?.id }))

      queryClient.setQueryData(NOTE_KEYS.list({ folderId: note.folder?.id }), (old: Note[] = []) => {
        const noteIndex = old.findIndex((item) => item.id === note.id)
        return [...old.slice(0, noteIndex), { ...old[noteIndex], title: data.title }, ...old.slice(noteIndex + 1)]
      })

      const previousSearchNoteList = queryClient.getQueryData(NOTE_KEYS.search({ searchText: '' }))
      queryClient.setQueryData(NOTE_KEYS.search({ searchText: '' }), (old: Note[] = []) => {
        const noteIndex = old.findIndex((item) => item.id === note.id)
        return [...old.slice(0, noteIndex), { ...old[noteIndex], title: data.title }, ...old.slice(noteIndex + 1)]
      })

      return { previousNoteList, previousSearchNoteList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(NOTE_KEYS.detail(note.id), item)
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: note.folder?.id }), context?.previousNoteList)
      queryClient.setQueryData(NOTE_KEYS.search({ searchText: '' }), context?.previousNoteList)

      toast.error("Modification didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries(NOTE_KEYS.detail(note.id))
      queryClient.invalidateQueries(NOTE_KEYS.list({ folderId: note.folder?.id }))
      queryClient.invalidateQueries(NOTE_KEYS.search({ searchText: '' }))
    },
  })

  const submit = (json?: JSONContent) => {
    const title = json?.content?.[0]?.content?.[0]?.text || 'new note'
    mutate({ ...note, title, content: json })
  }
  return { submit }
}
