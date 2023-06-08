import { useQuery } from '@tanstack/react-query'

import { NOTE } from '../constants'
import { fetchNoteById } from '../queries'
import { useParams } from 'react-router-dom'

export function useNoteDetail() {
  const { noteId } = useParams()
  const { data, isLoading, error, isPaused } = useQuery([NOTE, noteId], fetchNoteById, { enabled: Boolean(noteId) })

  return { note: data, isLoading, error, isPaused }
}
