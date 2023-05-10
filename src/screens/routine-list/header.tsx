import { TagIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/20/solid'

import { ArchiveBoxIcon } from '@heroicons/react/24/outline'

export function Header() {
  return (
    <header className=" flex h-14 w-full items-center justify-between border-b-4 border-indigo-500 px-2">
      <div className=" text flex h-full items-center text-xl font-bold leading-6 text-gray-500">
        <ArrowPathRoundedSquareIcon width={20} className="text-gray-500" />

        <h1 className="ml-2 pb-1">Routines</h1>
      </div>
      <div className="flex gap-1">
        <button className="p-2">
          <PlusCircleIcon width={24} className="text-gray-500" />
        </button>
        <button className="p-2">
          <ArchiveBoxIcon width={24} className="text-gray-400" />
        </button>
        <button className="p-2">
          <TagIcon width={24} className="text-indigo-500" />
        </button>
      </div>
    </header>
  )
}
