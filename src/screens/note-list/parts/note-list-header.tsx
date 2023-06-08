import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

import { Tooltip } from '&/common/components/tooltip'
import { Header } from '&/common/components/layouts'
import { CategoryBtn } from '&/common/components/buttons'

import { useCreateNote } from '&/modules/note/hooks'

export function NoteListHeader() {
  const { onCreate } = useCreateNote()

  return (
    <Header>
      <div className=" text flex h-full items-center text-xl font-bold leading-6 text-gray-500">
        <DocumentTextIcon width={20} className="text-gray-500" />

        <h1 className="ml-2">Notes</h1>
      </div>
      <div className="flex gap-1">
        <Tooltip message="create note">
          <button className="group p-2" onClick={onCreate}>
            <PlusCircleIcon width={20} className="text-gray-400 transition-colors group-hover:text-gray-500" />
          </button>
        </Tooltip>

        <CategoryBtn />
      </div>
    </Header>
  )
}
