import { useQuery } from '@tanstack/react-query'

import { NOTE_FOLDER } from '../constants'
import { fetchNoteFolder } from '../queries'
import { useParams } from 'react-router-dom'

export function useNoteFolder() {
  const { folderId } = useParams()

  const isInbox = folderId === 'inbox'

  const { data, isLoading, error } = useQuery([NOTE_FOLDER, folderId], fetchNoteFolder, {
    enabled: Boolean(folderId) && !isInbox,
  })

  return { folder: data, isLoading, error, isInbox }
}
