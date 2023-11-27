import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ItemMenu } from '@/common/components/menus'
import { ConfirmDeleteModale } from '@/common/components/modales'
import { LinkNote } from '@/common/components/forms'

import type { Routine } from '@/modules/routine/types'
import { useArchiveRoutine, useDeleteRoutine, useEditRoutineShowChecklist } from '@/modules/routine/hooks'
import { useCreateRoutineNote } from '@/modules/routine-note/hooks'

import { ActivityBtn } from './activity-btn'
import { EditOccurrence } from './edit-occurrence'
import { SelectDateBtn } from './select-date-btn'

interface Props {
  routine: Routine
  date: Date
  handleDateChange: (date: Date) => void
}

export function NavbarContent({ routine, date, handleDateChange }: Props) {
  const { t } = useTranslation(['common', 'routine'])
  const [deleteModaleIsOpen, setDeleteModaleIsOpen] = useState(false)
  const [linkSelectorIsOpen, setLinkSelectorIsOpen] = useState(false)
  const [editOccurrenceIsOpen, setEditOccurrenceIsOpen] = useState(false)
  const { onDeleteRoutine } = useDeleteRoutine()
  const { handleArchiveRoutine } = useArchiveRoutine()
  const { onCreateRoutineNote } = useCreateRoutineNote(routine)
  const { toggleShowChecklist } = useEditRoutineShowChecklist()

  return (
    <>
      <ItemMenu
        onDelete={() => setDeleteModaleIsOpen(true)}
        onArchive={() => handleArchiveRoutine(routine)}
        onLinkNote={() => setLinkSelectorIsOpen(true)}
        isArchived={routine?.archived}
        onEditOccurrence={() => setEditOccurrenceIsOpen(true)}
        onToggleShowChecklist={() => toggleShowChecklist(routine.showChecklist)}
        withCopyLink
        checklistIsDisplayed={routine.showChecklist}
      />
      <SelectDateBtn date={date} handleDateChange={handleDateChange} scheduleType={routine.scheduleType} />
      <ActivityBtn />

      <ConfirmDeleteModale
        isOpen={deleteModaleIsOpen}
        onDelete={() => onDeleteRoutine(routine)}
        close={() => setDeleteModaleIsOpen(false)}
        title={t('deleteRoutine', { ns: 'routine' })}
        description={t('confirmDeleteRoutine', { ns: 'routine' })}
      />
      <LinkNote
        isOpen={linkSelectorIsOpen}
        close={() => setLinkSelectorIsOpen(false)}
        onLinkNote={onCreateRoutineNote}
      />
      <EditOccurrence routine={routine} isOpen={editOccurrenceIsOpen} close={() => setEditOccurrenceIsOpen(false)} />
    </>
  )
}
