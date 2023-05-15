import { Navigate, Route, createRoutesFromElements } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import { Login } from '&/screens/login'
import { AuthenticatedApp } from './authenticated-app'
import { appLoader, loginLoader, logoutLoader } from './loaders'
import './styles.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
      staleTime: 1000 * 60 * 60, // 1h
      retry: 1,
      useErrorBoundary: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
