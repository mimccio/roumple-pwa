import { atom } from 'jotai'
import type { Category } from './types'

export const categoryAtom = atom<Category | null>(null)
