import { fr, enUS } from 'date-fns/locale'

import { useGetLanguage } from '.'

const locales = {
  fr: fr,
  en: enUS,
}

export function useGetDateFnsLocale() {
  const language = useGetLanguage()
  return { locale: locales[language] }
}
