import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import type { ScheduleType } from '&/common/types'
import type { Routine, UpdateCheckedListParams, UpdateStatusParams } from '../types'
import { ROUTINE_KEYS } from '../constants'
import { upsertRoutineAction } from '../mutations'
import { STATUSES } from '&/common/constants'

interface Params {
  type: ScheduleType
  date: Date
}

export function useUpsertAction({ type, date }: Params) {
  const queryClient = useQueryClient()

  const boardKey = ROUTINE_KEYS.board({ type, date })

  const { mutate } = useMutation(upsertRoutineAction, {
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.detail(data.routine.id) })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.lists(), exact: false })

      const newRoutine = {
        ...data.routine,
        actions: [
          {
            ...data.routine.actions?.[0],
            status: data.status,
            checked_list: data.checkedList,
            doneOccurrence: data.doneOccurrence,
          },
        ],
      }

      // ⛳ Update Item
      queryClient.setQueryData(ROUTINE_KEYS.detail(data.routine.id), newRoutine)

      // 🏫 Update Routine Board
      const previousList = queryClient.getQueryData(boardKey)
      queryClient.setQueryData<Routine[]>(boardKey, (old) => {
        if (!old) return
        const index = old.findIndex((item) => item.id === data.routine.id)
        if (index >= 0) return [...old.slice(0, index), newRoutine, ...old.slice(index + 1)]
        return old
      })

      return { previousList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(ROUTINE_KEYS.detail(item.routine.id), item.routine)
      queryClient.setQueryData(boardKey, context?.previousList)
      toast.error('Error on check routine')
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ROUTINE_KEYS.detail(variables.routine.id) })
      queryClient.invalidateQueries({ queryKey: boardKey })
    },
  })

  const handleUpdateStatus = ({ routine, actionId, status }: UpdateStatusParams) => {
    const prevStatus = routine.actions?.[0]?.status
    const prevDoneOccurrence = routine.actions?.[0]?.doneOccurrence
    const prevCheckedList = routine.actions?.[0]?.checked_list
    let newStatus = status
    let newDoneOccurrence = prevDoneOccurrence

    if (status === STATUSES.todo && prevDoneOccurrence > 0) {
      newDoneOccurrence = prevDoneOccurrence - 1
    }

    if (status === STATUSES.done && routine.occurrence > prevDoneOccurrence) {
      newDoneOccurrence = prevDoneOccurrence + 1
      newDoneOccurrence === routine.occurrence ? STATUSES.done : (newStatus = STATUSES.todo)
    }

    if (prevStatus === status && (prevStatus !== STATUSES.todo || !prevCheckedList?.length) && prevDoneOccurrence < 1)
      return

    const checkedList = newStatus === STATUSES.todo ? [] : prevCheckedList
    mutate({ routine, actionId, status: newStatus, type, date, checkedList, doneOccurrence: newDoneOccurrence })
  }

  const handleSelectChecklistItem = ({ routine, checklistItemId }: UpdateCheckedListParams) => {
    const action = routine.actions?.[0]
    const checkedList = action?.checked_list || []
    const prevDoneOccurrence = routine.actions?.[0]?.doneOccurrence
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

    let newStatus = status
    let newDoneOccurrence = prevDoneOccurrence

    if (status === STATUSES.todo && prevDoneOccurrence > 0) {
      newDoneOccurrence = prevDoneOccurrence - 1
    }

    const reset = () => {
      newStatus = STATUSES.todo
      newList = []
    }

    if (status === STATUSES.done && routine.occurrence > prevDoneOccurrence) {
      newDoneOccurrence = prevDoneOccurrence + 1
      newDoneOccurrence === routine.occurrence ? STATUSES.done : reset()
    }

    mutate({
      routine,
      actionId: action?.id,
      type,
      date,
      status: newStatus,
      checkedList: newList,
      doneOccurrence: newDoneOccurrence,
    })
  }

  const handleDeleteCheckedItem = ({ routine, checklistItemId }: UpdateCheckedListParams) => {
    const action = routine.actions?.[0]
    const checkedList = action?.checked_list || []
    const index = checkedList.findIndex((id) => id === checklistItemId)
    let newList: string[] = []
    if (index >= 0) {
      newList = [...checkedList.slice(0, index), ...checkedList.slice(index + 1)]
    }
    mutate({
      routine,
      actionId: action?.id,
      type,
      date,
      status: action?.status,
      checkedList: newList,
      doneOccurrence: action.doneOccurrence,
    })
  }

  return { handleUpdateStatus, handleSelectChecklistItem, handleDeleteCheckedItem }
}
