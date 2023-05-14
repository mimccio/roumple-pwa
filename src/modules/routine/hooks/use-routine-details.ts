import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { fetchRoutineById } from '../queries/fetch-routine-by-id'
import { Routine } from '../types'
import { editRoutine } from '../mutations'

export function useRoutineDetails() {
  const { routineId } = useParams()
  const queryClient = useQueryClient()
  const options = { exact: false }

  const { data, isLoading } = useQuery(['ROUTINE', routineId], fetchRoutineById, {
    enabled: Boolean(routineId),
    initialDataUpdatedAt: () => queryClient.getQueryState(['ROUTINE'], options)?.dataUpdatedAt,
    initialData: () => {
      const cachedRoutinesData = queryClient.getQueryData<Routine[]>(['ROUTINE'], options)
      const routine = cachedRoutinesData?.find((item) => item.id === routineId)
      return routine
    },
  })

  const { mutate } = useMutation(editRoutine, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['ROUTINE'], exact: false })

      queryClient.setQueryData(['ROUTINE', data.id], data)

      const previousRoutineList = queryClient.getQueryData(['ROUTINE'])

      queryClient.setQueryData(['ROUTINE'], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), data, ...old.slice(routineIndex + 1)]
      })

      return { previousRoutineList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData(['ROUTINE', item.id], item)
      queryClient.setQueryData(['ROUTINE'], context?.previousRoutineList)
      toast.error("Modification didn't work")
    },
    onSettled: () => {
      queryClient.invalidateQueries(['ROUTINE'])
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Routine>({
    values: data,
    mode: 'onBlur',
  })

  const onBlur = handleSubmit((formData) => {
    try {
      mutate({ ...data, ...formData })
    } catch (error) {
      console.error(error.message)
    }
  })

  return { routine: data, isLoading, register, errors, onBlur }
}
