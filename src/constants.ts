import cdaiAbi from '../assets/abi/cdai.json'
import daiAbi from '../assets/abi/dai.json'

// Goerli
// const DAI_ADDRESS = '0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60'
// const CDAI_ADDRESS = '0x822397d9a55d0fefd20f5c4bcab33c5f65bd28eb'

// Rinkeby
const DAI_ADDRESS = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'
const CDAI_ADDRESS = '0x6D7F0754FFeb405d23C51CE938289d4835bE3b14'

export const CDAI = {
  address: CDAI_ADDRESS,
  abi: cdaiAbi,
}

export const DAI = {
  address: DAI_ADDRESS,
  abi: daiAbi,
}
