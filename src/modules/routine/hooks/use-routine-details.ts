import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import type { Routine, RoutineDetails } from '../types'
import { ROUTINE } from '../constants'
import { sortRoutines } from '../utils'
import { editRoutineDetails } from '../mutations'
import { getTodayDate } from '&/common/utils'

export function useRoutineDetails(routine: Routine) {
  const queryClient = useQueryClient()
  const date = getTodayDate()

  const { mutate } = useMutation(editRoutineDetails, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })

      queryClient.setQueryData([ROUTINE, data.id], data)

      const previousRoutineList = queryClient.getQueryData([ROUTINE, { archived: data.archived }])

      queryClient.setQueryData([ROUTINE, { archived: data.archived }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), { ...old[routineIndex], ...data }, ...old.slice(routineIndex + 1)].sort(
          sortRoutines
        )
      })

      const previousBoardRoutineList = queryClient.getQueryData([ROUTINE, { type: data.type, date }])
      queryClient.setQueryData([ROUTINE, { type: data.type, date }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), { ...old[routineIndex], ...data }, ...old.slice(routineIndex + 1)].sort(
          sortRoutines
        )
      })

      return { previousRoutineList, previousBoardRoutineList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, item.id], item)
      queryClient.setQueryData([ROUTINE, { archived: item.archived }], context?.previousRoutineList)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([ROUTINE, variables.id])
      queryClient.invalidateQueries([ROUTINE, { archived: variables.id }])
      queryClient.invalidateQueries([ROUTINE, { type: variables.type, date }])
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoutineDetails>({
    values: routine,
    mode: 'onBlur',
  })

  const submit = handleSubmit((formData) => mutate({ ...routine, ...formData }))

  return { register, errors, submit }
}
