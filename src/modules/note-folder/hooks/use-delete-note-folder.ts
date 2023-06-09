import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { NoteFolder } from '../types'
import { LIST, NOTE_FOLDER } from '../constants'
import { deleteNoteFolder } from '../mutations'

export function useDeleteNoteFolder(folder: NoteFolder) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const { mutate } = useMutation(deleteNoteFolder, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [NOTE_FOLDER], exact: false })
      const previousFolderList = queryClient.getQueryData([NOTE_FOLDER, LIST])
      queryClient.setQueryData([NOTE_FOLDER, LIST], (old: NoteFolder[] = []) => {
        const folderIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, folderIndex), ...old.slice(folderIndex + 1)]
      })
      navigate('/notes/folders')
      return { previousFolderList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData([NOTE_FOLDER, item.id], item)
      queryClient.setQueryData([NOTE_FOLDER, LIST], context?.previousFolderList)
      toast.error("Deletion didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([NOTE_FOLDER, variables.id])
      queryClient.invalidateQueries([NOTE_FOLDER, LIST])
    },
  })
  const openDeleteModale = () => setIsOpen(true)
  const closeDeleteModale = () => setIsOpen(false)
  const onDelete = () => mutate(folder)

  return { onDelete, isOpen, openDeleteModale, closeDeleteModale }
}
