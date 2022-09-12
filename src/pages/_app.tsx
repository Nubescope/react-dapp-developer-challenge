import '../globals.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'

import wagmi from '../helpers/wagmi'

/**
 * Apollo
 */

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/33349/cdai-rinkeby-subgraph/0.0.2',
  cache: new InMemoryCache(),
})

/**
 * MyApp
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <WagmiConfig client={wagmi}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
