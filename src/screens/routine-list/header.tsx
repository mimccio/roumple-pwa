import { TagIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/20/solid'
import { ArchiveBoxIcon as ArchiveBoxOutlineIcon } from '@heroicons/react/24/outline'
import { ArchiveBoxIcon } from '@heroicons/react/24/solid'

import { useCreateRoutine } from '&/modules/routine/hooks'

interface Props {
  archived: boolean
  handleShowArchived: () => void
}

export function Header({ handleShowArchived, archived }: Props) {
  const { onCreateRoutine } = useCreateRoutine()

  return (
    <header className=" flex h-14 w-full items-center justify-between border-b-4 border-indigo-500 px-2">
      <div className=" text flex h-full items-center text-xl font-bold leading-6 text-gray-500">
        <ArrowPathRoundedSquareIcon width={20} className="text-gray-500" />

        <h1 className="ml-2">Routines</h1>
      </div>
      <div className="flex gap-1">
        <button onClick={onCreateRoutine} className="p-2">
          <PlusCircleIcon width={24} className="text-gray-500" />
        </button>
        <button onClick={handleShowArchived} className="p-2">
          {archived && <ArchiveBoxIcon width={24} className="text-gray-600" />}
          {!archived && <ArchiveBoxOutlineIcon width={24} className="text-gray-400" />}
        </button>
        <button className="p-2">
          <TagIcon width={24} className="text-indigo-500" />
        </button>
      </div>
    </header>
  )
}
