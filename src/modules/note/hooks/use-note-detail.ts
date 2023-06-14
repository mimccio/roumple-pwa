import { useQuery, useQueryClient } from '@tanstack/react-query'

import { NOTE_KEYS } from '../constants'
import { fetchNoteById } from '../queries'
import { useParams } from 'react-router-dom'
import { Note } from '../types'

export function useNoteDetail() {
  const { noteId, folderId } = useParams()
  const queryClient = useQueryClient()

  const { data, isLoading, error, isPaused } = useQuery(NOTE_KEYS.detail(noteId), fetchNoteById, {
    enabled: Boolean(noteId),
    initialDataUpdatedAt: () => queryClient.getQueryState(NOTE_KEYS.list({ folderId }))?.dataUpdatedAt,
    initialData: () => {
      const folderList = queryClient.getQueryData<Note[]>(NOTE_KEYS.list({ folderId }))
      return folderList?.find((item) => item.id === noteId)
    },
  })

  return { note: data, isLoading, error, isPaused }
}
