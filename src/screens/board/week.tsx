import { ContentLayout } from '&/common/components/layouts/content-layout'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { RoutineActionListItem } from '&/screens/board/components'
import { useUpsertAction } from '&/modules/routine/hooks/'

import { SCHEDULE_TYPES } from '&/modules/routine/constants'
import { Header } from './components/header'
import { EmptyTodo } from './empty-todo'
import { EmptyDone } from './empty-done'
import { useBoardRoutines } from '&/modules/routine/hooks'

const type = SCHEDULE_TYPES.weekly

export function Week() {
  const { routines, isLoading, date, handleShowDone, showDone } = useBoardRoutines({ type })
  const { handleUpdateStatus } = useUpsertAction({ type, date })

  return (
    <>
      <Header
        showDone={showDone}
        handleDoneChange={handleShowDone}
        title={<h1 className="text-sky-700">This week</h1>}
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
