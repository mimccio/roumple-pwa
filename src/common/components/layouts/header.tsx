import { ReactNode } from 'react'
import { cl } from '&/common/utils'
import { useAtom } from 'jotai'

import { TW_COLOR_BORDER_500 } from '&/common/constants'
import { categoryAtom } from '&/modules/category/atoms'

interface Props {
  children: ReactNode
}

export function Header({ children }: Props) {
  const [category] = useAtom(categoryAtom)

  return (
    <header
      className={cl(
        'flex h-14 w-full items-center justify-between border-b-4 px-2 transition-colors xl:px-4',
        category?.color ? TW_COLOR_BORDER_500[category.color] : 'border-gray-200'
      )}
    >
      {children}
    </header>
  )
}
