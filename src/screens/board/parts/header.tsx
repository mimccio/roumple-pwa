import { ReactNode } from 'react'
import { useAtom } from 'jotai'
import { TagIcon, CheckBadgeIcon, ClockIcon } from '@heroicons/react/24/solid'
import { CheckBadgeIcon as CheckBadgeOutlineIcon, ClockIcon as ClockOutlineIcon } from '@heroicons/react/24/outline'

import type { ScheduleType } from '&/common/types'
import { TW_COLOR_BORDER_500, TW_COLOR_TEXT_500 } from '&/common/constants'
import { Tooltip } from '&/common/components/tooltip'
import { cl, getScheduleTypeTextColor } from '&/common/utils'
import { getGroupHoverPeriodColor, getPeriodColor } from '&/modules/routine/utils'
import { categoryAtom } from '&/modules/category/atoms'

interface Props {
  title: ReactNode
  showDone: boolean
  showPeriod: boolean
  handleDoneChange: () => void
  scheduleType: ScheduleType
  handleShowPeriod: () => void
}

export function Header({ title, showDone, handleDoneChange, showPeriod, scheduleType, handleShowPeriod }: Props) {
  const [category, setCategory] = useAtom(categoryAtom)
  const periodColor = getPeriodColor(scheduleType)
  const hoverPeriodColor = getGroupHoverPeriodColor(scheduleType)
  const titleTextColor = getScheduleTypeTextColor(scheduleType)

  return (
    <header
      className={cl(
        'flex h-14 w-full items-center justify-between border-b-4 px-2 transition-colors xl:px-4',
        category?.color ? TW_COLOR_BORDER_500[category.color] : 'border-gray-200'
      )}
    >
      <h1 className={cl('text flex h-full items-center text-xl font-bold leading-6', titleTextColor)}>{title}</h1>
      <div className="flex gap-1">
        <Tooltip message={showPeriod ? 'hide period' : 'show period'}>
          <button
            onClick={handleShowPeriod}
            className="group p-2"
            aria-label={showPeriod ? 'hide period' : 'show period'}
          >
            {showPeriod ? (
              <ClockIcon width={20} className={cl('transition-colors', periodColor, hoverPeriodColor)} />
            ) : (
              <ClockOutlineIcon width={20} className={cl('text-gray-400 transition-colors', hoverPeriodColor)} />
            )}
          </button>
        </Tooltip>

        <Tooltip message={showDone ? 'show to do' : 'show done'}>
          <button onClick={handleDoneChange} className="group p-2" aria-label={showDone ? 'show to do' : 'show done'}>
            {showDone ? (
              <CheckBadgeIcon width={20} className="text-green-500 transition-colors group-hover:text-gray-300" />
            ) : (
              <CheckBadgeOutlineIcon
                width={20}
                className="text-gray-400 transition-colors group-hover:text-green-300"
              />
            )}
          </button>
        </Tooltip>
        <button
          disabled={!category}
          onClick={() => setCategory(null)}
          className="p-2"
          aria-label="clear category filter"
        >
          <TagIcon
            width={20}
            className={cl('transition-colors', category?.color ? TW_COLOR_TEXT_500[category.color] : 'text-gray-300')}
          />
        </button>
      </div>
    </header>
  )
}
