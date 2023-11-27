import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import { LANGUAGES } from '@/common/constants'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    load: 'languageOnly',
    fallbackLng: 'en',
    // debug: import.meta.env.MODE === 'development',
    cache: { enabled: import.meta.env.MODE === 'production' },
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

const lang = i18next.language || window.localStorage.i18nextLng || window.navigator.language || LANGUAGES.en
document.documentElement.lang = lang.slice(0, 2)
