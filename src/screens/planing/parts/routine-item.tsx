import { Link } from 'react-router-dom'
import type { TwColor } from '&/common/types'
import { TW_COLOR_BG_200_HOVER } from '&/common/constants/tw-colors'
import { cl, getTwBgColor } from '&/common/utils'

interface Props {
  name: string
  id: string
  color?: TwColor
  date: Date
}

export function RoutineLargeItem({ id, name, color = 'gray', date }: Props) {
  const bg = getTwBgColor(100, color)

  const url = `/routines/d/routine/${id}`
  return (
    <li key={id}>
      <Link
        to={url}
        state={{ date }}
        className={cl(
          'block w-full truncate rounded-sm px-0.5 text-xs font-medium text-gray-700 transition-colors hover:text-gray-900',
          bg,
          TW_COLOR_BG_200_HOVER[color]
        )}
      >
        {name}
      </Link>
    </li>
  )
}
