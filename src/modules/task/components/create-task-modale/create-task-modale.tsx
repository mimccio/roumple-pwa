import { ModaleCategorySelector } from '@/common/components/inputs/modale-category-selector'
import { ModalePrioritySelector } from '@/common/components/inputs/modale-priority-selector'
import { CreateItemModale } from '@/common/components/modales'
import { useCreateTask } from '@/modules/task/hooks'
import { TaskSchedule } from '../schedule'
import { TaskName } from './parts/task-name'

interface Props {
  isOpen: boolean
  close: () => void
}

export function CreateTaskModale({ isOpen, close }: Props) {
  const {
    category,
    charNum,
    date,
    handleNameChange,
    name,
    onCreateTask,
    onSelectCategory,
    onSelectDate,
    onSelectPeriod,
    onSelectPriority,
    period,
    priority,
    reset,
    scheduleType,
    setCharNum,
  } = useCreateTask()

  const onClose = () => {
    close()
    setTimeout(reset, 200)
  }

  return (
    <CreateItemModale isOpen={isOpen} close={onClose} onSave={onCreateTask} disabled={!charNum || charNum < 1}>
      <TaskName name={name} onChange={handleNameChange} setCharNum={setCharNum} />
      <ModaleCategorySelector category={category} onSelect={onSelectCategory} />
      <ModalePrioritySelector priority={priority} onSelect={onSelectPriority} />
      <TaskSchedule
        scheduleType={scheduleType}
        period={period}
        date={date}
        onSelectDate={onSelectDate}
        onSelectPeriod={onSelectPeriod}
      />
    </CreateItemModale>
  )
}
