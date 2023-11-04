import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import type { Routine } from '&/modules/routine/types'
import type { Task } from '&/modules/task/types'
import type { Note } from '&/modules/note/types'
import { ROUTINE_KEYS } from '&/modules/routine/constants'
import { TASK_KEYS } from '&/modules/task/constants'
import { NOTE_KEYS } from '&/modules/note/constants'
import type { Category } from '../types'
import { CATEGORY_LIST } from '../constants'
import { deleteCategory } from '../mutations'

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  const { t } = useTranslation('error')

  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onMutate: async (data) => {
      // ✖️ Cancel related queries
      await queryClient.cancelQueries({ queryKey: [CATEGORY_LIST] })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.lists(), exact: false })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.boards(), exact: false })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.details(), exact: false })

      await queryClient.cancelQueries({ queryKey: TASK_KEYS.lists(), exact: false })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.boards(), exact: false })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.details(), exact: false })

      await queryClient.cancelQueries({ queryKey: NOTE_KEYS.lists(), exact: false })
      await queryClient.cancelQueries({ queryKey: NOTE_KEYS.searches(), exact: false })
      await queryClient.cancelQueries({ queryKey: NOTE_KEYS.details(), exact: false })

      // Update Category List
      const previousCategoryList = queryClient.getQueryData([CATEGORY_LIST])
      queryClient.setQueryData([CATEGORY_LIST], (old: Category[] = []) => {
        const categoryIndex = old.findIndex((item) => item.id === data.id)
        return [...old.slice(0, categoryIndex), ...old.slice(categoryIndex + 1)]
      })

      // Update Routines
      queryClient.setQueriesData({ queryKey: ROUTINE_KEYS.lists() }, (old: Routine[] = []) => {
        return old.map((routine) =>
          routine.category?.id === data.id ? { ...routine, category: null, deletedCategory: data } : routine
        )
      })
      queryClient.setQueriesData({ queryKey: ROUTINE_KEYS.boards() }, (old: Routine[] = []) => {
        return old.map((routine) =>
          routine.category?.id === data.id ? { ...routine, category: null, deletedCategory: data } : routine
        )
      })
      queryClient.setQueriesData({ queryKey: ROUTINE_KEYS.details() }, (old?: Routine) =>
        old?.category?.id === data.id ? { ...old, category: null, deletedCategory: data } : old
      )

      // Update Tasks
      queryClient.setQueriesData({ queryKey: TASK_KEYS.lists() }, (old: Task[] = []) => {
        return old.map((task) =>
          task.category?.id === data.id ? { ...task, category: null, deletedCategory: data } : task
        )
      })
      queryClient.setQueriesData({ queryKey: TASK_KEYS.boards() }, (old: Task[] = []) => {
        return old.map((task) =>
          task.category?.id === data.id ? { ...task, category: null, deletedCategory: data } : task
        )
      })
      queryClient.setQueriesData({ queryKey: TASK_KEYS.details() }, (old?: Task) =>
        old?.category?.id === data.id ? { ...old, category: null, deletedCategory: data } : old
      )

      // Update Notes
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.lists() }, (old: Note[] = []) => {
        return old.map((note) =>
          note.category?.id === data.id ? { ...note, category: null, deletedCategory: data } : note
        )
      })
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.searches() }, (old: Note[] = []) => {
        return old.map((note) =>
          note.category?.id === data.id ? { ...note, category: null, deletedCategory: data } : note
        )
      })
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.details() }, (old?: Note) =>
        old?.category?.id === data.id ? { ...old, category: null, deletedCategory: data } : old
      )

      return { previousCategoryList }
    },

    onError: (_err, item, context) => {
      queryClient.setQueryData([CATEGORY_LIST], context?.previousCategoryList)
      // Update Routines
      queryClient.setQueriesData({ queryKey: ROUTINE_KEYS.lists() }, (old: Routine[] = []) => {
        return old.map((routine) =>
          routine.deletedCategory?.id === item.id ? { ...routine, category: item, deletedCategory: undefined } : routine
        )
      })
      queryClient.setQueriesData({ queryKey: ROUTINE_KEYS.boards() }, (old: Routine[] = []) => {
        return old.map((routine) =>
          routine.deletedCategory?.id === item.id ? { ...routine, category: item, deletedCategory: undefined } : routine
        )
      })
      queryClient.setQueriesData({ queryKey: ROUTINE_KEYS.details() }, (old?: Routine) =>
        old?.deletedCategory?.id === item.id ? { ...old, category: item, deletedCategory: undefined } : old
      )

      // Update Tasks
      queryClient.setQueriesData({ queryKey: TASK_KEYS.lists() }, (old: Task[] = []) => {
        return old.map((task) =>
          task.deletedCategory?.id === item.id ? { ...task, category: item, deletedCategory: undefined } : task
        )
      })
      queryClient.setQueriesData({ queryKey: TASK_KEYS.boards() }, (old: Task[] = []) => {
        return old.map((task) =>
          task.deletedCategory?.id === item.id ? { ...task, category: item, deletedCategory: undefined } : task
        )
      })
      queryClient.setQueriesData({ queryKey: TASK_KEYS.details() }, (old?: Task) =>
        old?.deletedCategory?.id === item.id ? { ...old, category: item, deletedCategory: undefined } : old
      )

      // Update Notes
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.lists() }, (old: Note[] = []) => {
        return old.map((note) =>
          note.deletedCategory?.id === item.id ? { ...note, category: item, deletedCategory: undefined } : note
        )
      })
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.searches() }, (old: Note[] = []) => {
        return old.map((note) =>
          note.deletedCategory?.id === item.id ? { ...note, category: item, deletedCategory: undefined } : note
        )
      })
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.details() }, (old?: Note) =>
        old?.deletedCategory?.id === item.id ? { ...old, category: item, deletedCategory: undefined } : old
      )

      toast.error(t('errorDelete'))
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORY_LIST] })
      queryClient.invalidateQueries({ queryKey: ROUTINE_KEYS.lists() })
      queryClient.invalidateQueries({ queryKey: ROUTINE_KEYS.boards() })
      queryClient.invalidateQueries({ queryKey: ROUTINE_KEYS.details() })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.lists() })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.boards() })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.details() })
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.lists() })
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.searches() })
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.details() })
    },
  })

  const onDelete = (category: Category) => mutate(category)
  return { onDelete }
}
