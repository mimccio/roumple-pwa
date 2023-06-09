import { useRef, useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useOutsideClick } from '&/common/hooks'
import type { Note } from '&/modules/note/types'
import { NOTE } from '&/modules/note/constants'
import type { NoteFolder } from '../types'
import { LIST, NOTE_FOLDER } from '../constants'
import { editNoteFolder } from '../mutations'

export function useEditNoteFolder(folder: NoteFolder) {
  const queryClient = useQueryClient()
  const ref = useRef<HTMLFormElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const { mutate } = useMutation(editNoteFolder, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [NOTE_FOLDER], exact: false })
      queryClient.setQueryData([NOTE_FOLDER, folder.id], () => ({ ...folder, name: data.name }))

      const previousNoteList = queryClient.getQueryData([NOTE, LIST, { folderId: folder.id }])
      queryClient.setQueryData([NOTE, LIST, { folderId: folder.id }], (old: Note[] = []) => {
        return old.map((item) => {
          if (item.folder?.id) {
            return { ...item, folder: { ...item.folder, name: data.name } }
          }
          return item
        })
      })

      const previousFolderList = queryClient.getQueryData([NOTE_FOLDER, LIST])
      queryClient.setQueryData([NOTE_FOLDER, LIST], (old: NoteFolder[] = []) => {
        const folderIndex = old.findIndex((item) => item.id === folder.id)
        return [...old.slice(0, folderIndex), { ...old[folderIndex], name: data.name }, ...old.slice(folderIndex + 1)]
      })

      return { previousNoteList, previousFolderList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([NOTE_FOLDER, folder.id], item)
      queryClient.setQueryData([NOTE, LIST, { folderId: folder.id }], context?.previousNoteList)
      queryClient.setQueryData([NOTE_FOLDER, LIST], context?.previousFolderList)

      toast.error("Edit didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries([NOTE_FOLDER, folder.id])
      queryClient.invalidateQueries([NOTE, LIST, { folderId: folder.id }])
      queryClient.invalidateQueries([NOTE_FOLDER, LIST], { exact: false })
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
