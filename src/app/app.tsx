import { Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { inject } from '@vercel/analytics'
import { Toaster } from 'react-hot-toast'

import { ThemeProvider } from '@/common/contexts/theme'
import { CATEGORY_LIST } from '@/modules/category/constants'
import { editCategory } from '@/modules/category/mutations'
import { Login } from '@/screens/login'
import { TemplateDetailsScreen } from '@/screens/template-details'
import { WelcomeScreen } from '@/screens/welcome'
import { AuthenticatedApp } from './components/authenticated-app'
import { Fallback } from './components/fallback'
import { appLoader, loginLoader, logoutLoader, onboardingLoader } from './loaders'

import '@/assets/fonts/fonts.css'
import './i18n'
import './styles.css'

inject({ debug: false })

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 3, // 3 days
      staleTime: 1000 * 60 * 10, // 10 min
      retry: 1,
      throwOnError: false,
      refetchOnWindowFocus: false,
    },
    // mutations: { networkMode: 'offlineFirst' },
  },
})

// we need a default mutation function so that paused mutations can resume after a page reload
queryClient.setMutationDefaults([CATEGORY_LIST], {
  mutationFn: async (category) => {
    // to avoid clashes with our optimistic update when an offline mutation continues
    await queryClient.cancelQueries({ queryKey: [CATEGORY_LIST] })
    return editCategory(category)
  },
})

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* redirect to board if auth */}
      <Route path="login/*" element={<Login />} loader={loginLoader} />
      {/* redirect to login after logout */}
      <Route path="logout" loader={logoutLoader} />
      {/* Onboarding */}
      <Route path="welcome/:templateId/*" element={<TemplateDetailsScreen />} loader={onboardingLoader} />
      <Route path="welcome/*" element={<WelcomeScreen />} loader={onboardingLoader} />
      {/* redirect home to today */}
      <Route path="/" element={<Navigate to="today" />} />
      {/* redirect to login if NO auth */}
      <Route path="*" element={<AuthenticatedApp />} loader={appLoader} />
    </>
  )
)

export function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        // resume mutations after initial restore from localStorage was successful
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries()
        })
      }}
    >
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <Suspense fallback={<Fallback />}>
          <RouterProvider router={router} />
          <Toaster position="bottom-center" />
        </Suspense>
      </ThemeProvider>
      <ReactQueryDevtools />
    </PersistQueryClientProvider>
  )
}
