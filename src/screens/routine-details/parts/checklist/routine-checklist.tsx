import { useTranslation } from 'react-i18next'

import { SCHEDULE_TYPES } from '&/common/constants'
import { useDeleteChecklistItem } from '&/modules/routine-checklist-item/hooks/use-delete-checklist-item'

import { useUpsertAction } from '&/modules/routine/hooks'
import { Routine } from '&/modules/routine/types'
import { ChecklistItem } from './checklist-item'
import { NewChecklistItem } from './new-checklist-item'

interface Props {
  routine: Routine
  date: Date
}

export function RoutineChecklist({ routine, date }: Props) {
  const { t } = useTranslation(['common', 'routine', 'schedule'])
  const { onDelete } = useDeleteChecklistItem(routine)
  const { handleSelectChecklistItem, handleDeleteCheckedItem } = useUpsertAction({ type: routine.type, date })

  const onSelectChecklistItem = (checklistItemId: string) => handleSelectChecklistItem({ routine, checklistItemId })

  const handleDelete = (checklistItemId: string) => {
    handleDeleteCheckedItem({ routine, checklistItemId })
    onDelete(checklistItemId)
  }

  const getText = () => {
    if (routine.type === SCHEDULE_TYPES.monthly) return t('nextMonth', { ns: 'schedule' })
    if (routine.type === SCHEDULE_TYPES.weekly) return t('nextWeek', { ns: 'schedule' })
    return t('tomorrow', { ns: 'schedule' })
  }

  return (
    <div className="w-full max-w-2xl flex-1 px-4 2xl:mt-4">
      <div className="flex flex-col">
        <h4 className="font-bold uppercase text-gray-400">{t('checklist', { ns: 'common' })}</h4>
        <p className="text-xs text-gray-300">
          {t('checklistWillReset', { ns: 'routine' })} {getText()}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {routine.checklist?.map((checklistItem) => (
          <ChecklistItem
            checklistItem={checklistItem}
            key={checklistItem.id}
            onDelete={handleDelete}
            onSelect={onSelectChecklistItem}
            isChecked={routine.actions?.[0]?.checked_list?.includes(checklistItem.id)}
          />
        ))}
        <NewChecklistItem routine={routine} />
      </div>
    </div>
  )
}
