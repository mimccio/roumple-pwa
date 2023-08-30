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
      const listKey = ROUTINE_NOTE_KEYS.list({ routineId: data.routineId })

      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: listKey })

      // ⛳ Update Note item
      const previousNote = queryClient.getQueryData(NOTE_KEYS.detail(data.noteId))
      queryClient.setQueryData(NOTE_KEYS.detail(data.noteId), (old?: Note) => {
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

      // 🗃️ Update List
      const prevTaskNoteList = queryClient.getQueryData(listKey)
      queryClient.setQueryData(listKey, (old: Note[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), ...old.slice(i + 1)]
      })
      return { prevTaskNoteList, previousNote }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(ROUTINE_NOTE_KEYS.list({ routineId: item.routineId }), context?.prevTaskNoteList)
      queryClient.setQueryData(NOTE_KEYS.detail(item.noteId), context?.previousNote)

      toast.error("Delete didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(ROUTINE_NOTE_KEYS.list({ routineId: variables.routineId }))
      queryClient.invalidateQueries(NOTE_KEYS.detail(variables.noteId))
    },
  })

  const onDelete = (routineNote: RoutineNote) => mutate(routineNote)

  return { onDelete }
}
