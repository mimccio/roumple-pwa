import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { FetchingSpinner } from '&/common/components/fetching-spinner'
import { AppError } from '&/screens/errors'
import { Menu, MenuButton } from '&/screens/menu'
import { DetailsScreen } from './details-screen'
import { MainScreen } from './main-screen'
import { OfflineBanner } from './offline-banner'
import { PlaningScreen } from '&/screens/planing/planing-screen'
import { Route, Routes } from 'react-router'
import { FeedbackScreen } from '&/screens/feedback'

export function AuthenticatedApp() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const toggleMenu = () => setMenuIsOpen((prevState) => !prevState)

  return (
    <ErrorBoundary fallback={<AppError />}>
      <OfflineBanner />
      <div className="relative flex min-h-screen overflow-hidden bg-white text-gray-800">
        <Menu close={toggleMenu} isOpen={menuIsOpen} />
        <MenuButton isOpen={menuIsOpen} toggle={toggleMenu} />
        <FetchingSpinner />

        <Routes>
          <Route
            path="planing/*"
            element={
              <div className="relative flex flex-1 ">
                <PlaningScreen />
              </div>
            }
          />
          <Route path="feedback/*" element={<FeedbackScreen />} />

          <Route
            path="*"
            element={
              <div className="relative flex flex-1 ">
                <MainScreen />
                <DetailsScreen />
              </div>
            }
          />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}
