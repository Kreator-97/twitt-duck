import ReactDOM from 'react-dom/client'
import { ChakraProvider, theme } from '@twitt-duck/ui'
import { Provider, SocketProvider, store } from '@twitt-duck/state'
import { SWRConfig } from 'swr'

import App from './App'

const fetcher = (url:string, options: RequestInit) => fetch(url, options).then(res => res.json())

const options = { fetcher }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <SWRConfig value={options}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </SWRConfig>
    </Provider>
  </ChakraProvider>
)
