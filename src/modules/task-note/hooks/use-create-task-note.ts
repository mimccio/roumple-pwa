import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Note } from '&/modules/note/types'
import type { TaskNote } from '../types'
import { TASK_NOTES_KEYS } from '../constants'
import { createTaskNote } from '../mutations'

export function useCreateTaskNote() {
  const { taskId } = useParams()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(createTaskNote, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASK_NOTES_KEYS.list({ taskId: data.taskId }) })

      const previousTaskNoteList = queryClient.getQueryData(TASK_NOTES_KEYS.list({ taskId }))
      queryClient.setQueryData(TASK_NOTES_KEYS.list({ taskId: data.taskId }), (old: Note[] = []) => [...old, data])
      return { previousTaskNoteList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_NOTES_KEYS.list({ taskId: item.taskId }), context?.previousTaskNoteList)
      toast.error("Link note didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(TASK_NOTES_KEYS.list({ taskId: variables.taskId }))
    },
  })

  const onCreate = (note: Note) => {
    if (taskId) {
      const id = `${taskId}-${note.id}`
      const previousTaskNoteList = queryClient.getQueryData(TASK_NOTES_KEYS.list({ taskId })) as TaskNote[]
      const index = previousTaskNoteList.findIndex((item) => item.id === id)
      if (index >= 0) {
        toast.success('Note is already linked')
      } else {
        mutate({ id, taskId, note, noteId: note.id })
      }
    }
  }

  return { onCreate }
}
