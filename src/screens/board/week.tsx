import { ContentLayout } from '&/common/components/layouts/content-layout'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { RoutineActionListItem } from '&/screens/board/components'
import { useUpsertAction, useBoardRoutines } from '&/modules/routine/hooks/'
import { SCHEDULE_TYPES } from '&/modules/routine/constants'

import { MainError } from '../errors'
import { Header } from './components/header'
import { EmptyTodo } from './empty-todo'
import { EmptyDone } from './empty-done'

const type = SCHEDULE_TYPES.weekly

export function Week() {
  const { routines, isLoading, date, handleShowDone, showDone, isEmpty, isError } = useBoardRoutines({ type })
  const { handleUpdateStatus } = useUpsertAction({ type, date })

  return (
    <>
      <Header
        showDone={showDone}
        handleDoneChange={handleShowDone}
        title={<h1 className="text-sky-700">This week</h1>}
      />
      <ContentLayout>
        {isError && <MainError />}
        {isEmpty && !showDone && <EmptyTodo />}
        {isEmpty && showDone && <EmptyDone />}

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
