import { TagIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'
import { CheckBadgeIcon as CheckBadgeOutlineIcon } from '@heroicons/react/24/outline'

import { ReactNode } from 'react'

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
        <button onClick={handleDoneChange} className="p-2">
          {showDone ? (
            <CheckBadgeIcon width={24} className="text-lime-500" />
          ) : (
            <CheckBadgeOutlineIcon width={24} className="text-gray-400" />
          )}
        </button>
        <button className="p-2">
          <TagIcon width={24} className="text-indigo-500" />
        </button>
      </div>
    </header>
  )
}
