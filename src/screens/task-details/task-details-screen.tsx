import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { DetailContentSection } from '&/common/components/layouts'
import { DetailInfoSection } from '&/common/components/layouts/detail-info-section'
import { useTaskDetail } from '&/modules/task/hooks'
import { NotFoundDetails, OfflineError } from '../errors'
import { TaskCategory } from './parts/task-category'
import { TaskName } from './parts/task-name'
import { TaskNavbar } from './parts/task-navbar'

export function TaskDetailsScreen() {
  const { task, isLoading, isPaused } = useTaskDetail()

  if (!task && isPaused) return <OfflineError />
  if (!task && !isLoading) return <NotFoundDetails />

  return (
    <>
      <TaskNavbar task={task} isLoading={isLoading} />
      {isLoading && <DetailsLoadingPage />}

      {task && (
        <>
          <DetailInfoSection>
            <TaskCategory task={task} />
          </DetailInfoSection>

          <DetailContentSection>
            <TaskName task={task} />
          </DetailContentSection>
        </>
      )}
    </>
  )
}
