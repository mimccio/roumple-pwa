import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { v5 as uuidv5 } from 'uuid'

import type { ScheduleType } from '&/common/types'
import type { Routine, RoutineAction, UpdateCheckedListParams, UpdateStatusParams } from '../types'
import { ACTION_KEYS, ROUTINE_KEYS } from '../constants'
import { upsertRoutineAction } from '../mutations'
import { DATE_FORMAT, STATUSES } from '&/common/constants'
import { format } from 'date-fns'

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
      await queryClient.cancelQueries({ queryKey: ACTION_KEYS.detail({ routineId: data.routine.id, date }) })
      await queryClient.cancelQueries({ queryKey: ACTION_KEYS.list(data.routine.id) })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.lists(), exact: false })
      await queryClient.cancelQueries(boardKey)

      const newAction = {
        id: data.actionId || uuidv5(format(date, DATE_FORMAT), data.routine.id),
        date,
        status: data.status,
        doneOccurrence: data.doneOccurrence,
        checkedList: data.checkedList,
      }

      // ⛳ Update Item
      queryClient.setQueryData(ACTION_KEYS.detail({ routineId: data.routine.id, date }), newAction)

      // Update Action list
      const previousActionList = queryClient.getQueryData(ACTION_KEYS.list(data.routine.id))
      queryClient.setQueryData<RoutineAction[]>(ACTION_KEYS.list(data.routine.id), (old) => {
        if (!old) return [newAction]
        const index = old.findIndex((item) => item.id === newAction.id)
        if (index >= 0) return [...old.slice(0, index), newAction, ...old.slice(index + 1)]
        return [...old, newAction]
      })

      // 🏫 Update Routine Board
      const previousList = queryClient.getQueryData(boardKey)
      queryClient.setQueryData<Routine[]>(boardKey, (old) => {
        if (!old) return
        const index = old.findIndex((item) => item.id === data.routine.id)
        if (index >= 0)
          return [...old.slice(0, index), { ...data.routine, actions: [newAction] }, ...old.slice(index + 1)]
        return old
      })

      return { previousList, previousActionList }
    },
    onError: (_err, item, context) => {
      queryClient.setQueryData(ROUTINE_KEYS.detail(item.routine.id), item.routine)
      queryClient.setQueryData(boardKey, context?.previousList)
      queryClient.setQueryData(ACTION_KEYS.list(item.routine.id), context?.previousActionList)

      toast.error('Error on check routine')
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ROUTINE_KEYS.detail(variables.routine.id) })
      queryClient.invalidateQueries({ queryKey: boardKey })
      queryClient.invalidateQueries({ queryKey: ACTION_KEYS.list(variables.routine.id) })
    },
  })

  const handleUpdateStatus = ({ routine, status, action }: UpdateStatusParams) => {
    const prevStatus = action?.status
    const prevDoneOccurrence = action?.doneOccurrence || 0
    const prevCheckedList = action?.checkedList
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
    mutate({ routine, status: newStatus, date, checkedList, doneOccurrence: newDoneOccurrence, actionId: action?.id })
  }

  const handleSelectChecklistItem = ({ routine, action, checklistItemId }: UpdateCheckedListParams) => {
    const checkedList = action?.checkedList || []
    const prevDoneOccurrence = action?.doneOccurrence || 0
    const index = checkedList.findIndex((id) => id === checklistItemId)

    let newList: string[] = []
    if (index >= 0) {
      newList = [...checkedList.slice(0, index), ...checkedList.slice(index + 1)]
    } else {
      newList = [...checkedList, checklistItemId]
    }

    let status = action?.status || STATUSES.todo

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
      date,
      status: newStatus,
      checkedList: newList,
      doneOccurrence: newDoneOccurrence,
    })
  }

  const handleDeleteCheckedItem = ({ routine, action, checklistItemId }: UpdateCheckedListParams) => {
    const checkedList = action?.checkedList || []
    const index = checkedList.findIndex((id) => id === checklistItemId)
    let newList: string[] = []
    if (index >= 0) {
      newList = [...checkedList.slice(0, index), ...checkedList.slice(index + 1)]
    }
    mutate({
      routine,
      actionId: action?.id,
      date,
      status: action?.status || STATUSES.todo,
      checkedList: newList,
      doneOccurrence: action?.doneOccurrence || 0,
    })
  }

  return { handleUpdateStatus, handleSelectChecklistItem, handleDeleteCheckedItem }
}
