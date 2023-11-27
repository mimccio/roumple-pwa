import { useTranslation } from 'react-i18next'

import type { Language } from '@/common/types'
import { LANGUAGES } from '@/common/constants'
import { useGetLanguage } from '@/common/hooks'
import toast from 'react-hot-toast'

const LANGUAGE_OPTIONS = [
  { value: LANGUAGES.en, text: 'English' },
  { value: LANGUAGES.fr, text: 'Français' },
]

export function useSelectLanguage() {
  const { i18n } = useTranslation()
  const language = useGetLanguage()
  const handleSelectLanguage = (newLang: Language) => {
    i18n.changeLanguage(newLang, (error, t) => {
      if (error) {
        toast.error(t('editLangError', { ns: 'error' }))
      } else {
        document.documentElement.lang = newLang
      }
    })
  }

  return {
    handleSelectLanguage,
    language,
    LANGUAGE_OPTIONS,
  }
}
