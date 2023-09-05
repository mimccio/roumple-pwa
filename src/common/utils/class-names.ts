type Style = string | null | false

export function classNames(...classes: Style[]) {
  return classes.filter(Boolean).join(' ')
}

export const cl = classNames
