import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { ROUTINE_NOTE_LIST } from '../constants'

import { fetchRoutineNoteList } from '../queries'

export function useRoutineNoteList() {
  const { routineId } = useParams()

  const { data, isLoading, error } = useQuery([ROUTINE_NOTE_LIST, { routineId }], fetchRoutineNoteList, {
    enabled: Boolean(routineId),
  })

  return { routineNotes: data, isLoading, error }
}
