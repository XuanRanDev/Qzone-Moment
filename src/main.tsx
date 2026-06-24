import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Mobile browsers restore the previous scroll offset on history navigation
// (including the back swipe gesture), fighting our own scroll-to-top reset.
// Taking manual control makes our reset authoritative.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
