import { useTranslation } from 'react-i18next'

import type { Language } from '../types'
import { LANGUAGES } from '../constants'

export function useGetLanguage() {
  const { i18n } = useTranslation()
  const lang = i18n.language || window.localStorage.i18nextLng || window.navigator.language || LANGUAGES.en

  let language = lang.slice(0, 2) as Language
  if (!Object.prototype.hasOwnProperty.call(LANGUAGES, language)) language = LANGUAGES.en

  return language
}
