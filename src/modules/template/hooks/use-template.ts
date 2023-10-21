import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { useSetOnboarded } from '&/modules/auth/hooks'
import { CATEGORY_LIST } from '&/modules/category/constants'
import { ROUTINE_KEYS } from '&/modules/routine/constants'
import { TASK_KEYS } from '&/modules/task/constants'
import { NOTE_KEYS } from '&/modules/note/constants'
import { NOTE_FOLDER_KEYS } from '&/modules/note-folder/constants'

import {
  createBulkCategories,
  createBulkNoteFolders,
  createBulkNotes,
  createBulkRoutineChecklistItems,
  createBulkRoutines,
  createBulkTaskChecklistItems,
  createBulkTasks,
} from '../mutations'
import {
  getTransformedCategories,
  getTransformedNoteFolders,
  getTransformedNotes,
  getTransformedRoutineChecklistItems,
  getTransformedRoutines,
  getTransformedTaskChecklistItems,
  getTransformedTasks,
} from '../utils'
import { useGetTemplateDetails } from './use-get-template-details'

export function useTemplate() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { template, isLoading, error } = useGetTemplateDetails()
  const { onSetOnboarded } = useSetOnboarded()

  // --- MUTATIONS ---

  // Create categories mutation
  const {
    mutate: mutateCategories,
    isLoading: categoriesIsLoading,
    isSuccess: categoriesIsSuccess,
    isError: categoriesIsError,
  } = useMutation(createBulkCategories, {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [CATEGORY_LIST] })
    },
    onError: () => {
      toast.error("Categories creation didn't work")
    },
    onSuccess: async () => {
      queryClient.invalidateQueries([CATEGORY_LIST])
      await Promise.all([createRoutines(), createTasks(), createNoteFolders()])
    },
  })

  // Create note folders mutation
  const {
    mutate: mutateNoteFolders,
    isLoading: noteFoldersIsLoading,
    isSuccess: noteFoldersIsSuccess,
    isError: noteFoldersIsError,
  } = useMutation(createBulkNoteFolders, {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: NOTE_FOLDER_KEYS.lists() })
    },
    onError: () => {
      toast.error("Note folders creation didn't work")
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(NOTE_FOLDER_KEYS.lists())
      await createNotes()
    },
  })

  // Create notes mutation
  const {
    mutate: mutateNotes,
    isLoading: notesIsLoading,
    isSuccess: notesIsSuccess,
    isError: notesIsError,
  } = useMutation(createBulkNotes, {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: NOTE_KEYS.lists() })
    },
    onError: () => {
      toast.error("Note creation didn't work")
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(NOTE_KEYS.lists())
    },
  })

  // Create routines mutation
  const {
    mutate: mutateRoutines,
    isLoading: routinesIsLoading,
    isSuccess: routinesIsSuccess,
    isError: routinesIsError,
  } = useMutation(createBulkRoutines, {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.lists() })
    },
    onError: () => {
      toast.error("Routines creation didn't work")
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(ROUTINE_KEYS.lists())
      await createRoutineChecklists()
    },
  })

  // Create routine checklist items mutation
  const {
    mutate: mutateRoutineChecklistItems,
    isLoading: routineChecklistsIsLoading,
    isSuccess: routineChecklistsIsSuccess,
    isError: routineChecklistsIsError,
  } = useMutation(createBulkRoutineChecklistItems, {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ROUTINE_KEYS.lists() })
    },
    onError: () => {
      toast.error("Routines checklist creation didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries(ROUTINE_KEYS.lists())
    },
  })

  // Create tasks mutation
  const {
    mutate: mutateTasks,
    isLoading: tasksIsLoading,
    isSuccess: tasksIsSuccess,
    isError: tasksIsError,
  } = useMutation(createBulkTasks, {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.lists() })
    },
    onError: () => {
      toast.error("Tasks creation didn't work")
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(TASK_KEYS.lists())
      await createTaskChecklists()
    },
  })

  // create task checklist items mutation
  const {
    mutate: mutateTaskChecklistItems,
    isLoading: taskChecklistsIsLoading,
    isSuccess: taskChecklistsIsSuccess,
    isError: taskChecklistsIsError,
  } = useMutation(createBulkTaskChecklistItems, {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.lists() })
    },
    onError: () => {
      toast.error("Tasks checklist creation didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries(TASK_KEYS.lists())
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

  // Create template items
  const onUseTemplate = async () => {
    if (!template) throw new Error('Template is undefined')
    navigate('creating')
    await createItems()
    await onSetOnboarded()
  }

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
  }

  return {
    template,
    isLoading,
    error,
    onUseTemplate,
    status,
  }
}
