import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

import deliveryImg from '&/assets/illustrations/delivery.png'
import { FirstStepItems } from './first-step-items'

export function FirstStepScreen() {
  const { t } = useTranslation('first-step')

  return (
    <div className="relative mb-20 flex w-full flex-1 flex-col items-center justify-center px-4 pb-8  pt-16">
      <motion.h1
        initial={{ translateY: -50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="mb-12 text-center text-2xl font-semibold  text-indigo-500"
      >
        {t('title')}
      </motion.h1>

      <motion.img
        src={deliveryImg}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.75, scale: 1 }}
        transition={{ duration: 0.75 }}
        className="mx-auto flex h-52 w-52 items-center justify-center opacity-75"
      />
      <FirstStepItems />
      <div className="flex max-h-28 grow" />
    </div>
  )
}
