import { useRef } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import { useOutsideClick } from '&/common/hooks'
import { LIST, NOTE_FOLDER } from '../constants'
import { createNoteFolder } from '../mutations'
import { NoteFolder } from '../types'

export function useCreateNoteFolder() {
  const queryClient = useQueryClient()
  const id = uuidv4()
  const ref = useRef<HTMLFormElement>(null)

  const { mutate } = useMutation(createNoteFolder, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [NOTE_FOLDER], exact: false })
      const previousCategoryList = queryClient.getQueryData([NOTE_FOLDER, LIST])
      queryClient.setQueryData([NOTE_FOLDER, LIST], (old: NoteFolder[] = []) => [...old, data])
      return { previousCategoryList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData([NOTE_FOLDER, LIST], context?.previousCategoryList)
      toast.error("Creation didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries([NOTE_FOLDER, LIST])
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

  useOutsideClick({ handler: clearErrors, ref })

  return { register, handleSubmit, errors, submit, ref, name }
}
