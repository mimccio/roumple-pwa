import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { XCircleIcon, DocumentCheckIcon } from '@heroicons/react/20/solid'
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/solid'
import {
  TrashIcon,
  ArchiveBoxArrowDownIcon,
  DocumentCheckIcon as DocumentCheckOutlineIcon,
} from '@heroicons/react/24/outline'

import { useMainPath } from '&/common/hooks'
import { Tooltip } from '&/common/components/tooltip'
import type { Routine } from '&/modules/routine/types'
import { useArchiveRoutine, useDeleteRoutine } from '&/modules/routine/hooks'
import { ConfirmDeleteModale } from '&/common/components/confirm-delete-modale'
import { useState } from 'react'

interface Props {
  routine: Routine
}

export function RoutineHeader({ routine }: Props) {
  const { pathname } = useLocation()
  const mainPath = useMainPath()
  const { onDeleteRoutine } = useDeleteRoutine()
  const { handleArchiveRoutine } = useArchiveRoutine()
  const [deleteModaleIsOpen, setDeleteModaleIsOpen] = useState(false)
  const onDelete = () => onDeleteRoutine(routine)
  const onArchive = () => handleArchiveRoutine(routine)

  return (
    <div className="flex h-14 w-full items-center justify-between bg-gray-200 px-4 text-gray-400">
      <div className="flex items-center gap-2">
        <Tooltip message="delete">
          <button onClick={() => setDeleteModaleIsOpen(true)} className="group h-8 w-8">
            <TrashIcon className="text-red-300 transition-colors group-hover:text-red-400" width={20} />
          </button>
        </Tooltip>
        <Tooltip message={routine.archived ? 'unarchive' : 'archive'}>
          <button onClick={onArchive} className="h-8 w-8">
            {!routine.archived && (
              <ArchiveBoxArrowDownIcon className="transition-colors group-hover:text-gray-500" width={20} />
            )}
            {routine.archived && (
              <ArchiveBoxXMarkIcon
                className="text-emerald-400 transition-colors group-hover:text-emerald-500"
                width={20}
              />
            )}
          </button>
        </Tooltip>
      </div>
      <div className="flex items-center gap-2">
        <Routes>
          <Route
            path="checklist"
            element={
              <Tooltip message="show details">
                <Link
                  to={pathname.split('/checklist').slice(0, -1).join('/') + '/details'}
                  className="group flex h-8 w-8 items-center justify-center"
                >
                  <DocumentCheckIcon width={24} className="text-blue-500 transition-colors group-hover:text-blue-400" />
                </Link>
              </Tooltip>
            }
          />
          <Route
            path="*"
            element={
              <Tooltip message="show checklist">
                <Link to="checklist" className="group flex h-8 w-8 items-center justify-center">
                  <DocumentCheckOutlineIcon width={24} className="transition-colors group-hover:text-blue-400" />
                </Link>
              </Tooltip>
            }
          />
        </Routes>

        <Tooltip message="close">
          <Link to={mainPath} className="group flex h-8 w-8 items-center justify-center">
            <XCircleIcon width={24} className="transition-colors group-hover:text-gray-500" />
          </Link>
        </Tooltip>
      </div>
      <ConfirmDeleteModale
        isOpen={deleteModaleIsOpen}
        onDelete={onDelete}
        close={() => setDeleteModaleIsOpen(false)}
        title="Delete Routine"
        description="Are you sure you want to delete this routine? This action cannot be undone."
      />
    </div>
  )
}
