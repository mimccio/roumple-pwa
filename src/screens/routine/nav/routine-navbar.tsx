import { useState } from 'react'
import { DetailsNavbar } from '&/common/components/layouts'
import { CloseNavBtn } from '&/common/components/buttons'
import { ItemMenu } from '&/common/components/menus'
import { ConfirmDeleteModale } from '&/common/components/confirm-delete-modale'
import { useArchiveRoutine, useDeleteRoutine } from '&/modules/routine/hooks'
import type { Routine } from '&/modules/routine/types'

interface Props {
  routine: Routine
}

export function RoutineNavbar({ routine }: Props) {
  const [deleteModaleIsOpen, setDeleteModaleIsOpen] = useState(false)
  const { onDeleteRoutine } = useDeleteRoutine()
  const { handleArchiveRoutine } = useArchiveRoutine()

  const onDelete = () => onDeleteRoutine(routine)
  const onArchive = () => handleArchiveRoutine(routine)

  return (
    <>
      <DetailsNavbar>
        <div>
          <ItemMenu onDelete={() => setDeleteModaleIsOpen(true)} onArchive={onArchive} />
        </div>
        <div>
          <CloseNavBtn />
        </div>
        <ConfirmDeleteModale
          isOpen={deleteModaleIsOpen}
          onDelete={onDelete}
          close={() => setDeleteModaleIsOpen(false)}
          title="Delete Routine"
          description="Are you sure you want to delete this routine? This action cannot be undone."
        />
      </DetailsNavbar>
    </>
  )
}
