import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Note } from '&/modules/note/types'
import type { TaskNote } from '../types'
import { TASK_NOTES_KEYS } from '../constants'
import { deleteTaskNote } from '../mutations'

export function useDeleteTaskNote() {
  const { taskId } = useParams()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(deleteTaskNote, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASK_NOTES_KEYS.list({ taskId: data.taskId }) })

      const previousTaskNoteList = queryClient.getQueryData(TASK_NOTES_KEYS.list({ taskId }))
      queryClient.setQueryData(TASK_NOTES_KEYS.list({ taskId: data.taskId }), (old: Note[] = []) => {
        const taskNoteIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, taskNoteIndex), ...old.slice(taskNoteIndex + 1)]
      })
      return { previousTaskNoteList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_NOTES_KEYS.list({ taskId: item.taskId }), context?.previousTaskNoteList)
      toast.error("Delete didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(TASK_NOTES_KEYS.list({ taskId: variables.taskId }))
    },
  })

  const onDelete = (taskNote: TaskNote) => mutate(taskNote)

  return { onDelete }
}
