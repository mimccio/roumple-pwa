import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { CreationStatus, Template } from '&/modules/template/types'
import { Item } from './parts/item'
import { TitleSpinner } from './parts/title-spinner'
import { useNavigateToEntry } from '&/modules/template/hooks'

interface Props {
  template: Template
  status: CreationStatus
}

export function Creating({ status, template }: Props) {
  const { t } = useTranslation(['common', 'template'])
  useNavigateToEntry({ status, template })

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,

      transition: {
        delay: 0.2,
        duration: 0.2,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="flex h-full min-h-screen w-full flex-col pt-40">
      <motion.h1
        initial={{ translateY: -50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="flex items-center justify-center gap-x-2 text-2xl font-semibold"
      >
        <span className="text-gray-600">{t('creatingFromTemplate', { ns: 'template' })}</span>
        <span className="font-bold text-indigo-500">{template.name}</span>
      </motion.h1>
      <div className="mt-20 flex justify-center">
        <TitleSpinner />
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto mt-28 flex w-full max-w-xl flex-col gap-y-4"
      >
        <Item status={status.categories} name={t('categories', { ns: 'common' })} feminine />
        <Item status={status.routines} name={t('routines', { ns: 'common' })} feminine />
        <Item status={status.routineChecklists} name={t('routinesChecklists', { ns: 'template' })} feminine />
        <Item status={status.tasks} name={t('tasks', { ns: 'common' })} feminine />
        <Item status={status.taskChecklists} name={t('tasksChecklists', { ns: 'template' })} feminine />
        <Item status={status.noteFolders} name={t('noteFolders', { ns: 'template' })} />
        <Item status={status.notes} name={t('notes', { ns: 'common' })} feminine />
        <Item status={status.routineNotes} name={t('routinesLinkedNotes', { ns: 'template' })} feminine />
        <Item status={status.taskNotes} name={t('tasksLinkedNotes', { ns: 'template' })} feminine />
      </motion.div>
    </div>
  )
}
