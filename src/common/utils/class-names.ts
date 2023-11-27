import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type Style = string | null | false

export function classNames(...classes: Style[]) {
  return classes.filter(Boolean).join(' ')
}

export const cl = classNames

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
