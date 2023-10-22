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
    // cache: { enabled: true }, // TODO: enable cache
    fallbackNS: 'common',
    ns: [
      'action',
      'category',
      'common',
      'empty',
      'error',
      'feedback',
      'first-step',
      'login',
      'message',
      'note',
      'priority',
      'routine',
      'schedule',
      'settings',
      'status',
      'task',
      'template',
      'welcome',
    ],
  })
