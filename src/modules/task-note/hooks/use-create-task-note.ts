import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v5 as uuidv5 } from 'uuid'

import type { Note } from '&/modules/note/types'
import { NOTE_KEYS } from '&/modules/note/constants'
import type { TaskNote } from '../types'
import { TASK_NOTES_KEYS } from '../constants'
import { createTaskNote } from '../mutations'

export function useCreateTaskNote() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(createTaskNote, {
    onMutate: async (data) => {
      // 🗝️ Keys
      const taskNotesKey = TASK_NOTES_KEYS.list(data.task.id)
      const noteKey = NOTE_KEYS.detail(data.note.id)

      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: taskNotesKey })
      await queryClient.cancelQueries({ queryKey: noteKey })

      // ⛳ Update Note item
      const previousNote = queryClient.getQueryData(noteKey)
      queryClient.setQueryData(noteKey, (old?: Note) => {
        if (!old) return
        return {
          ...old,
          taskNotes: old.taskNotes ? [...old.taskNotes, data] : [data],
        }
      })

      // 🗃️ Update TaskNote List
      const previousTaskNoteList = queryClient.getQueryData(taskNotesKey)
      queryClient.setQueryData(taskNotesKey, (old: Note[] = []) => [...old, data])

      return { previousTaskNoteList, previousNote }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_NOTES_KEYS.list(item.task.id), context?.previousTaskNoteList)
      queryClient.setQueryData(NOTE_KEYS.detail(item.note.id), context?.previousNote)

      toast.error("Link note didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(TASK_NOTES_KEYS.list(variables.task.id))
      queryClient.invalidateQueries(NOTE_KEYS.detail(variables.note.id))
    },
  })

  const onCreate = ({ note, task }: { note: Note; task: { id: string; name: string } }) => {
    const id = uuidv5(note.id, task.id)
    const previousTaskNoteList = queryClient.getQueryData(TASK_NOTES_KEYS.list(task.id)) as TaskNote[]
    const index = previousTaskNoteList.findIndex((item) => item.id === id)
    if (index >= 0) {
      toast.success('Note is already linked')
    } else {
      mutate({ id, note, task })
    }
  }

  return { onCreate }
}
