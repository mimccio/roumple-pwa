import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PresentationChartBarIcon } from '@heroicons/react/24/outline'

import { useMainPath } from '@/common/hooks'
import { Tooltip } from '@/common/components/tooltip'
import { cl } from '@/common/utils'

export function ActivityBtn() {
  const { t } = useTranslation('common')
  const { routineId, activity } = useParams()
  const mainPath = useMainPath()
  const url = activity ? `${mainPath}/d/routine/${routineId}` : 'activity'

  return (
    <Tooltip message={t('activity')}>
      <Link
        to={url}
        className="group flex h-8 w-8 items-center justify-center rounded-md border border-transparent transition-colors hover:border-gray-200"
      >
        <PresentationChartBarIcon
          className={cl(
            'h-5 w-5  transition-colors ',
            activity ? 'text-green-400 group-hover:text-green-500' : 'text-gray-400 group-hover:text-gray-500'
          )}
          aria-hidden="true"
        />
      </Link>
    </Tooltip>
  )
}
