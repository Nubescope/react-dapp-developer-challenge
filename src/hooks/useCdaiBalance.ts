import { formatUnits } from 'ethers/lib/utils'
import { useContractRead } from 'wagmi'

import { CDAI } from '../constants'

const useCdaiBalance = (address?: string) => {
  const { data: balance } = useContractRead({
    addressOrName: CDAI.address,
    contractInterface: CDAI.abi,
    functionName: 'balanceOf',
    args: address,
  })

  return balance ? formatUnits(balance) : undefined
}

/**
 * Exports
 */

export default useCdaiBalance
