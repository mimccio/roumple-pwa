import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { LoadingSpinner } from '&/common/components/spinners'
import { useSetOnboarded } from '&/modules/auth/hooks'

export function NoTemplate() {
  const { t } = useTranslation('welcome')
  const { onSetOnboarded } = useSetOnboarded()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const onStart = async () => {
    setIsLoading(true)
    await onSetOnboarded()
    navigate('/first-step')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, translateY: 100 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ duration: 0.75, delay: 0.2 }}
      className="px-4 py-8"
    >
      <AnimatePresence>
        {!isLoading && (
          <motion.div exit={{ opacity: 0, scale: 0.3, transition: { duration: 0.3 } }}>
            <button
              onClick={onStart}
              className="mt-8 rounded-lg bg-indigo-500 px-3 py-4 text-xl font-semibold text-white shadow-xl transition-all hover:bg-indigo-600 hover:shadow-lg sm:px-8"
            >
              {t('Start to organize your life')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <LoadingSpinner isLoading={isLoading} />
    </motion.div>
  )
}
