import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v5 as uuidv5 } from 'uuid'

import type { Note } from '&/modules/note/types'
import { NOTE_KEYS } from '&/modules/note/constants'
import type { RoutineNote } from '../types'
import { ROUTINE_NOTE_KEYS } from '../constants'
import { createRoutineNote } from '../mutations'
import { Routine } from '&/modules/routine/types'

export function useCreateRoutineNote() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(createRoutineNote, {
    onMutate: async (data) => {
      // 🗝️ Keys
      const routineNotesKey = ROUTINE_NOTE_KEYS.list(data.routine.id)
      const noteKey = NOTE_KEYS.detail(data.note.id)

      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: routineNotesKey })
      await queryClient.cancelQueries({ queryKey: noteKey })

      // ⛳ Update Note item
      const previousNote = queryClient.getQueryData(noteKey)
      queryClient.setQueryData(noteKey, (old?: Note) => {
        if (!old) return
        return {
          ...old,
          routineNotes: old.routineNotes ? [...old.routineNotes, data] : [data],
        }
      })

      // 🗃️ Update RoutineNote List
      const prevRoutineNoteList = queryClient.getQueryData(routineNotesKey)
      // TODO?: wrong type (RoutineNote)
      queryClient.setQueryData(routineNotesKey, (old: Note[] = []) => [...old, data])

      return { prevRoutineNoteList, previousNote }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(ROUTINE_NOTE_KEYS.list(item.routine.id), context?.prevRoutineNoteList)
      queryClient.setQueryData(NOTE_KEYS.detail(item.note.id), context?.previousNote)
      toast.error('Error when linking note')
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(ROUTINE_NOTE_KEYS.list(variables.routine.id))
      queryClient.invalidateQueries(NOTE_KEYS.detail(variables.note.id))
    },
  })

  const onCreate = ({ note, routine }: { note: Note; routine: Routine }) => {
    const id = uuidv5(note.id, routine.id)
    const previousRoutineNoteList = queryClient.getQueryData(ROUTINE_NOTE_KEYS.list(routine.id)) as RoutineNote[]
    const index = previousRoutineNoteList?.findIndex((item) => item.id === id)
    if (index >= 0) {
      toast.success('Note is already linked')
    } else {
      mutate({ id, note, routine })
    }
  }

  return { onCreate }
}
