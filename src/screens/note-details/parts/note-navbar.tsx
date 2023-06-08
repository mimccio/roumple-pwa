import { useState } from 'react'

import { DetailsNavbar } from '&/common/components/layouts'
import { CloseNavBtn } from '&/common/components/buttons'
import { ItemMenu } from '&/common/components/menus'
import { ConfirmDeleteModale } from '&/common/components/confirm-delete-modale'

import type { Note } from '&/modules/note/types'

interface Props {
  note: Note
}

export function NoteNavbar({ note }: Props) {
  const [deleteModaleIsOpen, setDeleteModaleIsOpen] = useState(false)

  return (
    <>
      <DetailsNavbar>
        <div>
          <ItemMenu onDelete={() => console.log('Delete')} />
        </div>
        <div>
          <CloseNavBtn />
        </div>
        <ConfirmDeleteModale
          isOpen={deleteModaleIsOpen}
          onDelete={() => console.log('Delete')}
          close={() => setDeleteModaleIsOpen(false)}
          title="Delete Note"
          description="Are you sure you want to delete this note? This action cannot be undone."
        />
      </DetailsNavbar>
    </>
  )
}
