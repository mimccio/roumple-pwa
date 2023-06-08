import { useQuery } from '@tanstack/react-query'

import { LIST, NOTE } from '../constants'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { categoryAtom } from '&/modules/category/atoms'
import { fetchNoteList } from '../queries/fetch-note-list'

export function useNoteList() {
  const { folderId: folderIdParams } = useParams()
  const [category] = useAtom(categoryAtom)

  const folderId = folderIdParams === 'inbox' ? undefined : folderIdParams

  const { data, isLoading, error } = useQuery([NOTE, LIST, { folderId, categoryId: category?.id }], fetchNoteList)

  return { noteList: data, isLoading, error }
}
