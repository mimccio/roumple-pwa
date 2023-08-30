import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v5 as uuidv5 } from 'uuid'

import type { Note } from '&/modules/note/types'
import { NOTE_KEYS } from '&/modules/note/constants'
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

      // ⛳ Update Note item
      const previousNote = queryClient.getQueryData(NOTE_KEYS.detail(data.noteId))
      queryClient.setQueryData(NOTE_KEYS.detail(data.noteId), (old?: Note) => {
        if (!old) return
        return {
          ...old,
          routineNotes: old.routineNotes ? [...old.routineNotes, data] : [data],
        }
      })

      // 🗃️ Update List
      const prevRoutineNoteList = queryClient.getQueryData(listKey)
      queryClient.setQueryData(listKey, (old: Note[] = []) => [...old, data])

      return { prevRoutineNoteList, previousNote }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(listKey, context?.prevRoutineNoteList)
      queryClient.setQueryData(NOTE_KEYS.detail(item.noteId), context?.previousNote)
      toast.error('Error when linking note')
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(listKey)
      queryClient.invalidateQueries(NOTE_KEYS.detail(variables.noteId))
    },
  })

  const onCreate = (note: Note) => {
    if (!routineId) {
      toast.error('Error when linking note')
      return
    }
    const id = uuidv5(note.id, routineId)
    const previousRoutineNoteList = queryClient.getQueryData(listKey) as RoutineNote[]
    const index = previousRoutineNoteList?.findIndex((item) => item.id === id)
    if (index >= 0) {
      toast.success('Note is already linked')
    } else {
      mutate({ id, routineId, note, noteId: note.id })
    }
  }

  return { onCreate }
}
