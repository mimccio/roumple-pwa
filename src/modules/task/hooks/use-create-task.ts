import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useAtom } from 'jotai'
import { toast } from 'react-hot-toast'

import { useMainPath } from '&/common/hooks'
import type { Category } from '&/modules/category/types'
import { categoryAtom } from '&/modules/category/atoms'
import type { Task } from '../types'
import { TASK_KEYS } from '../constants'
import { createTask } from '../mutations'

export function useCreateTask() {
  const queryClient = useQueryClient()
  const id = uuidv4()
  const [globalCategory, setGlobalCategory] = useAtom(categoryAtom)
  const navigate = useNavigate()
  const mainPath = useMainPath()
  const [name, setName] = useState('')
  const [charNum, setCharNum] = useState(0)
  const [category, setCategory] = useState(globalCategory)
  const [priority, setPriority] = useState(0)

  const { mutate } = useMutation(createTask, {
    onMutate: async (data) => {
      // Cancel list queries
      await queryClient.cancelQueries({ queryKey: TASK_KEYS.list() })
      // Update item
      queryClient.setQueryData(TASK_KEYS.detail(id), () => data)
      // Update task list
      const previousTaskList = queryClient.getQueryData(TASK_KEYS.list())
      queryClient.setQueryData(TASK_KEYS.list(), (old: Task[] = []) => [...old, data])

      // TODO!: BOARD LIST

      navigate(`d/task/${id}`)
      return { previousTaskList }
    },
    onError: (_err, _item, context) => {
      queryClient.setQueryData(TASK_KEYS.detail(id), null)
      queryClient.setQueryData(TASK_KEYS.list(), context?.previousTaskList)
      navigate(mainPath)
      toast.error("Creation didn't work")
    },
    onSuccess: () => {
      queryClient.invalidateQueries(TASK_KEYS.list())
    },
  })

  const reset = () => {
    setName('')
    setPriority(0)
    if (category?.id !== globalCategory?.id) setGlobalCategory(null)
  }

  const onCreateTask = () => {
    if (charNum === 0) return
    mutate({
      id,
      name,
      createdAt: new Date(),
      category,
      priority,
    })
    reset()
  }

  const handleNameChange = (name: string) => setName(name)
  const onSelectCategory = (category: Category) => setCategory(category)
  const onSelectPriority = (priority: number) => setPriority(priority)

  return {
    handleNameChange,
    setCharNum,
    onSelectCategory,
    onCreateTask,
    name,
    charNum,
    category: category,
    onSelectPriority,
    priority,
    reset,
  }
}
