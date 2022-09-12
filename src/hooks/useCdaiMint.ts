import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { CDAI } from '../constants'

const useCdaiMint = () => {
  const { config } = usePrepareContractWrite({
    addressOrName: CDAI.address,
    contractInterface: CDAI.abi,
    functionName: 'mint',
    args: '0',
  })

  return useContractWrite(config)
}

export default useCdaiMint
