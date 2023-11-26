import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import { useOutsideClick } from '&/common/hooks'
import { NOTE_FOLDER_KEYS } from '../constants'
import { createNoteFolder } from '../mutations'
import { NoteFolder } from '../types'

export function useCreateNoteFolder() {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()
  const id = uuidv4()

  const { mutate } = useMutation({
    mutationFn: createNoteFolder,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: NOTE_FOLDER_KEYS.list({ categoryId: undefined }) })
      const previousFolderList = queryClient.getQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }))

      queryClient.setQueryData(NOTE_FOLDER_KEYS.list({ categoryId: undefined }), (old: NoteFolder[] = []) => [
        ...old,
        data,
      ])
      return { previousFolderList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([NOTE_FOLDER_KEYS.list({ categoryId: undefined })], context?.previousFolderList)
      toast.error(t('errorCreation'))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTE_FOLDER_KEYS.list({ categoryId: undefined }) })
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
    values: { name: '' },
  })

  const name = watch('name')

  const submit = handleSubmit(({ name }) => {
    mutate({ id, name })
    reset()
  })

  const ref = useOutsideClick(clearErrors)

  return { register, handleSubmit, errors, submit, ref, name }
}
