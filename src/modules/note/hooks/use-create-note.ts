import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { categoryAtom } from '&/modules/category/atoms'

import { LIST, NOTE } from '../constants'
import { createNote } from '../mutations'

import { Note } from '../types'
import { useAtom } from 'jotai'
import { useMainPath } from '&/common/hooks'
import { useNoteFolderDetails } from '&/modules/note-folder/hooks'

export function useCreateNote() {
  const queryClient = useQueryClient()
  const id = uuidv4()
  const navigate = useNavigate()
  const [category] = useAtom(categoryAtom)
  const mainPath = useMainPath()
  const { folder } = useNoteFolderDetails()
  const created_at = new Date()

  const { mutate } = useMutation(createNote, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [NOTE], exact: false })

      queryClient.setQueryData([NOTE, id], () => ({ id, category, created_at, folder }))

      const previousNoteListNoCategory = queryClient.getQueryData([
        NOTE,
        LIST,
        { folderId: folder?.id, categoryId: undefined },
      ])
      queryClient.setQueryData([NOTE, LIST, { folderId: folder?.id, categoryId: undefined }], (old: Note[] = []) => [
        data,
        ...old,
      ])

      const previousNoteListCategorySelected = queryClient.getQueryData([
        NOTE,
        LIST,
        { folderId: folder?.id, categoryId: category?.id },
      ])
      queryClient.setQueryData([NOTE, LIST, { folderId: folder?.id, categoryId: category?.id }], (old: Note[] = []) => {
        if (!category?.id) return old
        return [data, ...old]
      })

      navigate(`${mainPath}/d/note/${id}`)

      const previousSearchList = queryClient.getQueryData([NOTE, LIST, { searchText: '' }])
      queryClient.setQueryData([NOTE, LIST, { searchText: '' }], (old: Note[] = []) => [data, ...old])

      return { previousNoteListNoCategory, previousSearchList, previousNoteListCategorySelected }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([NOTE, id], null)
      queryClient.setQueryData([NOTE, LIST, { folderId: folder?.id }], context?.previousNoteListNoCategory)
      queryClient.setQueryData([NOTE, LIST, { categoryId: category?.id }], context?.previousNoteListCategorySelected)
      queryClient.setQueryData([NOTE, LIST, { searchText: '' }], context?.previousSearchList)
      toast.error("Creation didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries([NOTE, id])
      queryClient.invalidateQueries([NOTE, LIST, { folderId: folder?.id }])
      queryClient.invalidateQueries([NOTE, LIST, { searchText: '' }])
    },
  })

  const onCreate = () => mutate({ id, category, created_at, folder })

  return { onCreate }
}
