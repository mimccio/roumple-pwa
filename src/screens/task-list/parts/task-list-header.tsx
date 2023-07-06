import { useState } from 'react'
import { CheckBadgeIcon, PlusIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon, CheckBadgeIcon as CheckBadgeOutlineIcon } from '@heroicons/react/24/outline'

import { Tooltip } from '&/common/components/tooltip'
import { Header } from '&/common/components/layouts'
import { CategoryBtn } from '&/common/components/buttons'
import { CreateTaskModale } from '&/modules/task/components'

interface Props {
  showDone: boolean
  handleDoneChange: () => void
}

export function TaskListHeader({ showDone, handleDoneChange }: Props) {
  const [createIsOpen, setCreateIsOpen] = useState(false)

  return (
    <Header>
      <div className="flex h-full items-center text-xl font-bold leading-6">
        <CheckCircleIcon width={20} className="text-gray-400" />
        <h1 className="ml-2 text-gray-500">Tasks</h1>
      </div>
      <div className="flex gap-2">
        <Tooltip message="create task">
          <button className="group rounded-md p-1" onClick={() => setCreateIsOpen(true)}>
            <PlusIcon width={24} className="text-gray-500 transition-colors group-hover:text-gray-600" />
          </button>
        </Tooltip>

        <Tooltip message={showDone ? 'show to do' : 'show done'}>
          <button onClick={handleDoneChange} className="group p-2">
            {showDone ? (
              <CheckBadgeIcon width={20} className="text-green-500 transition-colors group-hover:text-gray-300" />
            ) : (
              <CheckBadgeOutlineIcon
                width={20}
                className="text-gray-400 transition-colors group-hover:text-green-300"
              />
            )}
          </button>
        </Tooltip>

        <CategoryBtn />
      </div>
      <CreateTaskModale isOpen={createIsOpen} close={() => setCreateIsOpen(false)} />
    </Header>
  )
}
