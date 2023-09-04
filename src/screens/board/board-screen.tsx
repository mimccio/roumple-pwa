import type { ScheduleType } from '&/common/types'
import { MainListLayout, ContentLayout } from '&/common/components/layouts'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { useBoardList } from '&/modules/board/hooks'

import { MainError, OfflineError } from '../errors'
import { Header, EmptyContent, PeriodList, ItemList } from './parts'

interface Props {
  scheduleType: ScheduleType
  title: string
}

export function BoardScreen({ scheduleType, title }: Props) {
  const { showStatus, list, handleShowDone, showDone, showPeriod, handleShowPeriod, handleUpdateRoutineStatus } =
    useBoardList({ scheduleType })

  return (
    <>
      <Header
        handleDoneChange={handleShowDone}
        handleShowPeriod={handleShowPeriod}
        showDone={showDone}
        showPeriod={showPeriod}
        title={<h1 className="text-indigo-700">{title}</h1>}
        scheduleType={scheduleType}
      />
      <ContentLayout>
        {showStatus.error && <MainError />}
        {showStatus.offline && <OfflineError />}

        <MainListLayout>
          {showStatus.loading && <ListSkeleton />}
          {showStatus.data && !showPeriod && showDone && (
            <ItemList list={list} handleUpdateRoutineStatus={handleUpdateRoutineStatus} />
          )}
          {showStatus.data && !showPeriod && !showDone && (
            <ItemList list={list} handleUpdateRoutineStatus={handleUpdateRoutineStatus} />
          )}

          {showStatus.data && showPeriod && showDone && (
            <PeriodList scheduleType={scheduleType} list={list} handleUpdateRoutineStatus={handleUpdateRoutineStatus} />
          )}
          {showStatus.data && showPeriod && !showDone && (
            <PeriodList scheduleType={scheduleType} list={list} handleUpdateRoutineStatus={handleUpdateRoutineStatus} />
          )}
        </MainListLayout>
        <EmptyContent showStatus={showStatus} showDone={showDone} />
      </ContentLayout>
    </>
  )
}