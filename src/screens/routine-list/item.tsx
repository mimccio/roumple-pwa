import { FlagIcon } from '@heroicons/react/24/solid'

interface Props {
  name: string
  category?: { name: string; color: string }
  priority?: number
}

export function Item({ name, category, priority }: Props) {
  return (
    <li className="flex h-14 items-center justify-between px-2">
      <div>
        <div className="h-3 w-3 rounded-full bg-indigo-500" />
      </div>
      <div className="mx-4 h-full w-full border-b">
        <p className="capitalize text-gray-800">{name}</p>
        <p className="text-sm font-semibold text-gray-400">category</p>
      </div>
      <div className="pr-2">
        <FlagIcon width={24} className="text-indigo-500" />
      </div>
    </li>
  )
}
