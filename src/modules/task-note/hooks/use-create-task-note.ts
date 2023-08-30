import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v5 as uuidv5 } from 'uuid'

import type { Note } from '&/modules/note/types'
import { NOTE_KEYS } from '&/modules/note/constants'
import type { TaskNote } from '../types'
import { TASK_NOTES_KEYS } from '../constants'
import { createTaskNote } from '../mutations'

export function useCreateTaskNote() {
  const { taskId } = useParams()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(createTaskNote, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASK_NOTES_KEYS.list({ taskId: data.taskId }) })

      // ⛳ Update Note item
      const previousNote = queryClient.getQueryData(NOTE_KEYS.detail(data.noteId))
      queryClient.setQueryData(NOTE_KEYS.detail(data.noteId), (old?: Note) => {
        if (!old) return
        return {
          ...old,
          taskNotes: old.taskNotes ? [...old.taskNotes, data] : [data],
        }
      })

      // 🗃️ Update List
      const previousTaskNoteList = queryClient.getQueryData(TASK_NOTES_KEYS.list({ taskId }))
      queryClient.setQueryData(TASK_NOTES_KEYS.list({ taskId: data.taskId }), (old: Note[] = []) => [...old, data])

      return { previousTaskNoteList, previousNote }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(TASK_NOTES_KEYS.list({ taskId: item.taskId }), context?.previousTaskNoteList)
      queryClient.setQueryData(NOTE_KEYS.detail(item.noteId), context?.previousNote)

      toast.error("Link note didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(TASK_NOTES_KEYS.list({ taskId: variables.taskId }))
      queryClient.invalidateQueries(NOTE_KEYS.detail(variables.noteId))
    },
  })

  const onCreate = (note: Note) => {
    if (!taskId) {
      toast.error('Error when linking note')
      return
    }

    const id = uuidv5(note.id, taskId)
    const previousTaskNoteList = queryClient.getQueryData(TASK_NOTES_KEYS.list({ taskId })) as TaskNote[]
    const index = previousTaskNoteList.findIndex((item) => item.id === id)
    if (index >= 0) {
      toast.success('Note is already linked')
    } else {
      mutate({ id, taskId, note, noteId: note.id })
    }
  }

  return { onCreate }
}
