import { useQuery, useQueryClient } from '@tanstack/react-query'

import { LIST, NOTE_FOLDER } from '../constants'
import { fetchNoteFolder } from '../queries'
import { useParams } from 'react-router-dom'
import { NoteFolder } from '../types'
import { useShow } from '&/common/hooks/use-show'

export function useNoteFolder() {
  const { folderId } = useParams()
  const queryClient = useQueryClient()

  const { data, isLoading, error, isPaused } = useQuery([NOTE_FOLDER, folderId], fetchNoteFolder, {
    enabled: Boolean(folderId) && folderId !== 'inbox',
    initialDataUpdatedAt: () => queryClient.getQueryState([NOTE_FOLDER, LIST], {})?.dataUpdatedAt,
    initialData: () => {
      const folderList = queryClient.getQueryData<NoteFolder[]>([NOTE_FOLDER, LIST, {}])
      return folderList?.find((item) => item.id === folderId)
    },
  })

  const show = useShow({ data, isLoading, error, isPaused })

  return { folder: data, show }
}
