import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Note } from '&/modules/note/types'
import type { RoutineNote } from '../types'
import { ROUTINE_NOTE_LIST } from '../constants'
import { deleteRoutineNote } from '../mutations'

export function useDeleteRoutineNote() {
  const { routineId } = useParams()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(deleteRoutineNote, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE_NOTE_LIST, { routineId }] })

      const previousTaskNoteList = queryClient.getQueryData([ROUTINE_NOTE_LIST, { routineId }])
      queryClient.setQueryData([ROUTINE_NOTE_LIST, { routineId }], (old: Note[] = []) => {
        const taskNoteIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, taskNoteIndex), ...old.slice(taskNoteIndex + 1)]
      })
      return { previousTaskNoteList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE_NOTE_LIST, { routineId }], context?.previousTaskNoteList)
      toast.error("Delete didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([ROUTINE_NOTE_LIST, { routineId }])
    },
  })

  const onDelete = (taskNote: RoutineNote) => mutate(taskNote)

  return { onDelete }
}
