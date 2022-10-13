import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, theme } from '@twitt-duck/ui'
import { Provider, store } from '@twitt-duck/state'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
)
