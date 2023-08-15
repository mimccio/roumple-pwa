import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DetailsNavbar } from '&/common/components/layouts'
import { CloseNavBtn } from '&/common/components/buttons'
import { ItemMenu } from '&/common/components/menus'
import { ConfirmDeleteModale } from '&/common/components/modales/confirm-delete-modale'
import { useArchiveRoutine, useDeleteRoutine } from '&/modules/routine/hooks'
import type { Routine } from '&/modules/routine/types'
import { LinkNote } from './link-note'
import { ActivityBtn } from './activity-btn'

interface Props {
  routine?: Routine
  isLoading: boolean
}

export function RoutineNavbar({ routine, isLoading }: Props) {
  const { t } = useTranslation(['common', 'routine'])
  const [deleteModaleIsOpen, setDeleteModaleIsOpen] = useState(false)
  const [linkSelectorIsOpen, setLinkSelectorIsOpen] = useState(false)

  const { onDeleteRoutine } = useDeleteRoutine()
  const { handleArchiveRoutine } = useArchiveRoutine()

  const onArchive = routine ? () => handleArchiveRoutine(routine) : undefined

  return (
    <DetailsNavbar>
      <h4 className="text-sm font-semibold text-gray-500">{t('routine', { ns: 'common' })}</h4>
      <div className="flex gap-x-2">
        <ItemMenu
          onDelete={() => setDeleteModaleIsOpen(true)}
          onArchive={onArchive}
          onLinkNote={() => setLinkSelectorIsOpen(true)}
          isLoading={isLoading}
          isArchived={routine?.archived}
        />
        <ActivityBtn />
        <CloseNavBtn />
      </div>
      {routine && (
        <ConfirmDeleteModale
          isOpen={deleteModaleIsOpen}
          onDelete={() => onDeleteRoutine(routine)}
          close={() => setDeleteModaleIsOpen(false)}
          title={t('deleteRoutine', { ns: 'routine' })}
          description={t('confirmDeleteRoutine', { ns: 'routine' })}
        />
      )}
      <LinkNote isOpen={linkSelectorIsOpen} close={() => setLinkSelectorIsOpen(false)} />
    </DetailsNavbar>
  )
}
