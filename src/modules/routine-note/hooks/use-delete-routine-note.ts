import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import type { RoutineNoteByNote, RoutineNoteByRoutine } from '../types'
import { ROUTINE_NOTE_KEYS } from '../constants'
import { deleteRoutineNote } from '../mutations'

export function useDeleteRoutineNote() {
  const { t } = useTranslation('error')
  const { routineId } = useParams()
  const queryClient = useQueryClient()

  const routineNoteByRoutineListKey = ROUTINE_NOTE_KEYS.routine(routineId)

  const { mutate } = useMutation({
    mutationFn: deleteRoutineNote,
    onMutate: async (routineNote) => {
      // 🗝️ Keys
      const routineNoteByNoteListKey = ROUTINE_NOTE_KEYS.note(routineNote.note.id)

      // ✖️ Cancel related queries
      await Promise.all([
        queryClient.cancelQueries({ queryKey: routineNoteByRoutineListKey }),
        queryClient.cancelQueries({ queryKey: routineNoteByNoteListKey }),
      ])

      // 🗃️ Update RoutineNote by routine list
      const prevRoutineNoteByRoutineList = queryClient.getQueryData(routineNoteByRoutineListKey)
      queryClient.setQueryData(routineNoteByRoutineListKey, (old?: RoutineNoteByRoutine[]) => {
        if (!old) return
        const index = old.findIndex((item) => item.id === routineNote.id)
        if (index >= 0) return [...old.slice(0, index), ...old.slice(index + 1)]
      })

      // 🗃️ Update RoutineNote list by routine
      const prevRoutineNoteByNoteList = queryClient.getQueryData(routineNoteByNoteListKey)
      queryClient.setQueryData(routineNoteByNoteListKey, (old?: RoutineNoteByNote[]) => {
        if (!old) return
        const index = old.findIndex((item) => item.id === routineNote.id)
        if (index >= 0) return [...old.slice(0, index), ...old.slice(index + 1)]
      })

      return { prevRoutineNoteByRoutineList, prevRoutineNoteByNoteList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(routineNoteByRoutineListKey, context?.prevRoutineNoteByRoutineList)
      queryClient.setQueryData(ROUTINE_NOTE_KEYS.note(item.note.id), context?.prevRoutineNoteByNoteList)
      toast.error(t('errorDelete'))
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: routineNoteByRoutineListKey })
      queryClient.invalidateQueries({ queryKey: ROUTINE_NOTE_KEYS.note(variables.note.id) })
    },
  })

  const onDelete = (routineNote: RoutineNoteByRoutine) => mutate(routineNote)

  return { onDelete }
}
