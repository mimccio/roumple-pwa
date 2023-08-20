import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    load: 'languageOnly',
    fallbackLng: 'en',
    // debug: import.meta.env.MODE === 'development',
    // cache: { enabled: true },
    fallbackNS: 'common',
    ns: [
      'common',
      'action',
      'category',
      'empty',
      'error',
      'login',
      'note',
      'priority',
      'routine',
      'schedule',
      'status',
      'task',
      'message',
    ],
  })
