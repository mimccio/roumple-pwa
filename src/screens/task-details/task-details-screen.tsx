import { DetailsLoadingPage } from '&/common/components/details-loading-page'
import { DetailInfoSection } from '&/common/components/layouts/detail-info-section'
import { useTaskDetail } from '&/modules/task/hooks'
import { NotFoundDetails, OfflineError } from '../errors'
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
          <DetailInfoSection>hello</DetailInfoSection>
          <div className="mb-14 flex flex-1 flex-col gap-2">
            <TaskName task={task} />
          </div>
        </>
      )}
    </>
  )
}
