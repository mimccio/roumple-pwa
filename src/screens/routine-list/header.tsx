import { useAtom } from 'jotai'
import { TagIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/20/solid'
import { ArchiveBoxIcon as ArchiveBoxOutlineIcon } from '@heroicons/react/24/outline'
import { ArchiveBoxIcon } from '@heroicons/react/24/solid'

import { useCreateRoutine } from '&/modules/routine/hooks'
import { Tooltip } from '&/common/components/tooltip'
import { categoryAtom } from '&/modules/category/atoms'
import { cl } from '&/common/utils'

interface Props {
  archived: boolean
  handleShowArchived: () => void
}

export function Header({ handleShowArchived, archived }: Props) {
  const { onCreateRoutine } = useCreateRoutine()
  const [category, setCategory] = useAtom(categoryAtom)

  return (
    <header
      className={cl(
        'flex h-14 w-full items-center justify-between border-b-4 px-2 transition-colors xl:px-4',
        category?.color ? `border-${category.color}-500` : 'border-gray-200'
      )}
    >
      <div className=" text flex h-full items-center text-xl font-bold leading-6 text-gray-500">
        <ArrowPathRoundedSquareIcon width={20} className="text-gray-500" />

        <h1 className="ml-2">Routines</h1>
      </div>
      <div className="flex gap-1">
        <Tooltip message="create routine">
          <button className="group p-2" onClick={onCreateRoutine}>
            <PlusCircleIcon width={20} className="text-gray-400 transition-colors group-hover:text-gray-500" />
          </button>
        </Tooltip>
        <Tooltip message={archived ? 'show active' : 'show archived'}>
          <button onClick={handleShowArchived} className="group p-2">
            {archived && (
              <ArchiveBoxIcon width={20} className="text-emerald-400 transition-colors group-hover:text-emerald-500" />
            )}
            {!archived && (
              <ArchiveBoxOutlineIcon width={20} className="text-gray-400 transition-colors group-hover:text-gray-500" />
            )}
          </button>
        </Tooltip>
        <button disabled={!category} onClick={() => setCategory(null)} className="p-2">
          <TagIcon
            width={20}
            className={cl('transition-colors', category?.color ? `text-${category.color}-500` : 'text-gray-300')}
          />
        </button>
      </div>
    </header>
  )
}
