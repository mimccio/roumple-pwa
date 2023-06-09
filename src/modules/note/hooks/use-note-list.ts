import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { LIST, NOTE } from '../constants'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { categoryAtom } from '&/modules/category/atoms'
import { fetchNoteList } from '../queries/fetch-note-list'
import { Note, NoteListQueryKey } from '../types'
import { toast } from 'react-hot-toast'

export function useNoteList(limit?: number) {
  const { folderId: folderIdParams } = useParams()
  const [category] = useAtom(categoryAtom)
  const [noteList, setNoteList] = useState<Note[]>()

  const folderId = folderIdParams === 'inbox' ? undefined : folderIdParams

  const { data, isLoading, error } = useQuery(
    [NOTE, LIST, { folderId }],
    ({ queryKey }: { queryKey: NoteListQueryKey }) => fetchNoteList({ queryKey, limit }),
    {
      onError: () => toast.error('Error fetching note list'),
    }
  )

  useEffect(() => {
    if (category?.id && data) {
      setNoteList(data?.filter((note) => note.category?.id === category.id))
    } else {
      setNoteList(data)
    }
  }, [data, category])

  return { noteList, isLoading, error }
}
