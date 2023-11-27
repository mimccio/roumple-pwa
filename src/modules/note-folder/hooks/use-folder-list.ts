import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import { categoryAtom } from '@/modules/category/atoms'

import { NOTE_FOLDER_KEYS } from '../constants'
import { fetchNoteFolderList } from '../queries'

export function useFolderList() {
  const [category] = useAtom(categoryAtom)

  const { data, isLoading, error } = useQuery({
    queryKey: NOTE_FOLDER_KEYS.list({ categoryId: category?.id }),
    queryFn: fetchNoteFolderList,
  })

  return { folderList: data, isLoading, error, category }
}
