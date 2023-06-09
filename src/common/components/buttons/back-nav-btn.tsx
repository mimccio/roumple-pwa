import { Link } from 'react-router-dom'
import { Tooltip } from '../tooltip'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

interface Props {
  to: string
}

export function BackNavBtn({ to }: Props) {
  return (
    <Tooltip message="back">
      <Link
        to={to}
        className="group flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 transition-colors hover:border-gray-300"
      >
        <ArrowUturnLeftIcon
          className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-500"
          aria-hidden="true"
        />
      </Link>
    </Tooltip>
  )
}
