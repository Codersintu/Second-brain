import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { SkeletonTheme } from 'react-loading-skeleton'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
     <BrowserRouter>
    <App />
    </BrowserRouter>
    </SkeletonTheme>
  </StrictMode>,
)
