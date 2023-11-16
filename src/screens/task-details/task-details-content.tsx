import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { CreatedAt } from '&/common/components/display/created-at'

import { Task } from '&/modules/task/types'
import { NotFoundDetails, OfflineError } from '../errors'

import { TaskChecklist } from './parts/checklist/task-checklist'
import { TaskCategory } from './parts/task-category'
import { TaskDescription } from './parts/task-description'
import { TaskName } from './parts/task-name'
import { TaskNotes } from './parts/task-notes'
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
      <TaskCategory task={task} />
      <TaskName task={task} />
      <Schedule task={task} />
      <TaskStatus task={task} />
      <TaskChecklist task={task} />
      <TaskDescription task={task} />
      <TaskNotes />
      <CreatedAt createdAt={task.created_at} />
    </>
  )
}
