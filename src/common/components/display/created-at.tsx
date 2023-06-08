import { cl } from '&/common/utils'
import { format } from 'date-fns'

interface Props {
  createdAt?: Date
}

export function CreatedAt({ createdAt }: Props) {
  const displayedDate = createdAt ? format(new Date(createdAt), 'd MMMM yyyy') : null

  return (
    <p className={cl('text-right text-xs text-gray-300', !displayedDate && 'opacity-0')}>
      created the <span>{displayedDate}</span>
    </p>
  )
}
