import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DocumentDuplicateIcon, UserIcon } from '@heroicons/react/24/outline'

import { SettingsHeader } from './settings-header'
import { Section } from './parts/section'

export function SettingsMain() {
  const { t } = useTranslation(['login', 'settings', 'template'])
  return (
    <>
      <SettingsHeader />
      <div className="mt-6 flex w-full flex-col gap-y-8 px-2 xl:px-4">
        <Section title={t('Templates', { ns: 'template' })} Icon={DocumentDuplicateIcon}>
          <Link
            to="/templates"
            className="group flex items-center gap-x-2 font-semibold text-indigo-500 transition-colors hover:text-indigo-600"
          >
            {t('View templates', { ns: 'settings' })}
          </Link>
        </Section>

        <Section title={t('Account', { ns: 'settings' })} Icon={UserIcon}>
          <Link
            to="/logout"
            className="mt-2 inline-block rounded-md bg-gray-100 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-800"
          >
            {t('logout', { ns: 'login' })}
          </Link>
        </Section>
      </div>
    </>
  )
}
