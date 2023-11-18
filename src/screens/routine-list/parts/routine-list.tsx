import { MainListLayout } from '&/common/components/layouts'
import { Routine } from '&/modules/routine/types'
import { GroupedByScheduleRoutineList } from './grouped-by-schedule-routine-list'
import { SimpleList } from './simple-list'

interface Props {
  routineList: Routine[]
  archived: boolean
  isGroupedBySchedule: boolean
}

export function RoutineList({ isGroupedBySchedule, routineList, archived }: Props) {
  return (
    <MainListLayout>
      {isGroupedBySchedule ? (
        <GroupedByScheduleRoutineList list={routineList} archived={archived} />
      ) : (
        <SimpleList routineList={routineList} archived={archived} />
      )}
    </MainListLayout>
  )
}
