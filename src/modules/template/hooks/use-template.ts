import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import { useSetOnboarded } from '&/modules/auth/hooks'
import { CATEGORY_LIST } from '&/modules/category/constants'
import { ROUTINE_KEYS } from '&/modules/routine/constants'
import { TASK_KEYS } from '&/modules/task/constants'
import { NOTE_KEYS } from '&/modules/note/constants'
import { NOTE_FOLDER_KEYS } from '&/modules/note-folder/constants'
import { ROUTINE_NOTE_KEYS } from '&/modules/routine-note/constants'
import { TASK_NOTES_KEYS } from '&/modules/task-note/constants'

import {
  createBulkCategories,
  createBulkNoteFolders,
  createBulkNotes,
  createBulkRoutineChecklistItems,
  createBulkRoutines,
  createBulkTaskChecklistItems,
  createBulkTasks,
  createBulkRoutineLinkedNotes,
  createBulkTaskLinkedNotes,
} from '../mutations'
import {
  getTransformedCategories,
  getTransformedNoteFolders,
  getTransformedNotes,
  getTransformedRoutineChecklistItems,
  getTransformedRoutineLinkedNotes,
  getTransformedRoutines,
  getTransformedTaskChecklistItems,
  getTransformedTaskLinkedNotes,
  getTransformedTasks,
} from '../utils'
import { useGetTemplateDetails } from './use-get-template-details'

