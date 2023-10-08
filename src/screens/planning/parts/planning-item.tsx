import { Link } from 'react-router-dom'

import { TW_COLOR_BG_600_HOVER } from '&/common/constants/tw-colors'
import { cl, getTwBgColor } from '&/common/utils'
import { Routine } from '&/modules/routine/types'
import { Task } from '&/modules/task/types'
import { getItemUrl } from '../utils'

interface Props {
  date: Date
  item: Routine | Task
}

export function PlanningItem({ date, item }: Props) {
  const color = item.category?.color
  const bg = color ? getTwBgColor(500, color) : 'bg-gray-100'

  return (
    <Link
      to={getItemUrl(item)}
      state={{ date }}
      className={cl(
        'block w-full truncate rounded-sm px-0.5 text-left text-xs font-medium transition-colors ',
        color ? 'text-white' : 'text-gray-700 ',
        bg,
        color ? TW_COLOR_BG_600_HOVER[color] : 'hover:bg-gray-200'
      )}
    >
      {item.name}
    </Link>
  )
}
