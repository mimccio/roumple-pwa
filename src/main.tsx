// import './app/wdyr'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { toast } from 'react-hot-toast'
import { App } from './app'
import { ToastOfflineReady, ToastRefresh } from './common/components/toasts'

const updateSW = registerSW({
  onNeedRefresh() {
    toast.custom((toast) => <ToastRefresh toast={toast} onUpdate={updateSW} />, {
      duration: Infinity,
      position: 'top-center',
    })
  },
  onOfflineReady() {
    toast.custom((toast) => <ToastOfflineReady toast={toast} />, { duration: Infinity, position: 'top-center' })
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
