import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v5 as uuidv5 } from 'uuid'

import type { Note } from '&/modules/note/types'
import type { RoutineNote } from '../types'
import { ROUTINE_NOTE_KEYS } from '../constants'
import { createRoutineNote } from '../mutations'

export function useCreateRoutineNote() {
  const { routineId } = useParams()
  const queryClient = useQueryClient()
  const listKey = ROUTINE_NOTE_KEYS.list({ routineId })

  const { mutate } = useMutation(createRoutineNote, {
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: listKey })

      // 🗃️ Update List
      const prevRoutineNoteList = queryClient.getQueryData(listKey)
      queryClient.setQueryData(listKey, (old: Note[] = []) => [...old, data])

      return { prevRoutineNoteList }
    },
    onError: (_err, _item, context) => {
      queryClient.setQueryData(listKey, context?.prevRoutineNoteList)
      toast.error('Error when linking note')
    },
    onSuccess: () => {
      queryClient.invalidateQueries(listKey)
    },
  })

  const onCreate = (note: Note) => {
    if (!routineId) {
      toast.error('Error when linking note')
      return
    }
    const id = uuidv5(note.id, routineId)
    const previousTaskNoteList = queryClient.getQueryData(listKey) as RoutineNote[]
    const index = previousTaskNoteList.findIndex((item) => item.id === id)
    if (index >= 0) {
      toast.success('Note is already linked')
    } else {
      mutate({ id, routineId, note, noteId: note.id })
    }
  }

  return { onCreate }
}
