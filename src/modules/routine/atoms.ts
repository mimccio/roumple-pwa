import { atom } from 'jotai'
import type { SortType } from './types'
import { SORT_TYPES } from './constants'

export const routineSortTypeAtom = atom<SortType>(SORT_TYPES.priority)

export const routineGroupByScheduleAtom = atom(false)
