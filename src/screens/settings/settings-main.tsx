import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SettingsHeader } from './settings-header'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'

export function SettingsMain() {
  const { t } = useTranslation(['login', 'settings'])
  return (
    <>
      <SettingsHeader />
      <div className="mt-8 w-full px-4">
        <div className="flex justify-end">
          <Link to="/logout" className="rounded-md border p-2">
            {t('logout', { ns: 'login' })}
          </Link>
        </div>
        <div className="mt-8">
          <Link to="/templates" className="group flex items-center gap-x-2">
            <DocumentDuplicateIcon className="w-5 text-gray-500 group-hover:text-indigo-400" />
            <span className="group-hover:text-indigo-500">{t('View templates', { ns: 'settings' })}</span>
          </Link>
        </div>
      </div>
    </>
  )
}
