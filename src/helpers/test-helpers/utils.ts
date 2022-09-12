import { providers, Wallet } from 'ethers'
import { allChains, Chain, chain as chainMap, createClient, CreateClientConfig } from 'wagmi'
import { MockConnector } from 'wagmi/connectors/mock'

/**
 * Constants
 */

const HARDHAT_ACCOUNT_0_PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const addressRegex = /^0x[a-fA-F0-9]{40}/

/**
 * Types
 */

type Config = Partial<CreateClientConfig>

/**
 * Utils
 */

class EthersProviderWrapper extends providers.StaticJsonRpcProvider {
  toJSON() {
    return `<Provider network={${this.network.chainId}} />`
  }
}

const getNetwork = (chain: Chain) => {
  return {
    chainId: chain.id,
    ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    name: chain.name,
  }
}

const getProvider = ({ chainId }: { chains?: Chain[]; chainId?: number } = {}) => {
  const chain = allChains.find((x) => x.id === chainId) ?? chainMap.hardhat
  const url = chainMap.hardhat.rpcUrls.default

  const provider = new EthersProviderWrapper(url, getNetwork(chain))
  provider.pollingInterval = 1_000

  return Object.assign(provider, { chains: allChains })
}

const getSigners = () => {
  const provider = getProvider({ chainId: 1 })
  const wallet = new Wallet(HARDHAT_ACCOUNT_0_PRIVATE_KEY)
  return [provider.getSigner(wallet.address)]
}

export const mockConnector = new MockConnector({
  options: {
    signer: getSigners()[0],
    flags: { isAuthorized: false },
  },
})

const setupClient = (config: Config = {}) => {
  return createClient({
    connectors: [mockConnector],
    provider: getProvider(),
    ...config,
  })
}

/**
 * Exports
 */

export { addressRegex, getNetwork, getProvider, getSigners, setupClient }
