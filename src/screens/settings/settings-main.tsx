import { Link } from 'react-router-dom'
import { SettingsHeader } from './settings-header'

export function SettingsMain() {
  return (
    <>
      <SettingsHeader />
      <div className="mt-8 w-full px-4">
        <Link to="/logout" className="rounded-md border p-2">
          Logout
        </Link>
      </div>
    </>
  )
}
