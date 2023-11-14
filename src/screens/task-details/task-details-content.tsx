import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { CreatedAt } from '&/common/components/display/created-at'
import { DetailContentSection } from '&/common/components/layouts'
import { DetailInfoSection } from '&/common/components/layouts/detail-info-section'

import { Task } from '&/modules/task/types'
import { NotFoundDetails, OfflineError } from '../errors'

import { TaskChecklist } from './parts/checklist/task-checklist'
import { TaskCategory } from './parts/task-category'
import { TaskDescription } from './parts/task-description'
import { TaskName } from './parts/task-name'
import { TaskNotes } from './parts/task-notes'
import { TaskPriority } from './parts/task-priority'
import { Schedule } from './parts/task-schedule'
import { TaskStatus } from './parts/task-status'

interface Props {
  task?: Task
  isPaused: boolean
  isLoading: boolean
}

export function TaskDetailsContent({ task, isLoading, isPaused }: Props) {
  if (isLoading) return <DetailsLoadingPage />
  if (!task && isPaused) return <OfflineError />
  if (!task) return <NotFoundDetails />
  return (
    <>
      <DetailInfoSection>
        <div className="-mx-1 mb-6 flex items-center justify-between">
          <TaskStatus task={task} />
          <TaskPriority task={task} />
        </div>
        <Schedule task={task} />
        <TaskCategory task={task} />
        <CreatedAt createdAt={task.created_at} />
      </DetailInfoSection>

      <DetailContentSection>
        <TaskName task={task} />
        <TaskDescription task={task} />
        <TaskChecklist task={task} />
        <TaskNotes />
      </DetailContentSection>
    </>
  )
}
