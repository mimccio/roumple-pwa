import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { categoryAtom } from '&/modules/category/atoms'

import { LIST, NOTE_FOLDER } from '../constants'
import { fetchNoteFolderList } from '../queries'

export function useFolderList() {
  const [category] = useAtom(categoryAtom)

  const { data, isLoading, error } = useQuery([NOTE_FOLDER, LIST, { categoryId: category?.id }], fetchNoteFolderList)

  return { folderList: data, isLoading, error }
}
