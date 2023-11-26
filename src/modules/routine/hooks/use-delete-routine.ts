import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { startOfToday } from 'date-fns'

import type { Routine } from '../types'
import { ROUTINE_KEYS } from '../constants'
import { deleteRoutine } from '../mutations'
import { ROUTINE_NOTE_KEYS } from '&/modules/routine-note/constants'
import { RoutineNoteByNote } from '&/modules/routine-note/types'

export function useDeleteRoutine() {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const date = startOfToday()

  const { mutate } = useMutation({
    mutationFn: deleteRoutine,
    onMutate: async (routine) => {
      // 🗝️ Keys
      const listKey = ROUTINE_KEYS.list({ archived: routine.archived })
      const boardKey = ROUTINE_KEYS.board({ scheduleType: routine.scheduleType, date })

      // ✖️ Cancel related queries
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.detail(routine.id) }),
        queryClient.cancelQueries({ queryKey: listKey }),
        queryClient.cancelQueries({ queryKey: boardKey }),
        queryClient.cancelQueries({ queryKey: ROUTINE_NOTE_KEYS.routine(routine.id) }),
        queryClient.cancelQueries({ queryKey: ROUTINE_NOTE_KEYS.byNoteLists() }),
      ])

      // ⛳ Update Item
      queryClient.setQueryData(ROUTINE_KEYS.detail(routine.id), null)

      // 🗃️ Update Routine List
      const prevList = queryClient.getQueryData(listKey)
      queryClient.setQueryData(listKey, (old: Routine[] = []) => old && old.filter((r) => r.id !== routine.id))

      // 🏫 Update Routine Board
      const prevBoard = queryClient.getQueryData(boardKey)
      queryClient.setQueryData(boardKey, (old: Routine[] = []) => old && old.filter((r) => r.id !== routine.id))

      // 🗃️ Update RoutineNote by note lists
      queryClient.setQueriesData({ queryKey: ROUTINE_NOTE_KEYS.byNoteLists() }, (old?: RoutineNoteByNote[]) =>
        old?.map((item) => (item.routine.id === routine.id ? { ...item, deleted: true } : item))
      )

      navigate('/routines')
      return { prevList, prevBoard }
    },

    onError: (_err, routine, context) => {
      queryClient.setQueryData(ROUTINE_KEYS.detail(routine.id), routine)
      queryClient.setQueryData(ROUTINE_KEYS.list({ archived: routine.archived }), context?.prevList)
      queryClient.setQueryData(ROUTINE_KEYS.board({ scheduleType: routine.scheduleType, date }), context?.prevBoard)
      queryClient.setQueriesData({ queryKey: ROUTINE_NOTE_KEYS.byNoteLists() }, (old?: RoutineNoteByNote[]) =>
        old?.map((routineNote) =>
          routineNote.routine.id === routine.id ? { ...routineNote, deleted: false } : routineNote
        )
      )

      toast.error(t('errorDelete'))
    },
    onSettled: (_data, _error, routine) => {
      queryClient.invalidateQueries({ queryKey: ROUTINE_KEYS.detail(routine.id) })
      queryClient.invalidateQueries({ queryKey: ROUTINE_KEYS.list({ archived: routine.archived }) })
      queryClient.invalidateQueries({ queryKey: ROUTINE_KEYS.board({ scheduleType: routine.scheduleType, date }) })
      queryClient.invalidateQueries({ queryKey: ROUTINE_NOTE_KEYS.byNoteLists() })
      queryClient.removeQueries({ queryKey: ROUTINE_NOTE_KEYS.routine(routine.id) })
    },
  })

  const onDeleteRoutine = (routine: Routine) => mutate(routine)
  return { onDeleteRoutine }
}
