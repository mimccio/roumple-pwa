import { useTranslation } from 'react-i18next'

import type { Language } from '&/common/types'
import { LANGUAGES } from '&/common/constants'

const LANGUAGE_OPTIONS = [
  { value: LANGUAGES.en, text: 'English' },
  { value: LANGUAGES.fr, text: 'Français' },
]

export function useSelectLanguage() {
  const { i18n } = useTranslation()
  const language = i18n.language || window.localStorage.i18nextLng || window.navigator.language
  const handleSelectLanguage = (newLang: Language) => i18n.changeLanguage(newLang)

  return {
    handleSelectLanguage,
    language,
    LANGUAGE_OPTIONS,
  }
}
