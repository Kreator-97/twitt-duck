import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, theme, UIProvider } from '@twitt-duck/ui'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UIProvider>
        <App />
      </UIProvider>
    </ChakraProvider>
  </React.StrictMode>
)
