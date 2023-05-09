import { SettingsHeader } from './settings-header'

export function SettingsMain() {
  return (
    <>
      <SettingsHeader />
      <div className="mt-4 w-full px-4">
        <button className="rounded-md border p-2">Logout</button>
      </div>
    </>
  )
}
