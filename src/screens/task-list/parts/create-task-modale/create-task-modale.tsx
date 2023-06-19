import { CreateItemModale } from '&/common/components/modales'
import { useCreateTask } from '&/modules/task/hooks/use-create-task'
import { TaskName } from './parts/task-name'

interface Props {
  isOpen: boolean
  close: () => void
}

export function CreateTaskModale({ isOpen, close }: Props) {
  const { handleNameChange, setCharNum, onSelectCategory, onCreateTask, name, charNum } = useCreateTask()

  return (
    <CreateItemModale isOpen={isOpen} close={close} onSave={onCreateTask} disabled={!charNum || charNum < 1}>
      <TaskName name={name} onChange={handleNameChange} setCharNum={setCharNum} />
    </CreateItemModale>
  )
}
