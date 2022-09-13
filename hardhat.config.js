/** @type import('hardhat/config').HardhatUserConfig */

require('@nomiclabs/hardhat-ethers')

module.exports = {
  solidity: '0.8.9',
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: 'https://rinkeby.infura.io/v3/674b516cea814fc79d06e5e917ba1a11',
      },
    },
  },
}
