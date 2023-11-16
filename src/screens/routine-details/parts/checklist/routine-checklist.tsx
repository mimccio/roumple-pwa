import { useTranslation } from 'react-i18next'

import { SCHEDULE_TYPES } from '&/common/constants'
import { useDeleteChecklistItem } from '&/modules/routine-checklist-item/hooks/use-delete-checklist-item'

import { useUpsertAction } from '&/modules/routine/hooks'
import { Routine, RoutineAction } from '&/modules/routine/types'
import { ChecklistItem } from './checklist-item'
import { NewChecklistItem } from './new-checklist-item'

interface Props {
  routine: Routine
  date: Date
  action?: RoutineAction
  isLoading: boolean
  archived: boolean
}

export function RoutineChecklist({ routine, date, action, isLoading, archived }: Props) {
  const { t } = useTranslation(['common', 'routine', 'schedule'])
  const { onDelete } = useDeleteChecklistItem(routine)
  const { handleSelectChecklistItem, handleDeleteCheckedItem } = useUpsertAction({
    scheduleType: routine.scheduleType,
    date,
  })

  const onSelectChecklistItem = (checklistItemId: string) =>
    handleSelectChecklistItem({ routine, checklistItemId, action })

  const handleDelete = (checklistItemId: string) => {
    handleDeleteCheckedItem({ routine, action, checklistItemId })
    onDelete(checklistItemId)
  }

  const getText = () => {
    if (routine.scheduleType === SCHEDULE_TYPES.monthly) return t('nextMonth', { ns: 'schedule' })
    if (routine.scheduleType === SCHEDULE_TYPES.weekly) return t('nextWeek', { ns: 'schedule' })
    return t('tomorrow', { ns: 'schedule' })
  }

  return (
    <div className="mx-auto mt-4 w-full max-w-5xl px-4">
      <div className="items-top flex flex-wrap justify-between gap-x-14">
        <h4 className="font-semibold  text-gray-400">{t('checklist', { ns: 'common' })}</h4>
        {!archived && (
          <p className="text-xs text-gray-300">
            {t('checklistWillReset', { ns: 'routine' })} {getText()}
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-y-1">
        {routine.checklist?.map((checklistItem) => (
          <ChecklistItem
            checklistItem={checklistItem}
            key={checklistItem.id}
            onDelete={handleDelete}
            onSelect={onSelectChecklistItem}
            isChecked={action?.checkedList?.includes(checklistItem.id)}
            disabled={isLoading || archived}
          />
        ))}
        <NewChecklistItem routine={routine} />
      </div>
    </div>
  )
}
