import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import { ROUTINE_NOTE_LIST } from '../constants'
import { createRoutineNote } from '../mutations'

import { Note } from '&/modules/note/types'

export function useCreateRoutineNote() {
  const { routineId } = useParams()
  const queryClient = useQueryClient()
  const id = uuidv4()

  const { mutate } = useMutation(createRoutineNote, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE_NOTE_LIST, { routineId }] })

      const previousRoutineNoteList = queryClient.getQueryData([ROUTINE_NOTE_LIST, { routineId }])
      queryClient.setQueryData([ROUTINE_NOTE_LIST, { routineId }], (old: Note[] = []) => [...old, data])

      return { previousRoutineNoteList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([ROUTINE_NOTE_LIST, { routineId }], context?.previousRoutineNoteList)
      toast.error("Creation didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries([ROUTINE_NOTE_LIST, { routineId }])
    },
  })

  const onCreate = (note: Note) => {
    if (routineId) {
      mutate({ id, routineId, note, noteId: note.id })
    }
  }

  return { onCreate }
}
