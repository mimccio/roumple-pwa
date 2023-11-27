import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { LanguageIcon } from '@heroicons/react/24/outline'

import welcomeImg from '@/assets/illustrations/welcome.png'
import { LoadingSpinner } from '@/common/components/spinners'
import { useToggleOpen } from '@/common/hooks'
import { LanguageSelector } from '@/common/components/inputs/language-selector'

import { useGetTemplates } from '@/modules/template/hooks'
import { TemplateItem } from '@/modules/template/components'

import { BlankItem } from './parts/blank-item'
import { NoTemplate } from './parts/no-template'

export function WelcomeScreen() {
  const { t } = useTranslation('welcome')
  const { isLoading, templateList } = useGetTemplates()
  const { toggle, isOpen } = useToggleOpen()

  return (
    <div className="mx-auto flex h-full min-h-screen w-full max-w-7xl flex-col items-center gap-y-12 px-4 pb-8 pt-32 text-gray-600">
      <div className="absolute right-4 top-4 flex items-center gap-x-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.7, transition: { duration: 0.1 } }}
              style={{ originX: 1 }}
            >
              <div className="w-40">
                <LanguageSelector />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={toggle}
          className="rounded-lg p-3 text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-500 hover:shadow-md "
        >
          <LanguageIcon className="w-5 " />
        </button>
      </div>
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
      <LoadingSpinner isLoading={isLoading} />

      {templateList && templateList?.length >= 1 && (
        <>
          <motion.h2
            initial={{ translateY: 20, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mb-4 text-xl font-semibold text-gray-500"
          >
            {t('Start blank or use a template')}
          </motion.h2>

          <motion.div
            initial={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8"
          >
            <BlankItem />
            {templateList?.map((template) => (
              <TemplateItem key={template.id} template={template} />
            ))}
          </motion.div>
        </>
      )}

      {!isLoading && !templateList?.length && <NoTemplate />}
    </div>
  )
}
