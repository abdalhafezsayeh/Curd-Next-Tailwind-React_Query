import { store } from '@/redux/store';
import '@/styles/globals.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux';


const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store} >

       <Component {...pageProps} />
       <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </Provider> 
    </QueryClientProvider>
  )
}
