import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'

import type { TwColor } from '@/common/types'

import type { Routine } from '@/modules/routine/types'
import { ROUTINE_KEYS } from '@/modules/routine/constants'
import type { Task } from '@/modules/task/types'
import { TASK_KEYS } from '@/modules/task/constants'
import type { Note } from '@/modules/note/types'
import { NOTE_KEYS } from '@/modules/note/constants'

import type { Category } from '../types'
import { CATEGORY_LIST } from '../constants'
import { editCategory } from '../mutations'

interface Params {
  category: Category
}

export function useEditCategory({ category }: Params) {
  const { t } = useTranslation('error')
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: editCategory,
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
        return [...old.slice(0, categoryIndex), data, ...old.slice(categoryIndex + 1)]
      })

      // Update Routines
      queryClient.setQueriesData({ queryKey: ROUTINE_KEYS.lists() }, (old: Routine[] = []) => {
        return old.map((routine) => (routine.category?.id === data.id ? { ...routine, category: data } : routine))
      })
      queryClient.setQueriesData({ queryKey: ROUTINE_KEYS.boards() }, (old: Routine[] = []) => {
        return old.map((routine) => (routine.category?.id === data.id ? { ...routine, category: data } : routine))
      })
      queryClient.setQueriesData({ queryKey: ROUTINE_KEYS.details() }, (old?: Routine) =>
        old?.category?.id === data.id ? { ...old, category: data } : old
      )

      // Update Tasks
      queryClient.setQueriesData({ queryKey: TASK_KEYS.lists() }, (old: Task[] = []) => {
        return old.map((task) => (task.category?.id === data.id ? { ...task, category: data } : task))
      })
      queryClient.setQueriesData({ queryKey: TASK_KEYS.boards() }, (old: Task[] = []) => {
        return old.map((task) => (task.category?.id === data.id ? { ...task, category: data } : task))
      })
      queryClient.setQueriesData({ queryKey: TASK_KEYS.details() }, (old?: Task) =>
        old?.category?.id === data.id ? { ...old, category: data } : old
      )

      // Update Notes
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.lists() }, (old: Note[] = []) => {
        return old.map((note) => (note.category?.id === data.id ? { ...note, category: data } : note))
      })
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.searches() }, (old: Note[] = []) => {
        return old.map((note) => (note.category?.id === data.id ? { ...note, category: data } : note))
      })
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.details() }, (old?: Note) =>
        old?.category?.id === data.id ? { ...old, category: data } : old
      )

      return { previousCategoryList, category }
    },

    onError: (_err, item, context) => {
      // Update Category List
      queryClient.setQueryData([CATEGORY_LIST], context?.previousCategoryList)

      if (!context?.category) {
        console.error('context.category is undefined')
        return
      }

      // Update Routines
      queryClient.setQueriesData({ queryKey: ROUTINE_KEYS.lists() }, (old: Routine[] = []) => {
        return old.map((routine) =>
          routine.category?.id === item.id ? { ...routine, category: context.category } : routine
        )
      })
      queryClient.setQueriesData({ queryKey: ROUTINE_KEYS.boards() }, (old: Routine[] = []) => {
        return old.map((routine) =>
          routine.category?.id === item.id ? { ...routine, category: context.category } : routine
        )
      })
      queryClient.setQueriesData({ queryKey: ROUTINE_KEYS.details() }, (old?: Routine) =>
        old?.category?.id === item.id ? { ...old, category: context.category } : old
      )

      // Update Tasks
      queryClient.setQueriesData({ queryKey: TASK_KEYS.lists() }, (old: Task[] = []) => {
        return old.map((task) => (task.category?.id === item.id ? { ...task, category: context.category } : task))
      })
      queryClient.setQueriesData({ queryKey: TASK_KEYS.boards() }, (old: Task[] = []) => {
        return old.map((task) => (task.category?.id === item.id ? { ...task, category: context.category } : task))
      })
      queryClient.setQueriesData({ queryKey: TASK_KEYS.details() }, (old?: Task) =>
        old?.category?.id === item.id ? { ...old, category: context.category } : old
      )

      // Update Notes
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.lists() }, (old: Note[] = []) => {
        return old.map((note) => (note.category?.id === item.id ? { ...note, category: context.category } : note))
      })
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.searches() }, (old: Note[] = []) => {
        return old.map((note) => (note.category?.id === item.id ? { ...note, category: context.category } : note))
      })
      queryClient.setQueriesData({ queryKey: NOTE_KEYS.details() }, (old?: Note) =>
        old?.category?.id === item.id ? { ...old, category: context.category } : old
      )

      toast.error(t('errorModification'))
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    values: category,
    mode: 'onBlur',
  })

  const submit = handleSubmit((formData) => mutate({ ...category, ...formData }))
  const handleColorChange = (color: TwColor) => mutate({ ...category, color })

  return { handleColorChange, errors, register, submit }
}
