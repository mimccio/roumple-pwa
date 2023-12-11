import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router'

import { AppError } from '@/screens/errors'
import { FeedbackScreen } from '@/screens/feedback'
import { FirstStepScreen } from '@/screens/first-step'
import { Menu, MenuButton } from '@/screens/menu'
import { PlanningScreen } from '@/screens/planning/planning-screen'
import { TemplateDetailsScreen } from '@/screens/template-details'
import { TemplatesScreen } from '@/screens/templates'
import { useOfflineToast } from '../hooks'
import { FetchingSpinner, OfflineIndicator } from './indicators'
import { DetailsScreen, MainScreen } from './screens'

export function AuthenticatedApp() {
  useOfflineToast()
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const toggleMenu = () => setMenuIsOpen((prevState) => !prevState)

  return (
    <ErrorBoundary fallback={<AppError />}>
      <div className="relative flex min-h-screen overflow-hidden ">
        <Menu close={toggleMenu} isOpen={menuIsOpen} />
        <MenuButton isOpen={menuIsOpen} toggle={toggleMenu} />
        <FetchingSpinner />
        <OfflineIndicator />

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
