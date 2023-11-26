import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { getShowStatus } from '&/common/utils'
import { categoryAtom } from '&/modules/category/atoms'

import type { Note, NoteListQueryKey } from '../types'
import { NOTE_KEYS } from '../constants'
import { fetchNoteList } from '../queries'

export function useNoteList(limit?: number) {
  const { folderId } = useParams()
  const [category] = useAtom(categoryAtom)
  const [noteList, setNoteList] = useState<Note[]>()

  const notesQuery = useQuery({
    queryKey: NOTE_KEYS.list({ folderId }),
    queryFn: ({ queryKey }: { queryKey: NoteListQueryKey }) => fetchNoteList({ queryKey, limit }),
  })

  useEffect(() => {
    if (category?.id && notesQuery.data) {
      setNoteList(notesQuery.data?.filter((note) => note.category?.id === category.id))
    } else {
      setNoteList(notesQuery.data)
    }
  }, [notesQuery.data, category])

  return { noteList, show: getShowStatus(notesQuery) }
}
