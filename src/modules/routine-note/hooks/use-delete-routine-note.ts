import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Note } from '&/modules/note/types'
import { NOTE_KEYS } from '&/modules/note/constants'
import type { RoutineNote } from '../types'
import { ROUTINE_NOTE_KEYS } from '../constants'
import { deleteRoutineNote } from '../mutations'

export function useDeleteRoutineNote() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(deleteRoutineNote, {
    onMutate: async (data) => {
      // 🗝️ Keys
      const routineNotesKey = ROUTINE_NOTE_KEYS.list(data.routine.id)
      const noteKey = NOTE_KEYS.detail(data.note.id)

      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: routineNotesKey })
      await queryClient.cancelQueries({ queryKey: noteKey })

      // ⛳ Update Note item
      const previousNote = queryClient.getQueryData(noteKey)
      queryClient.setQueryData(noteKey, (old?: Note) => {
        if (!old) return
        if (!old.routineNotes) return old
        const index = old.routineNotes.findIndex((item) => item.id === data.id)
        if (index < 0) return old
        const routineNotes = [...old.routineNotes.slice(0, index), ...old.routineNotes.slice(index + 1)]
        return {
          ...old,
          routineNotes,
        }
      })

      // 🗃️ Update RoutineNote List
      const prevTaskNoteList = queryClient.getQueryData(routineNotesKey)
      // TODO?: wrong type (RoutineNote)
      queryClient.setQueryData(routineNotesKey, (old: Note[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), ...old.slice(i + 1)]
      })
      return { prevTaskNoteList, previousNote }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(ROUTINE_NOTE_KEYS.list(item.routine.id), context?.prevTaskNoteList)
      queryClient.setQueryData(NOTE_KEYS.detail(item.note.id), context?.previousNote)

      toast.error("Delete didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(ROUTINE_NOTE_KEYS.list(variables.routine.id))
      queryClient.invalidateQueries(NOTE_KEYS.detail(variables.note.id))
    },
  })

  const onDelete = (routineNote: RoutineNote) => mutate(routineNote)

  return { onDelete }
}
