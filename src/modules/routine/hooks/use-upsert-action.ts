import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { ScheduleType } from '&/common/types'
import type { Routine, UpdateCheckedListParams, UpdateStatusParams } from '../types'
import { BOARD, ROUTINE } from '../constants'
import { upsertRoutineAction } from '../mutations'
import { STATUSES } from '&/common/constants'

interface Params {
  type: ScheduleType
  date: number
}

export function useUpsertAction({ type, date }: Params) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(upsertRoutineAction, {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [ROUTINE], exact: false })

      const previousList = queryClient.getQueryData([ROUTINE, BOARD, { date, type }])

      const newRoutine = {
        ...data.routine,
        actions: [{ ...data.routine.actions?.[0], status: data.status, checked_list: data.checkedList }],
      }

      queryClient.setQueryData<Routine>([ROUTINE, data.routine.id], () => newRoutine)

      queryClient.setQueryData<Routine[]>([ROUTINE, BOARD, { date, type }], (old) => {
        if (!old) return
        const index = old.findIndex((item) => item.id === data.routine.id)
        if (index >= 0) return [...old.slice(0, index), newRoutine, ...old.slice(index + 1)]
        return old
      })

      return { previousList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData([ROUTINE, item.routine.id], item.routine)
      queryClient.setQueryData([ROUTINE, BOARD, { date, type }], context?.previousList)
      toast.error('Error on check routine')
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [ROUTINE, variables.routine.id] })
      queryClient.invalidateQueries({ queryKey: [ROUTINE, BOARD, { date, type }] })
    },
  })

  const handleUpdateStatus = ({ routine, actionId, status }: UpdateStatusParams) => {
    const prevStatus = routine.actions?.[0]?.status
    const prevCheckedList = routine.actions?.[0]?.checked_list

    if (prevStatus === status && (prevStatus !== STATUSES.todo || !prevCheckedList?.length)) return

    const checkedList = status === STATUSES.todo ? [] : prevCheckedList
    mutate({ routine, actionId, status, type, date, checkedList })
  }

  const handleSelectChecklistItem = ({ routine, checklistItemId }: UpdateCheckedListParams) => {
    const action = routine.actions?.[0]
    const checkedList = action?.checked_list || []

    const index = checkedList.findIndex((id) => id === checklistItemId)

    let newList: string[] = []
    if (index >= 0) {
      newList = [...checkedList.slice(0, index), ...checkedList.slice(index + 1)]
    } else {
      newList = [...checkedList, checklistItemId]
    }

    let status = action?.status

    if (newList.length === routine.checklist?.length) {
      status = STATUSES.done
    } else if (newList.length && action?.status !== STATUSES.done && index === -1) {
      status = STATUSES.inProgress
    }

    mutate({ routine, actionId: action?.id, type, date, status, checkedList: newList })
  }

  const handleDeleteCheckedItem = ({ routine, checklistItemId }: UpdateCheckedListParams) => {
    const action = routine.actions?.[0]
    const checkedList = action?.checked_list || []
    const index = checkedList.findIndex((id) => id === checklistItemId)
    let newList: string[] = []
    if (index >= 0) {
      newList = [...checkedList.slice(0, index), ...checkedList.slice(index + 1)]
    }
    mutate({ routine, actionId: action?.id, type, date, status: action?.status, checkedList: newList })
  }

  return { handleUpdateStatus, handleSelectChecklistItem, handleDeleteCheckedItem }
}
