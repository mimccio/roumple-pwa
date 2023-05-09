import sciencesImg from '&/assets/illustrations/sciences.png'

export function SettingsDetails() {
  return (
    <div className="flex h-4/5 flex-col items-center justify-center gap-4">
      <img
        src={sciencesImg}
        alt="Not found"
        className="mx-auto flex h-52 w-52 items-center justify-center opacity-25"
      />
      <p className="text-center text-sm font-semibold text-gray-200">Settings</p>
    </div>
  )
}
