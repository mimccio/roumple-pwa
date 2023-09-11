import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowPathRoundedSquareIcon, CheckCircleIcon, DocumentTextIcon, TagIcon } from '@heroicons/react/24/outline'

import welcomeImg from '&/assets/illustrations/welcome.png'
import { CreateRoutineModale } from '&/modules/routine/components'
import { useRoutineList } from '&/modules/routine/hooks'
import { useTaskList } from '&/modules/task/hooks'
import { CreateTaskModale } from '&/modules/task/components'
import { useCreateNote } from '&/modules/note/hooks'
import { Link } from 'react-router-dom'

export function WelcomeScreen() {
  const { t } = useTranslation('welcome')
  const { onOpenCreate: openRoutine, onCloseCreate: closeRoutine, createIsOpen: routineIsOpen } = useRoutineList()
  const { onOpenCreate: openTask, onCloseCreate: closeTask, createIsOpen: taskIsOpen } = useTaskList()
  const { onCreate: onCreateNote } = useCreateNote()

  return (
    <div className="relative mt-8 flex w-full flex-1 flex-col items-center p-4">
      <h2 className="mb-8 text-center text-lg font-bold text-gray-600">{t('title')}</h2>

      <motion.img
        src={welcomeImg}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.75, scale: 1 }}
        transition={{ duration: 0.75 }}
        className="mx-auto flex h-52 w-52 items-center justify-center opacity-75"
      />

      <ul className="mt-12 flex flex-col gap-y-2">
        <motion.li
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <button className="group flex items-start gap-2 p-2" onClick={openTask}>
            <CheckCircleIcon width={20} className="mt-0.5 text-gray-400 transition-colors group-hover:text-gray-500" />
            <span className="font-semibold text-gray-600 transition-colors group-hover:text-gray-700">
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
              className="mt-0.5 text-gray-400 transition-colors group-hover:text-gray-500"
            />
            <span className="font-semibold text-gray-600 transition-colors group-hover:text-gray-700">
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
            <DocumentTextIcon width={20} className="mt-0.5 text-gray-400 transition-colors group-hover:text-gray-500" />
            <span className="font-semibold text-gray-600 transition-colors group-hover:text-gray-700">
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
            <TagIcon width={20} className="mt-0.5 text-gray-400 transition-colors group-hover:text-gray-500" />
            <span className="font-semibold text-gray-600 transition-colors group-hover:text-gray-700">
              {t('firstCategory')}
            </span>
          </Link>
        </motion.li>
      </ul>
      <CreateRoutineModale isOpen={routineIsOpen} close={closeRoutine} />
      <CreateTaskModale isOpen={taskIsOpen} close={closeTask} />
    </div>
  )
}
