import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { useGetRoutineNoteByNoteList } from '&/modules/routine-note/hooks'
import type { Note } from '../types'
import { NOTE_KEYS } from '../constants'
import { fetchNoteById } from '../queries'

export function useGetNoteDetail() {
  const { noteId, folderId } = useParams()
  const queryClient = useQueryClient()

  const {
    data: note,
    isLoading: noteIsLoading,
    error,
    isPaused,
  } = useQuery(NOTE_KEYS.detail(noteId), fetchNoteById, {
    enabled: Boolean(noteId),
    initialDataUpdatedAt: () => queryClient.getQueryState(NOTE_KEYS.list({ folderId }))?.dataUpdatedAt,
    initialData: () => {
      const folderList = queryClient.getQueryData<Note[]>(NOTE_KEYS.list({ folderId }))
      return folderList?.find((item) => item.id === noteId)
    },
  })

  const { routineNoteList, routineNoteListIsLoading } = useGetRoutineNoteByNoteList()

  return { note, isLoading: noteIsLoading || routineNoteListIsLoading, error, isPaused, routineNoteList }
}
