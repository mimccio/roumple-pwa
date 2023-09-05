import { useTranslation } from 'react-i18next'
import { CheckBadgeIcon, PlusIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon, CheckBadgeIcon as CheckBadgeOutlineIcon } from '@heroicons/react/24/outline'

import { Tooltip } from '&/common/components/tooltip'
import { Header } from '&/common/components/layouts'
import { CategoryBtn } from '&/common/components/buttons'
import type { SortType } from '&/modules/task/types'
import { TasksMenu } from './tasks-menu'

interface Props {
  showDone: boolean
  onCreate: () => void
  handleDoneChange: () => void
  handleSortChange: (sortType: SortType) => void
}

export function TaskListHeader({ showDone, handleDoneChange, handleSortChange, onCreate }: Props) {
  const { t } = useTranslation(['common', 'task', 'action'])
  return (
    <Header>
      <div className="flex h-full items-center text-xl font-bold leading-6">
        <CheckCircleIcon width={20} className="text-gray-400" />
        <h1 className="ml-2 text-gray-500">{t('tasks', { ns: 'common' })}</h1>
      </div>
      <div className="relative flex gap-2">
        <TasksMenu handleSortChange={handleSortChange} />
        <Tooltip message={t('createTask', { ns: 'task' })}>
          <button className="group  rounded-md p-1" onClick={onCreate}>
            <PlusIcon width={24} className="text-gray-500 transition-colors group-hover:text-gray-600" />
          </button>
        </Tooltip>

        <Tooltip message={showDone ? t('showTodo', { ns: 'action' }) : t('showDone', { ns: 'action' })}>
          <button onClick={handleDoneChange} className="group p-2">
            {showDone ? (
              <CheckBadgeIcon width={24} className="text-green-500 transition-colors group-hover:text-gray-300" />
            ) : (
              <CheckBadgeOutlineIcon
                width={24}
                className="text-gray-400 transition-colors group-hover:text-green-300"
              />
            )}
          </button>
        </Tooltip>

        <CategoryBtn />
      </div>
    </Header>
  )
}
