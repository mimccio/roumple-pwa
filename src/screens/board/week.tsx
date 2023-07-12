import { ContentLayout } from '&/common/components/layouts/content-layout'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { SCHEDULE_TYPES } from '&/modules/routine/constants'

import { MainError, OfflineError } from '../errors'
import { Header } from './components/header'
import { EmptyTodo } from './empty-todo'
import { EmptyDone } from './empty-done'
import { PeriodList } from './period-list'
import { useBoardList } from '&/modules/board/hooks'
import { ListItem } from './components/list-item'

const type = SCHEDULE_TYPES.weekly

export function Week() {
  const { showStatus, list, handleShowDone, showDone, showPeriod, handleShowPeriod, handleUpdateRoutineStatus } =
    useBoardList({ type })

  return (
    <>
      <Header
        handleDoneChange={handleShowDone}
        handleShowPeriod={handleShowPeriod}
        showDone={showDone}
        showPeriod={showPeriod}
        title={<h1 className="text-sky-700">This week</h1>}
        type={type}
      />
      <ContentLayout>
        {showStatus.error && <MainError />}
        {showStatus.offline && <OfflineError />}
        {showStatus.empty && !showDone && <EmptyTodo />}
        {showStatus.empty && showDone && <EmptyDone />}

        <div className="flex flex-col gap-4 px-2">
          {showStatus.loading && <ListSkeleton />}
          {showStatus.data &&
            !showPeriod &&
            list?.map((item) => (
              <ListItem key={item.id} item={item} handleUpdateRoutineStatus={handleUpdateRoutineStatus} />
            ))}
          {showStatus.data && showPeriod && (
            <PeriodList type={type} list={list} handleUpdateStatus={handleUpdateRoutineStatus} />
          )}
        </div>
      </ContentLayout>
    </>
  )
}
