import { CreateItemModale } from '&/common/components/modales'
import { RoutineScheduleSelector } from '&/common/components/inputs/routine-schedule-selector'
import { ModalePrioritySelector } from '&/common/components/inputs/modale-priority-selector'
import { useCreateRoutine } from '&/modules/routine/hooks'
import { Category } from './parts/category'
import { RoutineName } from './parts/routine-name'

interface Props {
  isOpen: boolean
  close: () => void
}

export function CreateRoutineModale({ isOpen, close }: Props) {
  const {
    category,
    charNum,
    currentPeriod,
    currentType,
    dailyRecurrence,
    handleNameChange,
    handlePeriodChange,
    handleRecurrenceChange,
    monthlyRecurrence,
    name,
    onCreateRoutine,
    onSelectCategory,
    onSelectPriority,
    priority,
    reset,
    setCharNum,
    weeklyRecurrence,
  } = useCreateRoutine()

  const onClose = () => {
    close()
    setTimeout(reset, 200)
  }

  return (
    <CreateItemModale isOpen={isOpen} close={onClose} onSave={onCreateRoutine} disabled={!charNum || charNum < 1}>
      <RoutineName name={name} onChange={handleNameChange} setCharNum={setCharNum} />
      <RoutineScheduleSelector
        currentPeriod={currentPeriod}
        currentType={currentType}
        dailyRecurrence={dailyRecurrence}
        handlePeriodChange={handlePeriodChange}
        handleRecurrenceChange={handleRecurrenceChange}
        monthlyRecurrence={monthlyRecurrence}
        weeklyRecurrence={weeklyRecurrence}
      />
      <Category category={category} onSelect={onSelectCategory} />
      <ModalePrioritySelector priority={priority} onSelect={onSelectPriority} />
    </CreateItemModale>
  )
}
