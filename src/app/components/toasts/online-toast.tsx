import { SignalIcon } from '@heroicons/react/24/outline'

export function OnlineToast() {
  return (
    <div className=" flex items-center gap-x-3 rounded-lg bg-white py-3 pl-2 pr-4 shadow-md">
      <SignalIcon width={20} className="text-green-400" />
      <span className="text-gray-800">Back online</span>
    </div>
  )
}
