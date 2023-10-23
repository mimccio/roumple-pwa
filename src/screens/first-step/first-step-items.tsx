import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowPathRoundedSquareIcon, CheckCircleIcon, DocumentTextIcon, TagIcon } from '@heroicons/react/24/outline'

import { CreateRoutineModale } from '&/modules/routine/components'
import { useRoutineList } from '&/modules/routine/hooks'
import { useTaskList } from '&/modules/task/hooks'
import { CreateTaskModale } from '&/modules/task/components'
import { useCreateNote } from '&/modules/note/hooks'
import { Link } from 'react-router-dom'

export function FirstStepItems() {
  const { t } = useTranslation('first-step')
  const { onOpenCreate: openRoutine, onCloseCreate: closeRoutine, createIsOpen: routineIsOpen } = useRoutineList()
  const { onOpenCreate: openTask, onCloseCreate: closeTask, createIsOpen: taskIsOpen } = useTaskList()
  const { onCreate: onCreateNote } = useCreateNote()

  return (
    <>
      <ul className="flex flex-col gap-y-2 py-12">
        <motion.li
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <button className="group flex items-start gap-2 p-2" onClick={openTask}>
            <CheckCircleIcon
              width={20}
              className="mt-0.5 text-gray-400 transition-colors group-hover:text-indigo-400"
            />
            <span className="font-semibold text-gray-600 transition-colors group-hover:text-indigo-500">
              {t('firstTask')}
            </span>
          </button>
        </motion.li>

        <motion.li
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <button className="group flex items-start gap-2 p-2" onClick={openRoutine}>
            <ArrowPathRoundedSquareIcon
              width={20}
              className="mt-0.5 text-gray-400 transition-colors group-hover:text-indigo-400"
            />
            <span className="font-semibold text-gray-600 transition-colors group-hover:text-indigo-500">
              {t('firstRoutine')}
            </span>
          </button>
        </motion.li>

        <motion.li
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <button className="group flex items-start gap-2 p-2" onClick={onCreateNote}>
            <DocumentTextIcon
              width={20}
              className="mt-0.5 text-gray-400 transition-colors group-hover:text-indigo-400"
            />
            <span className="font-semibold text-gray-600 transition-colors group-hover:text-indigo-500">
              {t('firstNote')}
            </span>
          </button>
        </motion.li>

        <motion.li
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <Link to="/categories" className="group flex items-start gap-2 p-2">
            <TagIcon width={20} className="mt-0.5 text-gray-400 transition-colors group-hover:text-indigo-400" />
            <span className="font-semibold text-gray-600 transition-colors group-hover:text-indigo-500">
              {t('firstCategory')}
            </span>
          </Link>
        </motion.li>
      </ul>
      <CreateRoutineModale isOpen={routineIsOpen} close={closeRoutine} />
      <CreateTaskModale isOpen={taskIsOpen} close={closeTask} />
    </>
  )
}
