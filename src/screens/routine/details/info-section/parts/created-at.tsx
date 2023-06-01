import { format } from 'date-fns'

interface Props {
  createdAt: Date
}

export function CreatedAt({ createdAt }: Props) {
  const displayedDate = format(new Date(createdAt), 'd MMMM yyyy')

  return (
    <p className="text-xs text-gray-300 transition-colors hover:text-gray-400">
      created the <span>{displayedDate}</span>
    </p>
  )
}
