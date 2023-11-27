import { v5 as uuidv5 } from 'uuid'
import { getUserId } from '@/modules/utils'

import { ENTRY_TYPES } from '../constants'
import { EntryType } from '../types'

function getPathList({
  entryType,
  entryNoteFolderId,
  userId,
}: {
  entryType: EntryType
  entryNoteFolderId?: string | null
  userId: string
}) {
  if (entryType === ENTRY_TYPES.routine) return 'routines'
  if (entryType === ENTRY_TYPES.task) return 'tasks'
  if (entryType === ENTRY_TYPES.note) return `notes/${uuidv5(entryNoteFolderId || 'inbox', userId)}`
}

function getPathItem(entryType: EntryType) {
  if (entryType === ENTRY_TYPES.routine) return 'routine'
  if (entryType === ENTRY_TYPES.task) return 'task'
  if (entryType === ENTRY_TYPES.note) return 'note'
}

export async function getEntryPath({
  entryType,
  entryId,
  entryNoteFolderId,
}: {
  entryType: EntryType
  entryId: string
  entryNoteFolderId?: string | null
}) {
  const userId = await getUserId()

  const list = getPathList({ entryType, entryNoteFolderId, userId })
  const item = getPathItem(entryType)
  return `/${list}/d/${item}/${uuidv5(entryId, userId)}`
}
