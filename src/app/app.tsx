import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { Login } from '&/screens/login'
import { AuthenticatedApp } from './authenticated-app'
import './styles.css'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* redirect to board if auth */}
        <Route path="login" element={<Login />} loader={undefined} />
        {/* redirect to login if NO auth */}
        <Route path="*" element={<AuthenticatedApp />} loader={undefined} />
      </Routes>
    </BrowserRouter>
  )
}
