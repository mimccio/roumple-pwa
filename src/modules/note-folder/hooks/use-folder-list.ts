import { useQuery } from '@tanstack/react-query'

import { LIST, NOTE_FOLDER } from '../constants'
import { fetchNoteFolderList } from '../queries'

export function useFolderList() {
  const { data, isLoading, error } = useQuery([NOTE_FOLDER, LIST], fetchNoteFolderList)

  return { folderList: data, isLoading, error }
}
