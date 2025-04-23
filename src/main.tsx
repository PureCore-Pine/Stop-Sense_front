import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/App.css';

import './i18n'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <App />
    </React.Suspense>
  </React.StrictMode>,
)
