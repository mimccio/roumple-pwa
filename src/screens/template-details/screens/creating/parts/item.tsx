import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

import { CreationStatusItem } from '@/modules/template/types'
import { ItemSpinner } from './item-spinner'
import { cl } from '@/common/utils'

interface Props {
  name: string
  status: CreationStatusItem
  feminine?: boolean
}

export function Item({ status, name, feminine }: Props) {
  const { t } = useTranslation('template')

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <motion.p
      variants={itemVariants}
      className={cl(' flex items-center gap-x-4', !status.isLoading && !status.isDone && !status.isError && '-mt-4')}
    >
      {status.isLoading && (
        <>
          <ItemSpinner />
          <span className="text-gray-600">
            {t('Creating')} <span className="lowercase">{name}</span>
          </span>
        </>
      )}

      {status.isDone && (
        <>
          <span className="w-6">
            <CheckIcon className="w-5 text-green-500" />
          </span>
          <span>
            <span>{name}</span> {t('created', { context: feminine ? 'female' : 'male' })}
          </span>
        </>
      )}
      {status.isError && (
        <>
          <span className="w-6">
            <XMarkIcon className="w-5 text-red-500" />
          </span>
          <span>
            {t('Error creating')} <span className="lowercase">{name}</span>
          </span>
        </>
      )}
    </motion.p>
  )
}
