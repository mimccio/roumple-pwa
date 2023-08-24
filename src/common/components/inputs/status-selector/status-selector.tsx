import type { Status } from '&/common/types'
import { STATUSES } from '&/common/constants'
import { TodoBtn, InProgressBtn, DoneBtn } from './parts'

interface Props {
  status: Status
  onSelect: (status: Status) => void
}

export function StatusSelector({ status, onSelect }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-md transition-colors">
      <TodoBtn handleClick={() => onSelect(STATUSES.todo)} isSelected={status === STATUSES.todo || !status} />
      <InProgressBtn handleClick={() => onSelect(STATUSES.inProgress)} isSelected={status === STATUSES.inProgress} />
      <DoneBtn showCheck handleClick={() => onSelect(STATUSES.done)} isSelected={status === STATUSES.done} />
    </div>
  )
}
