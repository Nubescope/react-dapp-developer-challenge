import cdaiAbi from '../assets/abi/cdai.json'
import daiAbi from '../assets/abi/dai.json'

/**
 * Token Addresses (Rinkeby)
 */

const RINKEBY_NETWORK_ID = 4

const DAI_ADDRESS = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'
const CDAI_ADDRESS = '0x6D7F0754FFeb405d23C51CE938289d4835bE3b14'

/**
 * Exports
 */

export const IS_TEST = process.env.NEXT_PUBLIC_TEST_MODE === 'true'

export const DEFAULT_NETWORK_ID = RINKEBY_NETWORK_ID

export const CDAI = {
  address: CDAI_ADDRESS,
  abi: cdaiAbi,
}

export const DAI = {
  address: DAI_ADDRESS,
  abi: daiAbi,
}