export function useTemplate() {
  const { t } = useTranslation('template')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { template, isLoading, error } = useGetTemplateDetails()
  const { onSetOnboarded } = useSetOnboarded()

  // --- MUTATIONS ---

  // Create categories mutation
  const {
    mutate: mutateCategories,
    isPending: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    isError: categoriesIsError,
  } = useMutation({
    mutationFn: createBulkCategories,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [CATEGORY_LIST] })
    },
    onError: () => {
      toast.error(t('errorCategoriesCreation'))
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORY_LIST] })
      await Promise.all([createRoutines(), createTasks(), createNoteFolders()])
    },
  })

  // Create note folders mutation
  const {
    mutate: mutateNoteFolders,
    isPending: noteFoldersIsLoading,
    isSuccess: noteFoldersIsSuccess,
    isError: noteFoldersIsError,
  } = useMutation({
    mutationFn: createBulkNoteFolders,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: NOTE_FOLDER_KEYS.lists() })
      await queryClient.cancelQueries({ queryKey: NOTE_FOLDER_KEYS.details() })
    },
    onError: () => {
      toast.error(t('errorNoteFoldersCreation'))
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: NOTE_FOLDER_KEYS.lists() })
      queryClient.invalidateQueries({ queryKey: NOTE_FOLDER_KEYS.details() })
      await createNotes()
    },
  })

  // Create notes mutation
  const {
    mutate: mutateNotes,
    isPending: notesIsLoading,
    isSuccess: notesIsSuccess,
    isError: notesIsError,
  } = useMutation({
    mutationFn: createBulkNotes,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: NOTE_KEYS.lists() })
      await queryClient.cancelQueries({ queryKey: NOTE_KEYS.details() })
    },
    onError: () => {
      toast.error(t('errorNotesCreation'))
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.lists() })
      queryClient.invalidateQueries({ queryKey: NOTE_KEYS.details() })
    },
  })

  // Create routines mutation
  const {
    mutate: mutateRoutines,
    isPending: routinesIsLoading,
    isSuccess: routinesIsSuccess,
    isError: routinesIsError,
  } = useMutation({
    mutationFn: createBulkRoutines,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.lists() })
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.details() })
    },
    onError: () => {
      toast.error(t('errorRoutinesCreation'))
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ROUTINE_KEYS.lists() })
      queryClient.invalidateQueries({ queryKey: ROUTINE_KEYS.details() })
      await createRoutineChecklists()
    },
  })

  // Create routine checklist items mutation
  const {
    mutate: mutateRoutineChecklistItems,
    isPending: routineChecklistsIsLoading,
    isSuccess: routineChecklistsIsSuccess,
    isError: routineChecklistsIsError,
  } = useMutation({
    mutationFn: createBulkRoutineChecklistItems,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.details() })
    },
    onError: () => {
      toast.error(t('errorRoutinesChecklistCreation'))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROUTINE_KEYS.details() })
    },
  })

  // Create tasks mutation
  const {
    mutate: mutateTasks,
    isPending: tasksIsLoading,
    isSuccess: tasksIsSuccess,
    isError: tasksIsError,
  } = useMutation({
    mutationFn: createBulkTasks,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.lists() })
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.details() })
    },
    onError: () => {
      toast.error(t('errorTasksCreation'))
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.lists() })
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.details() })
      await createTaskChecklists()
    },
  })

  // create task checklist items mutation
  const {
    mutate: mutateTaskChecklistItems,
    isPending: taskChecklistsIsLoading,
    isSuccess: taskChecklistsIsSuccess,
    isError: taskChecklistsIsError,
  } = useMutation({
    mutationFn: createBulkTaskChecklistItems,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.details() })
    },
    onError: () => {
      toast.error(t('errorTasksChecklistCreation'))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_KEYS.details() })
    },
  })

  // create routine linked notes mutation
  const {
    mutate: mutateRoutineLinkedNotes,
    isPending: routineLinkedNotesIsLoading,
    isSuccess: routineLinkedNotesIsSuccess,
    isError: routineLinkedNotesIsError,
  } = useMutation({
    mutationFn: createBulkRoutineLinkedNotes,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ROUTINE_NOTE_KEYS.all })
    },
    onError: () => {
      toast.error(t('errorRoutineLinkedNotesCreation'))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROUTINE_NOTE_KEYS.all })
    },
  })

  // create task linked notes mutation
  const {
    mutate: mutateTaskLinkedNotes,
    isPending: taskLinkedNotesIsLoading,
    isSuccess: taskLinkedNotesIsSuccess,
    isError: taskLinkedNotesIsError,
  } = useMutation({
    mutationFn: createBulkTaskLinkedNotes,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: TASK_NOTES_KEYS.lists() })
    },
    onError: () => {
      toast.error(t('errorTaskLinkedNotesCreation'))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_NOTES_KEYS.lists() })
    },
  })

  // --- CREATE FUNCTIONS ---

  // Create categories and when done routines, tasks and noteFolders
  const createItems = async () => {
    if (template?.categories?.length) {
      const categories = await getTransformedCategories(template?.categories)
      mutateCategories(categories)
    } else {
      await Promise.all([createRoutines(), createTasks(), createNoteFolders()])
    }
  }

  // Create note folders and when done notes
  const createNoteFolders = async () => {
    if (template?.noteFolders?.length) {
      const noteFolders = await getTransformedNoteFolders(template?.noteFolders)
      mutateNoteFolders(noteFolders)
    } else {
      await createNotes()
    }
  }

  // Create routines function
  const createRoutines = async () => {
    if (template?.routines?.length) {
      const routines = await getTransformedRoutines(template?.routines)
      mutateRoutines(routines)
    }
  }

  // Create tasks function
  const createTasks = async () => {
    if (template?.tasks?.length) {
      const tasks = await getTransformedTasks(template?.tasks)
      mutateTasks(tasks)
    }
  }

  // Create notes function
  const createNotes = async () => {
    if (template?.notes?.length) {
      const notes = await getTransformedNotes(template?.notes)
      mutateNotes(notes)
    }
  }

  // Create routine checklist items function
  const createRoutineChecklists = async () => {
    if (template?.templateRoutineChecklistItems?.length) {
      const routineChecklistItems = await getTransformedRoutineChecklistItems(template?.templateRoutineChecklistItems)
      mutateRoutineChecklistItems(routineChecklistItems)
    }
  }

  // Create task checklist items function
  const createTaskChecklists = async () => {
    if (template?.templateTaskChecklistItems?.length) {
      const taskChecklistItems = await getTransformedTaskChecklistItems(template?.templateTaskChecklistItems)
      mutateTaskChecklistItems(taskChecklistItems)
    }
  }

  // Create routine linked note function
  const createRoutineLinkedNote = useCallback(async () => {
    if (template?.templateRoutineLinkedNotes?.length) {
      const routineLinkedNotes = await getTransformedRoutineLinkedNotes(template?.templateRoutineLinkedNotes)
      mutateRoutineLinkedNotes(routineLinkedNotes)
    }
  }, [mutateRoutineLinkedNotes, template?.templateRoutineLinkedNotes])

  // Create task linked note function
  const createTaskLinkedNote = useCallback(async () => {
    if (template?.templateTaskLinkedNotes?.length) {
      const taskLinkedNotes = await getTransformedTaskLinkedNotes(template?.templateTaskLinkedNotes)
      mutateTaskLinkedNotes(taskLinkedNotes)
    }
  }, [mutateTaskLinkedNotes, template?.templateTaskLinkedNotes])

  // Create template items
  const onUseTemplate = async () => {
    if (!template) throw new Error('Template is undefined')
    navigate('creating')
    await createItems()
    await onSetOnboarded()
  }

  useEffect(() => {
    if (routinesIsSuccess && notesIsSuccess) {
      createRoutineLinkedNote()
    }
  }, [routinesIsSuccess, notesIsSuccess, createRoutineLinkedNote])

  useEffect(() => {
    if (tasksIsSuccess && notesIsSuccess) {
      createTaskLinkedNote()
    }
  }, [tasksIsSuccess, notesIsSuccess, createTaskLinkedNote])

  const status = {
    categories: {
      isLoading: categoriesIsLoading,
      isDone: categoriesIsSuccess,
      isError: categoriesIsError,
    },
    routines: {
      isLoading: routinesIsLoading,
      isDone: routinesIsSuccess,
      isError: routinesIsError,
    },
    tasks: { isLoading: tasksIsLoading, isDone: tasksIsSuccess, isError: tasksIsError },
    routineChecklists: {
      isLoading: routineChecklistsIsLoading,
      isDone: routineChecklistsIsSuccess,
      isError: routineChecklistsIsError,
    },
    taskChecklists: {
      isLoading: taskChecklistsIsLoading,
      isDone: taskChecklistsIsSuccess,
      isError: taskChecklistsIsError,
    },
    noteFolders: {
      isLoading: noteFoldersIsLoading,
      isDone: noteFoldersIsSuccess,
      isError: noteFoldersIsError,
    },
    notes: { isLoading: notesIsLoading, isDone: notesIsSuccess, isError: notesIsError },
    routineNotes: {
      isLoading: routineLinkedNotesIsLoading,
      isDone: routineLinkedNotesIsSuccess,
      isError: routineLinkedNotesIsError,
    },
    taskNotes: {
      isLoading: taskLinkedNotesIsLoading,
      isDone: taskLinkedNotesIsSuccess,
      isError: taskLinkedNotesIsError,
    },
  }

  return {
    template,
    isLoading,
    error,
    onUseTemplate,
    status,
  }
}
