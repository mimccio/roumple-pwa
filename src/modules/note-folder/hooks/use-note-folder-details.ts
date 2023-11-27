import { useQuery, useQueryClient } from '@tanstack/react-query'

import { NOTE_FOLDER_KEYS } from '../constants'
import { fetchNoteFolder } from '../queries'
import { useParams } from 'react-router-dom'
import { NoteFolder } from '../types'
import { useShow } from '@/common/hooks/use-show'

export function useNoteFolderDetails() {
  const { folderId } = useParams()
  const queryClient = useQueryClient()

  const { data, isLoading, error, isPaused } = useQuery({
    queryKey: NOTE_FOLDER_KEYS.detail(folderId),
    queryFn: fetchNoteFolder,
    enabled: Boolean(folderId),
    initialDataUpdatedAt: () => queryClient.getQueryState(NOTE_FOLDER_KEYS.list({}))?.dataUpdatedAt,
    initialData: () => {
      const folderList = queryClient.getQueryData<NoteFolder[]>(NOTE_FOLDER_KEYS.list({}))
      return folderList?.find((item) => item.id === folderId)
    },
  })

  const show = useShow({ data, isLoading, error, isPaused })

  return { folder: data, show }
}
