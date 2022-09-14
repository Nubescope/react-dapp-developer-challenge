import { useContract, useProvider } from 'wagmi'

import { DAI } from '../constants'

const useDaiContract = () => {
  const provider = useProvider()

  return useContract({
    addressOrName: DAI.address,
    contractInterface: DAI.abi,
    signerOrProvider: provider,
  })
}

export default useDaiContract
