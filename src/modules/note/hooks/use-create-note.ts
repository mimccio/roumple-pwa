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

export function useCreateNote() {
  const queryClient = useQueryClient()
  const id = uuidv4()
  const navigate = useNavigate()
  const [category] = useAtom(categoryAtom)
  const mainPath = useMainPath()

  const { mutate } = useMutation(createNote, {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [NOTE], exact: false })

      queryClient.setQueryData([NOTE, id], () => ({ id }))

      const previousNoteList = queryClient.getQueryData([NOTE, LIST, { folderId: undefined }])
      queryClient.setQueryData([NOTE, LIST, { folderId: undefined }], (old: Note[] = []) => [...old, { id }])

      navigate(`${mainPath}/d/note/${id}`)

      const previousSearchList = queryClient.getQueryData([NOTE, LIST, { searchText: '' }])
      queryClient.setQueryData([NOTE, LIST, { searchText: '' }], (old: Note[] = []) => [{ id }, ...old])

      return { previousNoteList, previousSearchList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([NOTE, id], null)
      queryClient.setQueryData([NOTE, LIST, { folderId: undefined }], context?.previousNoteList)
      queryClient.setQueryData([NOTE, LIST, { searchText: '' }], context?.previousSearchList)
      toast.error("Creation didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries([NOTE, id])
      queryClient.invalidateQueries([NOTE, LIST, { folderId: undefined }])
      queryClient.invalidateQueries([NOTE, LIST, { searchText: '' }])
    },
  })

  const onCreate = () => mutate({ id, categoryId: category?.id })

  return { onCreate }
}