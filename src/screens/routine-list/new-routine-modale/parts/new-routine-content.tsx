import { useCreateRoutine } from '&/modules/routine/hooks'
import { ActionSection } from './action-section'
import { Category } from './category'
import { Priority } from './priority'
import { RoutineName } from './routine-name'
import { Schedule } from './schedule'

interface Props {
  close: () => void
}

export function NewRoutineContent({ close }: Props) {
  const {
    onCreateRoutine,
    name,
    handleNameChange,
    dailyRecurrence,
    currentPeriod,
    handlePeriodChange,
    currentType,
    handleRecurrenceChange,
    weeklyRecurrence,
    monthlyRecurrence,
    onSelectPriority,
    priority,
    onSelectCategory,
    category,
  } = useCreateRoutine()

  return (
    <div className="flex flex-col gap-4">
      <RoutineName name={name} onChange={handleNameChange} />
      <Schedule
        currentPeriod={currentPeriod}
        currentType={currentType}
        dailyRecurrence={dailyRecurrence}
        handlePeriodChange={handlePeriodChange}
        handleRecurrenceChange={handleRecurrenceChange}
        monthlyRecurrence={monthlyRecurrence}
        weeklyRecurrence={weeklyRecurrence}
      />
      <Category category={category} onSelect={onSelectCategory} />
      <Priority priority={priority} onSelect={onSelectPriority} />
      <ActionSection close={close} onSubmit={onCreateRoutine} />
    </div>
  )
}
