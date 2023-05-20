import { ContentLayout } from '&/common/components/layouts/content-layout'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { RoutineActionListItem } from '&/screens/board/components'
import { useUpsertAction } from '&/modules/routine/hooks/'

import { BOARD_TYPES, DAILY, SCHEDULE_TYPES } from '&/modules/routine/constants'
import { Header } from '../components/header'
import { EmptyTodo } from '../empty-todo'
import { EmptyDone } from '../empty-done'
import { useBoardRoutines } from '&/modules/routine/hooks'

export function Today() {
  const { routines, isLoading, date, handleShowDone, showDone } = useBoardRoutines({
    type: SCHEDULE_TYPES.daily,
    boardType: BOARD_TYPES.today,
  })

  const { handleUpdateStatus } = useUpsertAction({ date, type: DAILY, boardType: BOARD_TYPES.today })

  return (
    <>
      <Header
        showDone={showDone}
        handleDoneChange={handleShowDone}
        title={<h1 className="text-indigo-700">Today</h1>}
      />
      <ContentLayout>
        {!isLoading && !routines?.length && !showDone && <EmptyTodo />}
        {!isLoading && !routines?.length && showDone && <EmptyDone />}

        <div className="flex flex-col gap-4 px-2">
          {isLoading && <ListSkeleton />}
          {routines?.map((routine) => (
            <RoutineActionListItem key={routine.id} routine={routine} handleUpdateStatus={handleUpdateStatus} />
          ))}
        </div>
      </ContentLayout>
    </>
  )
}
