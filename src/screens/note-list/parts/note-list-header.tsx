import { PlusIcon } from '@heroicons/react/24/solid'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

import { Tooltip } from '&/common/components/tooltip'
import { Header } from '&/common/components/layouts'
import { CategoryBtn } from '&/common/components/buttons'

import { useCreateNote } from '&/modules/note/hooks'

export function NoteListHeader() {
  const { onCreate } = useCreateNote()

  return (
    <Header>
      <div className="flex h-full items-center text-xl font-bold leading-6">
        <DocumentTextIcon width={20} className="text-gray-400" />
        <h1 className="ml-2 text-gray-500">Notes</h1>
      </div>
      <div className="flex gap-2">
        <Tooltip message="create note">
          <button className="group rounded-md p-1" onClick={onCreate}>
            <PlusIcon width={24} className="text-gray-500 transition-colors group-hover:text-gray-600" />
          </button>
        </Tooltip>

        <CategoryBtn />
      </div>
    </Header>
  )
}
