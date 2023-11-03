import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { JSONContent } from '@tiptap/react'
import { toast } from 'react-hot-toast'

import type { Note } from '../types'
import { NOTE_KEYS } from '../constants'
import { editNoteContent } from '../mutations'
import { ROUTINE_NOTE_KEYS } from '&/modules/routine-note/constants'
import { RoutineNoteByRoutine } from '&/modules/routine-note/types'

export function useEditNoteContent(note: Note) {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: editNoteContent,
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await Promise.all([
        queryClient.cancelQueries({ queryKey: NOTE_KEYS.detail(note.id) }),
        queryClient.cancelQueries({ queryKey: NOTE_KEYS.list({ folderId: note.folder?.id }) }),
        queryClient.cancelQueries({ queryKey: NOTE_KEYS.searches() }),
        queryClient.cancelQueries({ queryKey: ROUTINE_NOTE_KEYS.byRoutineLists() }),
      ])

      // ⛳ Update Item
      const prevNote = queryClient.getQueryData<Note>(NOTE_KEYS.detail(note.id))
      queryClient.setQueryData(NOTE_KEYS.detail(note.id), { ...note, title: data.title, content: data.content })

      // don't update below if title does not change because only title is relevant for lists and routineNote
      if (data.title === note.title) return { prevNote }

      // 🗃️ Update Note List
      const previousNoteList = queryClient.getQueryData(NOTE_KEYS.list({ folderId: note.folder?.id }))
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: note.folder?.id }), (old: Note[] = []) => {
        const noteIndex = old.findIndex((item) => item.id === note.id)
        return [...old.slice(0, noteIndex), { ...old[noteIndex], title: data.title }, ...old.slice(noteIndex + 1)]
      })

      // 🗃️ Update Note search lists
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.searches() }, (old?: Note[]) =>
        old?.map((item) => (item.id === data.id ? { ...item, title: data.title } : item))
      )

      // 🗃️ Update Search Note List
      const previousSearchNoteList = queryClient.getQueryData(NOTE_KEYS.search({ searchText: '' }))
      queryClient.setQueryData(NOTE_KEYS.search({ searchText: '' }), (old: Note[] = []) => {
        const noteIndex = old.findIndex((item) => item.id === note.id)
        if (noteIndex < 0 && data.title?.length) return [...old, data]
        if (noteIndex < 0) return
        if (!data.title?.length) return [...old.slice(0, noteIndex), ...old.slice(noteIndex + 1)]
        return [...old.slice(0, noteIndex), { ...old[noteIndex], title: data.title }, ...old.slice(noteIndex + 1)]
      })

      // 🗃️ Update RoutineNote by routine Lists
      queryClient.setQueriesData({ queryKey: ROUTINE_NOTE_KEYS.byRoutineLists() }, (old?: RoutineNoteByRoutine[]) =>
        old?.map((item) => (item.note.id === data.id ? { ...item, note: { ...item.note, title: data.title } } : item))
      )

      return { previousNoteList, previousSearchNoteList, prevNote }
    },
    onError: (_err, variables, context) => {
      queryClient.setQueryData(NOTE_KEYS.detail(note.id), context?.prevNote)
      if (variables.title !== context?.prevNote?.title) {
        queryClient.setQueryData(NOTE_KEYS.list({ folderId: note.folder?.id }), context?.previousNoteList)
        queryClient.setQueryData(NOTE_KEYS.search({ searchText: '' }), context?.previousSearchNoteList)
        queryClient.setQueriesData({ queryKey: ROUTINE_NOTE_KEYS.byRoutineLists() }, (old?: RoutineNoteByRoutine[]) => {
          if (!context?.prevNote) return
          const prevNote = context?.prevNote
          return old?.map((routineNote) =>
            routineNote.note.id === variables.id ? { ...routineNote, note: prevNote } : routineNote
          )
        })
        queryClient.setQueriesData({ queryKey: NOTE_KEYS.searches() }, (old?: Note[]) =>
          old?.map((item) => (item.id === variables.id ? variables : item))
        )
      }
      toast.error(t('errorModification'))
    },
    onSuccess: (_data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.detail(note.id) })

      if (variables.title !== context?.prevNote?.title) {
        queryClient.invalidateQueries({ queryKey: NOTE_KEYS.list({ folderId: note.folder?.id }) })
        queryClient.invalidateQueries({ queryKey: NOTE_KEYS.search({ searchText: '' }) })
        queryClient.invalidateQueries({ queryKey: ROUTINE_NOTE_KEYS.byRoutineLists() })
      }
    },
  })

  const submit = (json?: JSONContent) => {
    const title = json?.content?.[0]?.content?.[0]?.text || ''
    mutate({ ...note, title, content: json })
  }

  return { submit }
}
