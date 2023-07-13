import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Note } from '&/modules/note/types'
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

      // 🗃️ Update List
      const prevTaskNoteList = queryClient.getQueryData(listKey)
      queryClient.setQueryData(listKey, (old: Note[] = []) => {
        const i = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, i), ...old.slice(i + 1)]
      })
      return { prevTaskNoteList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(ROUTINE_NOTE_KEYS.list({ routineId: item.routineId }), context?.prevTaskNoteList)
      toast.error("Delete didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(ROUTINE_NOTE_KEYS.list({ routineId: variables.routineId }))
    },
  })

  const onDelete = (routineNote: RoutineNote) => mutate(routineNote)

  return { onDelete }
}
