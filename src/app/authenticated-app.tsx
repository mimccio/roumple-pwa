import { useState } from 'react'

import { Menu, MenuButton } from '&/screens/menu'
import { DetailsScreen } from './details-screen'
import { MainScreen } from './main-screen'
import { FetchingSpinner } from '&/common/components/fetching-spinner'

export function AuthenticatedApp() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const toggleMenu = () => setMenuIsOpen((prevState) => !prevState)

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-white text-gray-800">
      <Menu close={toggleMenu} isOpen={menuIsOpen} />
      <MenuButton isOpen={menuIsOpen} toggle={toggleMenu} />
      <FetchingSpinner />

      <div className="relative flex flex-1 ">
        <MainScreen />
        <DetailsScreen />
      </div>
    </div>
  )
}
