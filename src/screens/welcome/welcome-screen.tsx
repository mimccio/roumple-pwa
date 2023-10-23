import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

import welcomeImg from '&/assets/illustrations/welcome.png'
import { useGetTemplates } from '&/modules/template/hooks'
import { AppError } from '&/screens/errors'
import { BlankItem } from './parts/blank-item'
import { TemplateItem, TemplateItemSkeleton } from '&/modules/template/components'

export function WelcomeScreen() {
  const { t } = useTranslation('welcome')
  const { templateList, isLoading, error } = useGetTemplates()

  return (
    <div className="relative mx-auto flex h-full min-h-screen w-full max-w-7xl flex-col items-center justify-center gap-y-12 px-4 pb-8 pt-16 text-gray-600">
      <motion.h1
        initial={{ translateY: -50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="py-2 text-center text-4xl font-semibold text-indigo-500"
      >
        {t('Welcome to')}{' '}
        <span className="bg-gradient-to-r from-emerald-500 via-pink-400 to-indigo-500 bg-clip-text text-transparent">
          Roumple
        </span>
      </motion.h1>
      <motion.img
        src={welcomeImg}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.75 }}
        className="mx-auto flex h-52 w-52 items-center justify-center opacity-50"
      />
      <motion.h2
        initial={{ translateY: 20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="mb-4 text-xl font-semibold text-gray-500"
      >
        {t('Start blank or use a template')}
      </motion.h2>

      {Boolean(error) && <AppError />}

      <motion.div
        initial={{ translateY: 100, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8"
      >
        {isLoading && (
          <>
            <TemplateItemSkeleton />
            <TemplateItemSkeleton />
            <TemplateItemSkeleton />
          </>
        )}

        {templateList && (
          <>
            <BlankItem />
            {templateList?.map((template) => (
              <TemplateItem key={template.id} template={template} />
            ))}
          </>
        )}
      </motion.div>
      <div className="flex max-h-24 grow" />
    </div>
  )
}
