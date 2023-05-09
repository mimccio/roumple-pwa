import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

interface Props {
  isOpen: boolean
  toggle: () => void
}

export function MenuButton({ isOpen, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className="absolute bottom-4 left-4 z-50 flex h-12 w-12  items-center justify-center rounded-full bg-gradient-to-br from-sky-300 from-15% via-purple-300 via-30% to-indigo-400 to-80% text-gray-50 md:hidden"
    >
      {isOpen ? <XMarkIcon width={24} /> : <Bars3Icon width={24} />}
    </button>
  )
}
