import { Navigate, Route, createRoutesFromElements } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import { Login } from '&/screens/login'
import { AuthenticatedApp } from './authenticated-app'
import { appLoader, loginLoader, logoutLoader } from './loaders'
import './styles.css'
import '../assets/fonts/fonts.css'
import { CATEGORY_LIST } from '&/modules/category/constants'
import { editCategory } from '&/modules/category/mutations'

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 2000,
      retry: 1,
      useErrorBoundary: false,
      refetchOnWindowFocus: false,
    },
    mutations: { networkMode: 'offlineFirst' },
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
      {/* redirect to login on logout */}
      <Route path="logout" loader={logoutLoader} />
      {/* redirect to today */}
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
      <RouterProvider router={router} />
      <Toaster position="bottom-center" />
      <ReactQueryDevtools />
    </PersistQueryClientProvider>
  )
}
