import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
// import { toast } from 'react-hot-toast'

import { useShow } from '&/common/hooks/use-show'
import { categoryAtom } from '&/modules/category/atoms'
import type { Note, NoteListQueryKey } from '../types'
import { NOTE_KEYS } from '../constants'
import { fetchNoteList } from '../queries'

export function useNoteList(limit?: number) {
  const { folderId } = useParams()
  const [category] = useAtom(categoryAtom)
  const [noteList, setNoteList] = useState<Note[]>()

  const { data, isLoading, error, isPaused } = useQuery({
    queryKey: NOTE_KEYS.list({ folderId }),
    queryFn: ({ queryKey }: { queryKey: NoteListQueryKey }) => fetchNoteList({ queryKey, limit }),
    // onError: () => toast.error('Error fetching note list'), // TODO: handle error
  })

  useEffect(() => {
    if (category?.id && data) {
      setNoteList(data?.filter((note) => note.category?.id === category.id))
    } else {
      setNoteList(data)
    }
  }, [data, category])

  const show = useShow({ data, isLoading, error, isPaused })

  return { noteList, show }
}
