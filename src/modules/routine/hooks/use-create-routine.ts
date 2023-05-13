import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { createRoutine } from '../mutations'
import { Routine } from '../types'

export function useCreateRoutine() {
  const queryClient = useQueryClient()
  const id = uuidv4()
  const navigate = useNavigate()

  const name = 'New Routine'
  const { mutate } = useMutation(createRoutine, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['ROUTINE'] })

      const previousRoutineList = queryClient.getQueryData(['ROUTINE'])

      queryClient.setQueryData(['ROUTINE'], (old: Routine[] = []) => [...old, data])
      navigate(`d/routine/${id}`)
      return { previousRoutineList }
    },

    onError: (_err, _item, context) => {
      queryClient.setQueryData(['ROUTINE'], context?.previousRoutineList)
      toast.error("Creation didn't work")
    },
    onSettled: () => {
      queryClient.invalidateQueries(['ROUTINE'])
    },
  })
  const onCreateRoutine = () => mutate({ id, name })
  return { onCreateRoutine }
}
