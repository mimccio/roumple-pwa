import { useRef, useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useOutsideClick } from '&/common/hooks'
import type { Note } from '&/modules/note/types'
import { NOTE_KEYS } from '&/modules/note/constants'
import { useCategories } from '&/modules/category/hooks'
import type { NoteFolder } from '../types'
import { NOTE_FOLDER_KEYS } from '../constants'
import { editNoteFolder } from '../mutations'

export function useEditNoteFolder(folder: NoteFolder) {
  const queryClient = useQueryClient()
  const ref = useRef<HTMLFormElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { categoryList } = useCategories()

  const { mutate } = useMutation(editNoteFolder, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: NOTE_FOLDER_KEYS.detail(data.id) })
      await queryClient.cancelQueries({ queryKey: NOTE_FOLDER_KEYS.lists(), exact: false })

      // Item
      queryClient.setQueryData(NOTE_FOLDER_KEYS.detail(data.id), () => ({ ...folder, name: data.name }))

      const previousNoteList = queryClient.getQueryData(NOTE_KEYS.list({ folderId: folder.id }))
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: folder.id }), (old: Note[] = []) => {
        return old.map((item) => {
          if (item.folder?.id) {
            return { ...item, folder: { ...item.folder, name: data.name } }
          }
          return item
        })
      })

      const previousFolderList = queryClient.getQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }))
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }), (old: NoteFolder[] = []) => {
        const folderIndex = old.findIndex((item) => item.id === folder.id)
        return [...old.slice(0, folderIndex), { ...old[folderIndex], name: data.name }, ...old.slice(folderIndex + 1)]
      })

      const categoryIds: string[] = []

      if (categoryList) {
        categoryList.forEach((category) => {
          queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: category.id }), (old: NoteFolder[] = []) => {
            const folderIndex = old.findIndex((item) => item.id === data.id)
            if (folderIndex < 0) return old
            categoryIds.push(category.id)
            return [
              ...old.slice(0, folderIndex),
              { ...old[folderIndex], name: data.name },
              ...old.slice(folderIndex + 1),
            ]
          })
        })
      }

      return { previousNoteList, previousFolderList, categoryIds }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(NOTE_FOLDER_KEYS.detail(item.id), item)
      queryClient.setQueryData(NOTE_KEYS.list({ folderId: folder.id }), context?.previousNoteList)
      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }), context?.previousFolderList)

      toast.error("Edit didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries(NOTE_FOLDER_KEYS.detail(folder.id))
      queryClient.invalidateQueries(NOTE_KEYS.list({ folderId: folder.id }))
      queryClient.invalidateQueries(NOTE_FOLDER_KEYS.list({ categoryId: undefined }))
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
    reset,
  } = useForm<{ name: string }>({
    values: { name: folder.name },
  })

  const name = watch('name')

  const submit = handleSubmit(({ name }) => {
    if (name !== folder.name) mutate({ ...folder, name })
    reset()
    setIsEditing(false)
  })

  const onRename = () => setIsEditing(true)

  useOutsideClick({ handler: clearErrors, ref })

  return { register, errors, submit, ref, name, onRename, isEditing }
}
