import { ContentLayout } from '&/common/components/layouts/content-layout'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { SCHEDULE_TYPES } from '&/modules/routine/constants'

import type { Routine } from '&/modules/routine/types'
import type { Task } from '&/modules/task/types'
import { useBoardList } from '&/modules/board/hooks'
import { TaskListItem } from '&/modules/task/components'
import { RoutineActionListItem } from '&/screens/board/components'

import { MainError, OfflineError } from '../errors'
import { Header } from './components/header'
import { EmptyTodo } from './empty-todo'
import { EmptyDone } from './empty-done'
import { PeriodList } from './period-list'

const type = SCHEDULE_TYPES.daily

export function Today() {
  const { showStatus, list, handleShowDone, showDone, showPeriod, handleShowPeriod, handleUpdateRoutineStatus } =
    useBoardList({ type })

  return (
    <>
      <Header
        handleDoneChange={handleShowDone}
        handleShowPeriod={handleShowPeriod}
        showDone={showDone}
        showPeriod={showPeriod}
        title={<h1 className="text-indigo-700">Today</h1>}
        type={type}
      />
      <ContentLayout>
        {showStatus.error && <MainError />}
        {showStatus.offline && <OfflineError />}
        {showStatus.empty && !showDone && <EmptyTodo />}
        {showStatus.empty && showDone && <EmptyDone />}

        <div className="flex flex-col gap-4 px-2">
          {showStatus.loading && <ListSkeleton />}
          {!showPeriod &&
            list?.map((item) => {
              if (Object.prototype.hasOwnProperty.call(item, 'status')) {
                return <TaskListItem key={item.id} task={item as Task} />
              } else {
                return (
                  <RoutineActionListItem
                    key={item.id}
                    routine={item as Routine}
                    handleUpdateStatus={handleUpdateRoutineStatus}
                  />
                )
              }
            })}
          {showPeriod && <PeriodList type={type} list={list} handleUpdateStatus={handleUpdateRoutineStatus} />}
        </div>
      </ContentLayout>
    </>
  )
}
