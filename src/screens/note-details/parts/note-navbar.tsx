import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DetailsNavbar } from '@/common/components/layouts'
import { BackNavBtn, CloseNavBtn } from '@/common/components/buttons'
import { ItemMenu } from '@/common/components/menus'
import { ConfirmDeleteModale } from '@/common/components/modales/confirm-delete-modale'

import type { Note } from '@/modules/note/types'
import { useDeleteNote } from '@/modules/note/hooks'
import { useParams } from 'react-router-dom'
import { useMainPath } from '@/common/hooks'

interface Props {
  note: Note
}

export function NoteNavbar({ note }: Props) {
  const { routineId, taskId } = useParams()
  const { t } = useTranslation(['common', 'note'])
  const [deleteModaleIsOpen, setDeleteModaleIsOpen] = useState(false)
  const { onDelete } = useDeleteNote()
  const handleDelete = () => onDelete(note)
  const mainPath = useMainPath()

  const getBackUrl = () => {
    if (routineId) return `${mainPath}/d/routine/${routineId}`
    if (taskId) return `${mainPath}/d/task/${taskId}`
    return null
  }

  const backUrl = getBackUrl()

  return (
    <DetailsNavbar>
      <h4 className="text-sm font-semibold text-gray-500">{t('note', { ns: 'common' })}</h4>
      <div className="relative flex gap-x-2">
        <ItemMenu onDelete={() => setDeleteModaleIsOpen(true)} withCopyLink />

        {backUrl ? <BackNavBtn to={backUrl} /> : <CloseNavBtn />}
      </div>
      <ConfirmDeleteModale
        isOpen={deleteModaleIsOpen}
        onDelete={handleDelete}
        close={() => setDeleteModaleIsOpen(false)}
        title={t('deleteNote', { ns: 'note' })}
        description={t('confirmDeleteNote', { ns: 'note' })}
      />
    </DetailsNavbar>
  )
}
