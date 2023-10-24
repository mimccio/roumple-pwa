import { useTranslation } from 'react-i18next'
import { fr, enUS } from 'date-fns/locale'

import type { Language } from '../types'
import { LANGUAGES } from '../constants'

const locales = {
  fr: fr,
  en: enUS,
}

export function useGetDateFnsLocale() {
  const { i18n } = useTranslation()

  const getDateFnsLocale = () => {
    const language =
      i18n.language || window.localStorage.i18nextLng || window.navigator.language.slice(0, 2) || LANGUAGES.en
    let lang = language as Language
    if (!Object.prototype.hasOwnProperty.call(LANGUAGES, language)) lang = LANGUAGES.en
    return locales[lang]
  }

  return { locale: getDateFnsLocale() }
}
