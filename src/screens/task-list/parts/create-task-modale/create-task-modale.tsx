import { ModaleCategorySelector } from '&/common/components/inputs/modale-category-selector'
import { ModalePrioritySelector } from '&/common/components/inputs/modale-priority-selector'
import { CreateItemModale } from '&/common/components/modales'
import { useCreateTask } from '&/modules/task/hooks/use-create-task'
import { TaskName } from './parts/task-name'

interface Props {
  isOpen: boolean
  close: () => void
}

export function CreateTaskModale({ isOpen, close }: Props) {
  const {
    handleNameChange,
    setCharNum,
    onSelectCategory,
    onCreateTask,
    name,
    charNum,
    category,
    onSelectPriority,
    priority,
    reset,
  } = useCreateTask()

  const onClose = () => {
    reset()
    close()
  }

  return (
    <CreateItemModale isOpen={isOpen} close={onClose} onSave={onCreateTask} disabled={!charNum || charNum < 1}>
      <TaskName name={name} onChange={handleNameChange} setCharNum={setCharNum} />
      <ModaleCategorySelector category={category} onSelect={onSelectCategory} />
      <ModalePrioritySelector priority={priority} onSelect={onSelectPriority} />
    </CreateItemModale>
  )
}
