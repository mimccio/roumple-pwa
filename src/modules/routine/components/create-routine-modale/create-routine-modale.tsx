import { CreateItemModale } from '&/common/components/modales'
import { RoutineScheduleSelector } from '&/common/components/inputs/routine-schedule-selector'
import { ModalePrioritySelector } from '&/common/components/inputs/modale-priority-selector'
import { ModaleCategorySelector } from '&/common/components/inputs/modale-category-selector'
import { useCreateRoutine } from '&/modules/routine/hooks'
import { RoutineName } from './parts/routine-name'
import { Occurrence } from './parts/occurrence'

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
    occurrence,
    handleOccurrenceChange,
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
      <Occurrence occurrence={occurrence} handleOccurrenceChange={handleOccurrenceChange} scheduleType={currentType} />
      <ModaleCategorySelector category={category} onSelect={onSelectCategory} />
      <ModalePrioritySelector priority={priority} onSelect={onSelectPriority} />
    </CreateItemModale>
  )
}
