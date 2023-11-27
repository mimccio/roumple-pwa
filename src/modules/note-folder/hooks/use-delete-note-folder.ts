import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'

import type { NoteFolder } from '../types'
import { NOTE_FOLDER_KEYS } from '../constants'
import { deleteNoteFolder } from '../mutations'
import { useCategories } from '@/modules/category/hooks'
import { sortByCreatedAtAsc } from '@/common/utils'

export function useDeleteNoteFolder(folder: NoteFolder) {
  const queryClient = useQueryClient()
  const { t } = useTranslation('error')
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const { categoryList } = useCategories()

  const { mutate } = useMutation({
    mutationFn: deleteNoteFolder,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: NOTE_FOLDER_KEYS.detail(data.id) })
      await queryClient.cancelQueries({ queryKey: NOTE_FOLDER_KEYS.lists(), exact: false })

      const previousFolderList = queryClient.getQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }))
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }), (old: NoteFolder[] = []) => {
        const folderIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, folderIndex), ...old.slice(folderIndex + 1)]
      })

      const categoryIds: string[] = []

      if (categoryList) {
        categoryList.forEach((category) => {
          queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: category.id }), (old: NoteFolder[] = []) => {
            const folderIndex = old.findIndex((item) => item.id === data.id)

            if (folderIndex < 0) return old

            categoryIds.push(category.id)
            return [...old.slice(0, folderIndex), ...old.slice(folderIndex + 1)]
          })
        })
      }

      navigate('/notes/folders')

      return { previousFolderList, categoryIds }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(NOTE_FOLDER_KEYS.detail(item.id), item)
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }), context?.previousFolderList)

      if (context?.categoryIds.length) {
        context.categoryIds.forEach((categoryId) => {
          queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId }), (old: NoteFolder[] = []) => {
            return [...old, { ...item, noteCount: [{ count: item.notes?.length || 0 }] }].sort(sortByCreatedAtAsc)
          })
        })
      }

      toast.error(t('errorDelete'))
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: NOTE_FOLDER_KEYS.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: NOTE_FOLDER_KEYS.lists() })
    },
  })
  const openDeleteModale = () => setIsOpen(true)
  const closeDeleteModale = () => setIsOpen(false)
  const onDelete = () => mutate(folder)

  return { onDelete, isOpen, openDeleteModale, closeDeleteModale }
}
