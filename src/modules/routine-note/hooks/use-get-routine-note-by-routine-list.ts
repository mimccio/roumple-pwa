import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import { ROUTINE_NOTE_KEYS } from '../constants'
import { fetchRoutineNoteByRoutineList } from '../queries'
import { useEffect } from 'react'

export function useGetRoutineNoteByRoutineList() {
  const { t } = useTranslation('note')
  const { routineId } = useParams()

  const { data, isLoading, isError, isPaused } = useQuery({
    queryKey: ROUTINE_NOTE_KEYS.routine(routineId),
    queryFn: fetchRoutineNoteByRoutineList,
    enabled: Boolean(routineId),
  })

  useEffect(() => {
    if (isError) toast.error(t('Error fetching linked notes'))
  }, [t, isError])

  return { routineNoteList: data?.filter((item) => !item.deleted), routineNoteListIsLoading: isLoading && !isPaused }
}
