import type { ScheduleType } from '&/common/types'
import { ContentLayout } from '&/common/components/layouts'
import { useBoardList } from '&/modules/board/hooks'
import { Header, BoardList, BoardFallback } from './parts'

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
        title={title}
        scheduleType={scheduleType}
      />
      <ContentLayout>
        {list.length > 0 && (
          <BoardList
            handleUpdateRoutineStatus={handleUpdateRoutineStatus}
            list={list}
            scheduleType={scheduleType}
            showDone={showDone}
            showPeriod={showPeriod}
          />
        )}
        <BoardFallback showStatus={showStatus} showDone={showDone} />
      </ContentLayout>
    </>
  )
}
