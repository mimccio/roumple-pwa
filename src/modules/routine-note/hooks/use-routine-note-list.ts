import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { ROUTINE_NOTE_KEYS } from '../constants'

import { fetchRoutineNoteList } from '../queries'
// TODO: remove and fetch through routine

export function useRoutineNoteList() {
  const { routineId } = useParams()

  const { data, isLoading, error } = useQuery(ROUTINE_NOTE_KEYS.list(routineId), fetchRoutineNoteList, {
    enabled: Boolean(routineId),
  })

  return { routineNotes: data, isLoading, error }
}
