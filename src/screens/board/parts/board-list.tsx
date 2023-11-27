import { MainListLayout } from '@/common/components/layouts'
import { ScheduleType } from '@/common/types'
import { Routine, UpdateStatusParams } from '@/modules/routine/types'
import { Task } from '@/modules/task/types'
import { ItemList, PeriodList } from '.'

interface Props {
  showPeriod: boolean
  scheduleType: ScheduleType
  list: (Routine | Task)[]
  showDone: boolean
  handleUpdateRoutineStatus: ({ routine, action, status }: UpdateStatusParams) => void
}

export function BoardList({ showPeriod, scheduleType, list, showDone, handleUpdateRoutineStatus }: Props) {
  return (
    <MainListLayout>
      {showPeriod ? (
        <PeriodList
          scheduleType={scheduleType}
          list={list}
          handleUpdateRoutineStatus={handleUpdateRoutineStatus}
          showDone={showDone}
        />
      ) : (
        <ItemList list={list} handleUpdateRoutineStatus={handleUpdateRoutineStatus} showDone={showDone} />
      )}
    </MainListLayout>
  )
}
