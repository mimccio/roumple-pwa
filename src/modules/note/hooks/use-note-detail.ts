import { useQuery, useQueryClient } from '@tanstack/react-query'

import { LIST, NOTE } from '../constants'
import { fetchNoteById } from '../queries'
import { useParams } from 'react-router-dom'
import { Note } from '../types'

export function useNoteDetail() {
  const { noteId, folderId } = useParams()
  const queryClient = useQueryClient()

  const { data, isLoading, error, isPaused } = useQuery([NOTE, noteId], fetchNoteById, {
    enabled: Boolean(noteId),
    initialDataUpdatedAt: () => queryClient.getQueryState([NOTE, LIST, { folderId }])?.dataUpdatedAt,
    initialData: () => {
      const folderList = queryClient.getQueryData<Note[]>([NOTE, LIST, { folderId }])
      return folderList?.find((item) => item.id === noteId)
    },
  })

  return { note: data, isLoading, error, isPaused }
}
