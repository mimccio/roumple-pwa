import { RoutineNoteByNote, RoutineNoteByRoutine } from '@/modules/routine-note/types'

export function sortRoutineNoteByRoutineList(a: RoutineNoteByRoutine, b: RoutineNoteByRoutine) {
  if (!a.note.title && !b.note.title) {
    return 0
  }
  if (!a.note.title) {
    return 1
  }
  if (!b.note.title) {
    return -1
  }
  if (a.note.title < b.note.title) {
    return -1
  }
  if (a.note.title > b.note.title) {
    return 1
  }
  return 0
}

export function sortRoutineNoteByNoteList(a: RoutineNoteByNote, b: RoutineNoteByNote) {
  if (!a.routine.name && !b.routine.name) {
    return 0
  }
  if (!a.routine.name) {
    return 1
  }
  if (!b.routine.name) {
    return -1
  }
  if (a.routine.name < b.routine.name) {
    return -1
  }
  if (a.routine.name > b.routine.name) {
    return 1
  }
  return 0
}
