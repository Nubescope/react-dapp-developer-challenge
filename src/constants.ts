import cdaiAbi from '../assets/abi/cdai.json'
import daiAbi from '../assets/abi/dai.json'

/**
 * Rinkeby Addresses
 */

const DAI_ADDRESS = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'
const CDAI_ADDRESS = '0x6D7F0754FFeb405d23C51CE938289d4835bE3b14'

/**
 * Exports
 */

export const CDAI = {
  address: CDAI_ADDRESS,
  abi: cdaiAbi,
}

export const DAI = {
  address: DAI_ADDRESS,
  abi: daiAbi,
}
