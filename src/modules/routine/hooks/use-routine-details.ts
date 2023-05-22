import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import type { Routine, RoutineDetails } from '../types'
import { BOARD, LIST, ROUTINE } from '../constants'
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

      const previousRoutineList = queryClient.getQueryData([ROUTINE, LIST, { archived: data.archived }])

      queryClient.setQueryData([ROUTINE, LIST, { archived: data.archived }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), { ...old[routineIndex], ...data }, ...old.slice(routineIndex + 1)].sort(
          sortRoutines
        )
      })

      const previousBoardRoutineList = queryClient.getQueryData([ROUTINE, BOARD, { type: data.type, date }])
      queryClient.setQueryData([ROUTINE, BOARD, { type: data.type, date }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), { ...old[routineIndex], ...data }, ...old.slice(routineIndex + 1)].sort(
          sortRoutines
        )
      })

      return { previousRoutineList, previousBoardRoutineList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, item.id], item)
      queryClient.setQueryData([ROUTINE, LIST, { archived: item.archived }], context?.previousRoutineList)
      queryClient.setQueryData([ROUTINE, BOARD, { type: item.type, date }], context?.previousBoardRoutineList)
      toast.error("Modification didn't work")
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([ROUTINE, variables.id])
      queryClient.invalidateQueries([ROUTINE, LIST, { archived: variables.id }])
      queryClient.invalidateQueries([ROUTINE, BOARD, { type: variables.type, date }])
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
