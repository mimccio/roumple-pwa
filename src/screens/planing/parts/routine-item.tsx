import { Link } from 'react-router-dom'
import type { TwColor } from '&/common/types'
import { TW_COLOR_BG_600_HOVER } from '&/common/constants/tw-colors'
import { cl, getTwBgColor } from '&/common/utils'

interface Props {
  name: string
  id: string
  color?: TwColor
  date: Date
}

export function RoutineLargeItem({ id, name, color, date }: Props) {
  const bg = color ? getTwBgColor(500, color) : 'bg-gray-100'

  const url = `/routines/d/routine/${id}`
  return (
    <li key={id}>
      <Link
        to={url}
        state={{ date }}
        className={cl(
          'block w-full truncate rounded-sm px-0.5 text-left text-xs font-medium transition-colors ',
          color ? 'text-white' : 'text-gray-700 ',
          bg,
          color ? TW_COLOR_BG_600_HOVER[color] : 'hover:bg-gray-200'
        )}
      >
        {name}
      </Link>
    </li>
  )
}
