import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { Routine } from '../types'
import { ROUTINE } from '../constants'
import { deleteRoutine } from '../mutations'
import { getTodayDate } from '&/common/utils'

export function useDeleteRoutine() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const date = getTodayDate()

  const { mutate } = useMutation(deleteRoutine, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })
      const previousRoutineList = queryClient.getQueryData([ROUTINE, { archived: data.archived }])

      queryClient.setQueryData([ROUTINE, { archived: data.archived }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
      })

      const previousBoardRoutines = queryClient.getQueryData([ROUTINE, { date, type: data.type }])

      queryClient.setQueryData([ROUTINE, { date, type: data.type }], (old: Routine[] = []) => {
        const routineIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, routineIndex), ...old.slice(routineIndex + 1)]
      })

      navigate('/routines')
      return { previousRoutineList, previousBoardRoutines }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, { archived: item.archived }], context?.previousRoutineList)
      navigate(`/routines/d/routine/${item.id}`)
      toast.error("Deletion didn't work")
      queryClient.setQueryData([ROUTINE, { date, type: item.type }], context?.previousBoardRoutines)
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([ROUTINE, { archived: variables.archived }])
      queryClient.invalidateQueries([ROUTINE, { date, type: variables.type }])
    },
  })

  const onDeleteRoutine = (routine: Routine) => mutate(routine)
  return { onDeleteRoutine }
}
