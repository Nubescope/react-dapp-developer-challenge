import { useContract } from 'wagmi'

import { CDAI } from '../constants'

const useCdaiContract = () => {
  const contract = useContract({
    addressOrName: CDAI.address,
    contractInterface: CDAI.abi,
  })

  return contract
}

/**
 * Exports
 */

export default useCdaiContract
