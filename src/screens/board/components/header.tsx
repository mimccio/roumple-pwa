import { TagIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'
import { CheckBadgeIcon as CheckBadgeOutlineIcon } from '@heroicons/react/24/outline'

import { ReactNode } from 'react'
import { Tooltip } from '&/common/components/tooltip'

interface Props {
  title: ReactNode
  showDone: boolean
  handleDoneChange: () => void
}

export function Header({ title, showDone, handleDoneChange }: Props) {
  return (
    <header className=" flex h-14 w-full items-center justify-between border-b-4 border-indigo-500 px-2">
      <div className=" text flex h-full items-center text-xl font-bold leading-6 text-gray-500">{title}</div>
      <div className="flex gap-1">
        <Tooltip message={showDone ? 'show to do' : 'show done'}>
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
        <button className="p-2">
          <TagIcon width={24} className="text-indigo-500" />
        </button>
      </div>
    </header>
  )
}
