import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import type { Routine } from '../types'
import { ROUTINE_KEYS } from '../constants'
import { editRoutineName } from '../mutations'
import { getScheduleTypeDate } from '../utils'
import { startOfToday } from 'date-fns'
import { ROUTINE_NOTE_KEYS } from '&/modules/routine-note/constants'
import { RoutineNoteByNote } from '&/modules/routine-note/types'

export function useEditRoutineName(routine: Routine) {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()

  // 🗝️ Keys
  const detailKey = ROUTINE_KEYS.detail(routine.id)
  const listKey = ROUTINE_KEYS.list({ archived: routine.archived })
  const boardKey = ROUTINE_KEYS.board({
    scheduleType: routine.scheduleType,
    date: getScheduleTypeDate({
      scheduleType: routine.scheduleType,
      date: getScheduleTypeDate({ scheduleType: routine.scheduleType, date: startOfToday() }),
    }),
  })
  const linkedNotesKey = ROUTINE_NOTE_KEYS.byNoteLists()

  const { mutate } = useMutation({
    mutationFn: editRoutineName,
    onMutate: async (data) => {
      const newRoutine = { ...routine, name: data.name }

      // ✖️ Cancel related queries
      await Promise.all([
        queryClient.cancelQueries({ queryKey: detailKey }),
        queryClient.cancelQueries({ queryKey: listKey }),
        queryClient.cancelQueries({ queryKey: boardKey }),
        queryClient.cancelQueries({ queryKey: linkedNotesKey }),
      ])

      // ⛳ Update Routine detail
      const prevRoutine = queryClient.getQueryData<Routine>(detailKey)
      queryClient.setQueryData(detailKey, newRoutine)

      // 🗃️ Update Routine List
      const prevList = queryClient.getQueryData(listKey)
      queryClient.setQueryData(listKey, (old: Routine[] = []) =>
        old.map((item) => (item.id === routine.id ? newRoutine : item))
      )

      // 🗃️ Update Routine board
      const prevBoard = queryClient.getQueryData(boardKey)
      queryClient.setQueryData(boardKey, (old: Routine[] = []) =>
        old.map((item) => (item.id === routine.id ? newRoutine : item))
      )

      // 🗃️ Update RoutineNote by note Lists
      queryClient.setQueriesData({ queryKey: linkedNotesKey }, (old?: RoutineNoteByNote[]) =>
        old?.map((item) =>
          item.routine.id === routine.id ? { ...item, routine: { ...item.routine, name: data.name } } : item
        )
      )

      return { prevList, prevBoard, prevRoutine }
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(detailKey, context?.prevRoutine)
      queryClient.setQueryData(listKey, context?.prevList)
      queryClient.setQueryData(boardKey, context?.prevBoard)
      queryClient.setQueriesData({ queryKey: linkedNotesKey }, (old?: RoutineNoteByNote[]) => {
        if (!context?.prevRoutine) return
        const name = context.prevRoutine.name
        return old?.map((item) =>
          item.routine.id === routine.id ? { ...item, routine: { ...item.routine, name } } : item
        )
      })
      toast.error(t('errorModification'))
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: detailKey })
      queryClient.invalidateQueries({ queryKey: listKey })
      queryClient.invalidateQueries({ queryKey: boardKey })
      queryClient.invalidateQueries({ queryKey: linkedNotesKey })
    },
  })

  const submit = (name: string) => mutate({ id: routine.id, name })
  return { submit }
}
