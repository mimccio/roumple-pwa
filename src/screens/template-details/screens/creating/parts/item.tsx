import { motion } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

import { CreationStatusItem } from '&/modules/template/types'
import { ItemSpinner } from './item-spinner'
import { cl } from '&/common/utils'

interface Props {
  name: string
  status: CreationStatusItem
}

export function Item({ status, name }: Props) {
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
            Creating <span className="lower-case">{name}</span>
          </span>
        </>
      )}
      {status.isDone && (
        <>
          <span className="w-6">
            <CheckIcon className="w-5 text-green-500" />
          </span>
          <span>
            <span className="capitalize">{name}</span> created
          </span>
        </>
      )}
      {status.isError && (
        <>
          <span className="w-6">
            <XMarkIcon className="w-5 text-red-500" />
          </span>
          <span>
            Error Creating <span className="lower-case">{name}</span>
          </span>
        </>
      )}
    </motion.p>
  )
}
