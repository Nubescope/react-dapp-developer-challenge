/** @type import('hardhat/config').HardhatUserConfig */
import '@nomiclabs/hardhat-ethers'

import ensureEnv from './src/helpers/ensureEnv'

require('dotenv').config()

const INFURA_API_KEY = ensureEnv('INFURA_API_KEY')

const config = {
  solidity: '0.8.9',
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      },
    },
  },
}

export default config
