import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DocumentDuplicateIcon, LanguageIcon, UserIcon } from '@heroicons/react/24/outline'

import { LanguageSelector } from '@/common/components/inputs/language-selector'
import { ContentLayout } from '@/common/components/layouts'
import { Section } from './parts/section'
import { SettingsHeader } from './parts/settings-header'

export function SettingsMain() {
  const { t } = useTranslation(['login', 'settings', 'template'])

  return (
    <>
      <SettingsHeader />
      <ContentLayout>
        <div className="mt-4 flex w-full flex-col gap-y-8 px-2 xl:px-4">
          <Section title={t('Language', { ns: 'settings' })} Icon={LanguageIcon}>
            <div className="flex w-full flex-wrap items-center gap-x-8 gap-y-2">
              <span className="whitespace-nowrap">{t('Select language', { ns: 'settings' })}</span>
              <LanguageSelector />
            </div>
          </Section>
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
              className="mt-2 inline-block rounded-md bg-gray-50 px-4 py-2 font-semibold text-gray-700 shadow-md transition-colors hover:bg-gray-100 hover:text-gray-800"
            >
              {t('logout', { ns: 'login' })}
            </Link>
          </Section>
        </div>
      </ContentLayout>
    </>
  )
}
