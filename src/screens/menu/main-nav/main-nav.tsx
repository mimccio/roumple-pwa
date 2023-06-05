import { ArrowPathRoundedSquareIcon, Cog6ToothIcon, TagIcon } from '@heroicons/react/20/solid'

import { NavItem } from './nav-item'

interface Props {
  close: () => void
}

export function MainNav({ close }: Props) {
  return (
    <section className="flex flex-col gap-1 border-b py-4">
      <NavItem close={close} name="Routines" to="routines" Icon={ArrowPathRoundedSquareIcon} />
      <NavItem close={close} name="Categories" to="categories" Icon={TagIcon} />
      <NavItem close={close} name="Settings" to="settings" Icon={Cog6ToothIcon} />
    </section>
  )
}
