import React from 'react'
import ReactDOM from 'react-dom/client'
import { UIProvider, theme } from '@twitt-duck/ui'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UIProvider theme={theme}>
      <App />
    </UIProvider>
  </React.StrictMode>
)
