import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import { useAtom } from 'jotai'

import { categoryAtom } from '&/modules/category/atoms'
import { useNoteFolderDetails } from '&/modules/note-folder/hooks'

import type { Note } from '../types'
import { NOTE_KEYS } from '../constants'
import { createNote } from '../mutations'

export function useCreateNote() {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()
  const id = uuidv4()
  const navigate = useNavigate()
  const [category] = useAtom(categoryAtom)
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

      const folderId = data.folder?.id || 'folders'
      navigate(`/notes/${folderId}/d/note/${id}`)
      return { previousNoteListNoCategory, previousSearchList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData(NOTE_KEYS.detail(id), null)
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: folder?.id }), context?.previousNoteListNoCategory)
      queryClient.setQueryData(NOTE_KEYS.search({ searchText: '' }), context?.previousSearchList)
      toast.error(t('errorCreation'))
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
