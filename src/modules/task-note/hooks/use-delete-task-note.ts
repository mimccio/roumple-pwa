import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Note } from '@/modules/note/types'
import { NOTE_KEYS } from '@/modules/note/constants'
import type { TaskNote } from '../types'
import { TASK_NOTES_KEYS } from '../constants'
import { deleteTaskNote } from '../mutations'

export function useDeleteTaskNote() {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteTaskNote,
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
        if (!old.taskNotes) return old
        const index = old.taskNotes.findIndex((item) => item.id === data.id)
        if (index < 0) return old
        const taskNotes = [...old.taskNotes.slice(0, index), ...old.taskNotes.slice(index + 1)]
        return {
          ...old,
          taskNotes,
        }
      })

      // 🗃️ Update List
      const previousTaskNoteList = queryClient.getQueryData(taskNotesKey)
      queryClient.setQueryData(taskNotesKey, (old: Note[] = []) => {
        const taskNoteIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, taskNoteIndex), ...old.slice(taskNoteIndex + 1)]
      })
      return { previousTaskNoteList, previousNote }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_NOTES_KEYS.list(item.task.id), context?.previousTaskNoteList)
      queryClient.setQueryData(NOTE_KEYS.detail(item.note.id), context?.previousNote)

      toast.error("Delete didn't work")
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: TASK_NOTES_KEYS.list(variables.task.id) })
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.detail(variables.note.id) })
    },
  })

  const onDelete = (taskNote: TaskNote) => mutate(taskNote)

  return { onDelete }
}
