import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { useAtom } from 'jotai'

import { useMainPath } from '&/common/hooks'
import { categoryAtom } from '&/modules/category/atoms'
import { useNoteFolderDetails } from '&/modules/note-folder/hooks'

import type { Note } from '../types'
import { NOTE_KEYS } from '../constants'
import { createNote } from '../mutations'

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
      await queryClient.cancelQueries({ queryKey: NOTE_KEYS.all, exact: false })

      queryClient.setQueryData(NOTE_KEYS.detail(id), () => ({ id, category, created_at, folder }))

      const previousNoteListNoCategory = queryClient.getQueryData(NOTE_KEYS.list({ folderId: folder?.id }))
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: folder?.id }), (old: Note[] = []) => [data, ...old])

      const previousSearchList = queryClient.getQueryData(NOTE_KEYS.search({ searchText: '' }))
      queryClient.setQueryData(NOTE_KEYS.search({ searchText: '' }), (old: Note[] = []) => [data, ...old])

      navigate(`${mainPath}/d/note/${id}`)
      return { previousNoteListNoCategory, previousSearchList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData(NOTE_KEYS.detail(id), null)
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: folder?.id }), context?.previousNoteListNoCategory)
      queryClient.setQueryData(NOTE_KEYS.search({ searchText: '' }), context?.previousSearchList)
      toast.error("Creation didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries(NOTE_KEYS.detail(id))
      queryClient.invalidateQueries(NOTE_KEYS.list({ folderId: folder?.id }))
      queryClient.invalidateQueries(NOTE_KEYS.search({ searchText: '' }))
    },
  })

  const onCreate = () => mutate({ id, category, created_at, folder })

  return { onCreate }
}
