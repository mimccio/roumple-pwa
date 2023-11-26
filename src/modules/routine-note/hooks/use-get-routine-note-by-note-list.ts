import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import { ROUTINE_NOTE_KEYS } from '../constants'
import { fetchRoutineNoteByNoteList } from '../queries'
import { useEffect } from 'react'

export function useGetRoutineNoteByNoteList() {
  const { t } = useTranslation('routine')
  const { noteId } = useParams()

  const { data, isLoading, isError, isPaused } = useQuery({
    queryKey: ROUTINE_NOTE_KEYS.note(noteId),
    queryFn: fetchRoutineNoteByNoteList,
    enabled: Boolean(noteId),
  })

  useEffect(() => {
    if (isError) toast.error(t('Error fetching linked routines'))
  }, [t, isError])

  return { routineNoteList: data?.filter((item) => !item.deleted), routineNoteListIsLoading: isLoading && !isPaused }
}
