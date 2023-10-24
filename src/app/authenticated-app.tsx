import { useState } from 'react'
import { Route, Routes } from 'react-router'
import { ErrorBoundary } from 'react-error-boundary'

import { FetchingSpinner } from '&/common/components/fetching-spinner'
import { AppError } from '&/screens/errors'
import { PlanningScreen } from '&/screens/planning/planning-screen'
import { FeedbackScreen } from '&/screens/feedback'
import { Menu, MenuButton } from '&/screens/menu'
import { FirstStepScreen } from '&/screens/first-step'
import { TemplatesScreen } from '&/screens/templates'
import { TemplateDetailsScreen } from '&/screens/template-details'

import { DetailsScreen } from './details-screen'
import { MainScreen } from './main-screen'
import { OfflineBanner } from './offline-banner'

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

        <div className="absolute bottom-0 left-0 right-0 top-0 h-full overflow-y-auto md:left-72 xl:left-80">
          <Routes>
            <Route
              path="planning/*"
              element={
                <div className="relative flex flex-1 ">
                  <PlanningScreen />
                </div>
              }
            />
            <Route path="feedback/*" element={<FeedbackScreen />} />
            <Route path="first-step/*" element={<FirstStepScreen />} />
            <Route path="templates/:templateId/*" element={<TemplateDetailsScreen />} />
            <Route path="templates/*" element={<TemplatesScreen />} />

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
      </div>
    </ErrorBoundary>
  )
}
