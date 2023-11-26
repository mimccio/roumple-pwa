import { ENTRY_TYPES } from '../constants'
import { CreationStatus, EntryType } from '../types'

export const getEntryTypeIsDone = ({ entryType, status }: { entryType: EntryType; status: CreationStatus }) =>
  (entryType === ENTRY_TYPES.routine && status.routines.isDone) ||
  (entryType === ENTRY_TYPES.task && status.tasks.isDone) ||
  (entryType === ENTRY_TYPES.note && status.notes.isDone)
