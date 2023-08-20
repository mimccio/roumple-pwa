import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { Tooltip } from '../tooltip'

interface Props {
  to: string
}

export function BackNavBtn({ to }: Props) {
  const { t } = useTranslation('action')
  return (
    <Tooltip message={t('back')}>
      <Link
        to={to}
        className="group flex h-8 w-8 items-center justify-center rounded-md border border-transparent transition-colors hover:border-gray-200"
      >
        <ArrowUturnLeftIcon
          className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-500"
          aria-hidden="true"
        />
      </Link>
    </Tooltip>
  )
}
