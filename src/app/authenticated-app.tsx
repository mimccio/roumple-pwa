import { useState } from 'react'

import { Menu, MenuButton } from '&/screens/menu'
import { DetailsScreen } from './details-screen'
import { MainScreen } from './main-screen'

export function AuthenticatedApp() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const toggleMenu = () => setMenuIsOpen((prevState) => !prevState)

  return (
    <div className="relative flex h-full min-h-screen w-full bg-white text-gray-800">
      <Menu isOpen={menuIsOpen} />
      <MenuButton isOpen={menuIsOpen} toggle={toggleMenu} />

      <div className="w-full">
        <div className=" relative h-full w-full lg:flex">
          <MainScreen />
          <DetailsScreen />
        </div>
      </div>

      {/* <div className="w-full">
        <Routes>
          <Route path="/full" element={<p>Full screen route</p>} />
          <Route path="*" element={<Panels />} />
        </Routes>
      </div> */}
    </div>
  )
}
