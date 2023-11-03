import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { v5 as uuidv5 } from 'uuid'

import { sortRoutineNoteByNoteList, sortRoutineNoteByRoutineList } from '&/common/utils'
import type { Note } from '&/modules/note/types'
import type { Routine } from '&/modules/routine/types'

import type { RoutineNoteByNote, RoutineNoteByRoutine } from '../types'
import { createRoutineNote } from '../mutations'
import { ROUTINE_NOTE_KEYS } from '../constants'

export function useCreateRoutineNote(routine: Routine) {
  const { t } = useTranslation('note')
  const queryClient = useQueryClient()

  const routineNoteByRoutineListKey = ROUTINE_NOTE_KEYS.routine(routine.id)

  const { mutate } = useMutation({
    mutationFn: createRoutineNote,
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
        if (!old) return [routineNote]
        return [...old, routineNote].sort(sortRoutineNoteByRoutineList)
      })

      // 🗃️ Update RoutineNote by note list
      const prevRoutineNoteByNoteList = queryClient.getQueryData(routineNoteByNoteListKey)
      queryClient.setQueryData(routineNoteByNoteListKey, (old?: RoutineNoteByNote[]) => {
        if (!old) return [routineNote]
        return [...old, routineNote].sort(sortRoutineNoteByNoteList)
      })

      return { prevRoutineNoteByRoutineList, prevRoutineNoteByNoteList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(routineNoteByRoutineListKey, context?.prevRoutineNoteByRoutineList)
      queryClient.setQueryData(ROUTINE_NOTE_KEYS.note(item.note.id), context?.prevRoutineNoteByNoteList)
      toast.error(t('Error when linking note'))
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: routineNoteByRoutineListKey })
      queryClient.invalidateQueries({ queryKey: ROUTINE_NOTE_KEYS.note(variables.note.id) })
    },
  })

  const onCreateRoutineNote = (note: Note) => {
    const prevRoutineNoteListByRoutine =
      queryClient.getQueryData<RoutineNoteByRoutine[]>(routineNoteByRoutineListKey) || []

    const index = prevRoutineNoteListByRoutine.findIndex((item) => item.note.id === note.id)

    if (index >= 0) {
      toast.success(t('Note is already linked'))
    } else {
      const id = uuidv5(note.id, routine.id)
      mutate({ id, routine, note })
    }
  }

  return { onCreateRoutineNote }
}
