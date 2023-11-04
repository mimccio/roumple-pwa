import { useQuery } from '@tanstack/react-query'

import { NOTE_FOLDER_KEYS } from '../constants'
import { fetchNoteFolderList } from '../queries'

export function useGetAllFolderList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: NOTE_FOLDER_KEYS.list({ categoryId: null }),
    queryFn: fetchNoteFolderList,
  })

  return { folderList: data, isLoading, isError }
}
