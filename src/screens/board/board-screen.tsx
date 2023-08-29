import { Transition } from '@headlessui/react'

import type { ScheduleType } from '&/common/types'
import { ContentLayout } from '&/common/components/layouts/content-layout'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { useBoardList } from '&/modules/board/hooks'

import { MainError, OfflineError } from '../errors'
import { Header, EmptyTodo, EmptyDone, PeriodList, ItemList } from './components'

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

        <div className="z-10 flex flex-col gap-4 px-2">
          {showStatus.loading && <ListSkeleton />}
          {!showPeriod && showDone && <ItemList list={list} handleUpdateRoutineStatus={handleUpdateRoutineStatus} />}
          {!showPeriod && !showDone && <ItemList list={list} handleUpdateRoutineStatus={handleUpdateRoutineStatus} />}

          {showPeriod && showDone && (
            <PeriodList scheduleType={scheduleType} list={list} handleUpdateRoutineStatus={handleUpdateRoutineStatus} />
          )}
          {showPeriod && !showDone && (
            <PeriodList scheduleType={scheduleType} list={list} handleUpdateRoutineStatus={handleUpdateRoutineStatus} />
          )}
        </div>

        <Transition
          as="div"
          show={showStatus.empty && !showDone}
          className="absolute bottom-0 top-0 w-full"
          enter="transition ease-in-out duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <EmptyTodo />
        </Transition>
        <Transition
          as="div"
          show={showStatus.empty && showDone}
          className="absolute bottom-0 top-0 w-full"
          enter="transition ease-in-out duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <EmptyDone />
        </Transition>
      </ContentLayout>
    </>
  )
}
