import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'

import { ContentLayout, MainListLayout } from '&/common/components/layouts'
import { ListSkeleton } from '&/common/components/list-skeleton'
import { EmptyScreen } from '&/common/components/empty-screen'
import { EmptyMainContent } from '&/common/components/empty-main-content'
import workflowImg from '&/assets/illustrations/workflow.png'
import successImg from '&/assets/illustrations/success.png'

import { useTaskList } from '&/modules/task/hooks'
import { CreateTaskModale, TaskListItem } from '&/modules/task/components'
import { MainError, OfflineError } from '../errors'
import { TaskListHeader } from './parts/task-list-header'
import { Transition } from '@headlessui/react'

export function TaskListScreen() {
  const { t } = useTranslation('task')
  const {
    createIsOpen,
    handleDoneChange,
    handleSortChange,
    onCloseCreate,
    onOpenCreate,
    showDone,
    showStatus,
    taskList,
  } = useTaskList()

  return (
    <>
      <TaskListHeader
        showDone={showDone}
        handleDoneChange={handleDoneChange}
        handleSortChange={handleSortChange}
        onCreate={onOpenCreate}
      />
      <ContentLayout>
        {showStatus.error && <MainError />}
        {showStatus.offline && <OfflineError />}

        <MainListLayout>
          {showStatus.loading && <ListSkeleton />}
          {showDone && (
            <ul>
              <AnimatePresence>
                {taskList?.map((task) => (
                  <TaskListItem key={task.id} task={task} />
                ))}
              </AnimatePresence>
            </ul>
          )}
          {!showDone && (
            <ul>
              <AnimatePresence>
                {taskList?.map((task) => (
                  <TaskListItem key={task.id} task={task} />
                ))}
              </AnimatePresence>
            </ul>
          )}
        </MainListLayout>
        <Transition
          as="div"
          show={showStatus.empty && !showDone}
          className="absolute bottom-0 top-0 w-full"
          enter="transition ease-in-out duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <EmptyMainContent onClick={onOpenCreate} text={t('createNewTask')} image={workflowImg} />
        </Transition>
        <Transition
          as="div"
          show={showStatus.empty && showDone}
          className="absolute bottom-0 top-0 w-full"
          enter="transition ease-in-out duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <EmptyScreen opacity text={t('noDoneTask')} image={successImg} />
        </Transition>
      </ContentLayout>
      <CreateTaskModale isOpen={createIsOpen} close={onCloseCreate} />
    </>
  )
}
