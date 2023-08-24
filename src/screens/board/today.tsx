import { useTranslation } from 'react-i18next'

import { SCHEDULE_TYPES } from '&/common/constants'
import { ContentLayout } from '&/common/components/layouts/content-layout'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { useBoardList } from '&/modules/board/hooks'

import { MainError, OfflineError } from '../errors'
import { Header } from './components/header'
import { EmptyTodo } from './empty-todo'
import { EmptyDone } from './empty-done'
import { PeriodList } from './period-list'
import { ListItem } from './components/list-item'

const scheduleType = SCHEDULE_TYPES.daily

export function Today() {
  const { t } = useTranslation('schedule')
  const { showStatus, list, handleShowDone, showDone, showPeriod, handleShowPeriod, handleUpdateRoutineStatus } =
    useBoardList({ scheduleType })

  return (
    <>
      <Header
        handleDoneChange={handleShowDone}
        handleShowPeriod={handleShowPeriod}
        showDone={showDone}
        showPeriod={showPeriod}
        title={<h1 className="text-indigo-700">{t('today')}</h1>}
        scheduleType={scheduleType}
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
            <PeriodList scheduleType={scheduleType} list={list} handleUpdateStatus={handleUpdateRoutineStatus} />
          )}
        </div>
      </ContentLayout>
    </>
  )
}
