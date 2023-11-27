import { CategorySelector } from '@/common/components/inputs/category-selector'
import type { Task } from '@/modules/task/types'
import { useTaskCategory } from '@/modules/task/hooks'

interface Props {
  task: Task
}

export function TaskCategory({ task }: Props) {
  const { categoryList, isLoading, error, onSelect } = useTaskCategory(task)
  return (
    <>
      <CategorySelector
        category={task.category}
        categoryList={categoryList}
        isLoading={isLoading}
        isError={Boolean(error)}
        onSelect={onSelect}
      />
    </>
  )
}
