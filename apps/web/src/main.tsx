import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, theme } from '@twitt-duck/ui'
import { Provider, store } from '@twitt-duck/state'

import App from './App'
import { SWRConfig } from 'swr'

const fetcher = (url:string, options: RequestInit) => fetch(url, options).then(res => res.json())

const options = {
  fetcher,
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <SWRConfig value={options}>
          <App />
        </SWRConfig>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
)
