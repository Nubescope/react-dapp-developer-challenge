import { chain, configureChains, createClient } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import { IS_TEST } from '../constants'
import { mockConnector } from '../helpers/test-helpers/utils'

/**
 * Constants
 */

const { chains, provider, webSocketProvider } = IS_TEST
  ? configureChains(
      [chain.hardhat],
      [
        jsonRpcProvider({
          rpc: (chain_) => ({
            http: chain_.rpcUrls.default,
          }),
        }),
      ]
    )
  : configureChains(
      [chain.rinkeby],
      [
        alchemyProvider({
          // This is Alchemy's default API key.
          // You can get your own at https://dashboard.alchemyapi.io
          apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
        }),
        publicProvider(),
      ]
    )

const connectors = IS_TEST
  ? [mockConnector]
  : [
      new MetaMaskConnector({
        chains,
        options: { UNSTABLE_shimOnConnectSelectAccount: true },
      }),
      new CoinbaseWalletConnector({ chains, options: { appName: 'TBD' } }),
      new WalletConnectConnector({ chains, options: {} }),
    ]

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

/**
 * Exports
 */

export default client
