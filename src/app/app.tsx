import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Login } from '&/screens/login'
import { AuthenticatedApp } from './authenticated-app'
import './styles.css'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* redirect to board if auth */}
          <Route path="login" element={<Login />} loader={undefined} />
          {/* redirect to login if NO auth */}
          <Route path="*" element={<AuthenticatedApp />} loader={undefined} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
