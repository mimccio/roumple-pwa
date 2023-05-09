import { Cog6ToothIcon } from '@heroicons/react/20/solid'

export function SettingsHeader() {
  return (
    <header className="flex h-14 w-full items-center justify-between border-b-4 border-gray-200 px-2">
      <div className="text flex h-full items-center text-xl font-bold leading-6 text-gray-500">
        <Cog6ToothIcon width={20} className="text-gray-500" />

        <h1 className="ml-2 pb-1">Settings</h1>
      </div>
    </header>
  )
}
