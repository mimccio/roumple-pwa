import { atom } from 'jotai'
import type { SortType } from './types'
import { SORT_TYPES } from './constants'

export const sortTypeAtom = atom<SortType>(SORT_TYPES.date)
