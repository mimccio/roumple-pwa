import { Link } from 'react-router-dom'
import { Tooltip } from '../tooltip'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useMainPath } from '&/common/hooks'

interface Props {
  to?: string
}

export function CloseNavBtn({ to }: Props) {
  const mainPath = useMainPath()

  return (
    <Tooltip message="close">
      <Link
        to={to || mainPath}
        className="group flex h-8 w-8 items-center justify-center rounded-md border border-transparent transition-colors hover:border-gray-200"
      >
        <XMarkIcon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-500" aria-hidden="true" />
      </Link>
    </Tooltip>
  )
}
