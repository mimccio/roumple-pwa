import { useTranslation } from 'react-i18next'

import { DetailContentSection, DetailInfoSection } from '&/common/components/layouts'
import { RoutineStatusSelector } from '&/common/components/inputs/status-selector'
import { CreatedAt } from '&/common/components/display/created-at'
import { RoutineAction, Routine } from '&/modules/routine/types'

import {
  Priority,
  RoutineCategory,
  RoutineChecklist,
  RoutineDescription,
  RoutineName,
  RoutineNotes,
  RoutineSchedule,
  Occurrence,
  RoutineDate,
} from './parts'

interface Props {
  routine: Routine
  action?: RoutineAction
  actionIsLoading: boolean
  date: Date
  handleDateChange: (date: Date) => void
}

export function RoutineDetails({ routine, action, date, handleDateChange, actionIsLoading }: Props) {
  const { t } = useTranslation('common')

  return (
    <>
      <DetailInfoSection>
        <RoutineDate handleDateChange={handleDateChange} date={date} scheduleType={routine.type} />
        <div className="-mx-1 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <RoutineStatusSelector routine={routine} action={action} date={date} isLoading={actionIsLoading} />
            {!actionIsLoading && <Occurrence routine={routine} action={action} />}
          </div>

          <div className="flex items-center gap-x-4">
            {routine.archived && <p className="font-bold uppercase text-gray-400">{t('archived')}</p>}
            <Priority routine={routine} />
          </div>
        </div>

        <RoutineSchedule routine={routine} date={date} />
        <RoutineCategory routine={routine} />
        <CreatedAt createdAt={routine.created_at} />
      </DetailInfoSection>

      <DetailContentSection>
        <RoutineName routine={routine} />
        <RoutineDescription routine={routine} />
        <RoutineChecklist routine={routine} date={date} action={action} isLoading={actionIsLoading} />
        <RoutineNotes />
      </DetailContentSection>
    </>
  )
}
