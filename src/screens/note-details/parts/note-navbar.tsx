import { useState } from 'react'

import { DetailsNavbar } from '&/common/components/layouts'
import { BackNavBtn, CloseNavBtn } from '&/common/components/buttons'
import { ItemMenu } from '&/common/components/menus'
import { ConfirmDeleteModale } from '&/common/components/confirm-delete-modale'

import type { Note } from '&/modules/note/types'
import { useDeleteNote } from '&/modules/note/hooks'
import { useParams } from 'react-router-dom'
import { useMainPath } from '&/common/hooks'

interface Props {
  note: Note
}

export function NoteNavbar({ note }: Props) {
  const { routineId } = useParams()
  const [deleteModaleIsOpen, setDeleteModaleIsOpen] = useState(false)
  const { onDelete } = useDeleteNote()
  const handleDelete = () => onDelete(note)
  const mainPath = useMainPath()
  const routineUrl = `${mainPath}/d/routine/${routineId}`

  return (
    <>
      <DetailsNavbar>
        <div>
          <ItemMenu onDelete={() => setDeleteModaleIsOpen(true)} />
        </div>
        <div>{routineId ? <BackNavBtn to={routineUrl} /> : <CloseNavBtn />}</div>
        <ConfirmDeleteModale
          isOpen={deleteModaleIsOpen}
          onDelete={handleDelete}
          close={() => setDeleteModaleIsOpen(false)}
          title="Delete Note"
          description="Are you sure you want to delete this note? This action cannot be undone."
        />
      </DetailsNavbar>
    </>
  )
}
