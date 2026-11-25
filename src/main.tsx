import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Private admin page at yoursora.shop/#admin. Loaded separately so shoppers never download it.
const AdminApp = lazy(() => import('./admin/AdminApp.tsx'))
const isAdmin = window.location.hash.replace(/^#\/?/, '').toLowerCase() === 'admin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
