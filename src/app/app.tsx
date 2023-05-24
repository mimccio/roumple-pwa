import { Navigate, Route, createRoutesFromElements } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, MutationCache } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster, toast } from 'react-hot-toast'

import { Login } from '&/screens/login'
import { AuthenticatedApp } from './authenticated-app'
import { appLoader, loginLoader, logoutLoader } from './loaders'
import './styles.css'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { LIST, ROUTINE } from '&/modules/routine/constants'
import { editRoutineDetails } from '&/modules/routine/mutations'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // networkMode: 'offlineFirst',
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 2000,
      retry: 0,
      useErrorBoundary: false,
      refetchOnWindowFocus: false,
    },
    // mutations: {
    //   networkMode: 'offlineFirst',
    // },
  },
  // configure global cache callbacks to show toast notifications
  // mutationCache: new MutationCache({
  //   onSuccess: (data: any) => {
  //     console.log('data :', data)
  //     toast.success(data.routine.name)
  //   },
  //   onError: (error: any) => {
  //     toast.error('blouuuououou' + error.message)
  //   },
  // }),
})

// we need a default mutation function so that paused mutations can resume after a page reload
queryClient.setMutationDefaults([ROUTINE, LIST, { archived: false }], {
  mutationFn: async (routine) => {
    // to avoid clashes with our optimistic update when an offline mutation continues
    await queryClient.cancelQueries({ queryKey: [ROUTINE, routine.id] })
    return editRoutineDetails(routine)
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
