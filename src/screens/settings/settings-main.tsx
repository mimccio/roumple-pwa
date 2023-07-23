import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SettingsHeader } from './settings-header'

export function SettingsMain() {
  const { t } = useTranslation('login')
  return (
    <>
      <SettingsHeader />
      <div className="mt-8 w-full px-4">
        <Link to="/logout" className="rounded-md border p-2">
          {t('logout')}
        </Link>
      </div>
    </>
  )
}
