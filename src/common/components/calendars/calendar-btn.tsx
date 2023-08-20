import type { ScheduleType } from '&/common/types'
import { cl, getScheduleTypeBg } from '&/common/utils'

interface Props {
  scheduleType: ScheduleType
  close: () => void
}

export function CalendarBtn({ scheduleType, close }: Props) {
  const bg = getScheduleTypeBg(scheduleType)

  return (
    <div className="flex justify-end gap-x-4 p-2">
      <button
        onClick={() => close()}
        className={cl('rounded-md border px-3 py-1 text-gray-50 transition-colors  hover:text-white', bg)}
      >
        ok
      </button>
    </div>
  )
}
