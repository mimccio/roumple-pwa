import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Note } from '&/modules/note/types'
import { NOTE_KEYS } from '&/modules/note/constants'
import type { TaskNote } from '../types'
import { TASK_NOTES_KEYS } from '../constants'
import { deleteTaskNote } from '../mutations'

export function useDeleteTaskNote() {
  const { taskId } = useParams()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(deleteTaskNote, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASK_NOTES_KEYS.list({ taskId: data.taskId }) })

      // ⛳ Update Note item
      const previousNote = queryClient.getQueryData(NOTE_KEYS.detail(data.noteId))
      queryClient.setQueryData(NOTE_KEYS.detail(data.noteId), (old?: Note) => {
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
      const previousTaskNoteList = queryClient.getQueryData(TASK_NOTES_KEYS.list({ taskId }))
      queryClient.setQueryData(TASK_NOTES_KEYS.list({ taskId: data.taskId }), (old: Note[] = []) => {
        const taskNoteIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, taskNoteIndex), ...old.slice(taskNoteIndex + 1)]
      })
      return { previousTaskNoteList, previousNote }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_NOTES_KEYS.list({ taskId: item.taskId }), context?.previousTaskNoteList)
      queryClient.setQueryData(NOTE_KEYS.detail(item.noteId), context?.previousNote)

      toast.error("Delete didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(TASK_NOTES_KEYS.list({ taskId: variables.taskId }))
      queryClient.invalidateQueries(NOTE_KEYS.detail(variables.noteId))
    },
  })

  const onDelete = (taskNote: TaskNote) => mutate(taskNote)

  return { onDelete }
}
