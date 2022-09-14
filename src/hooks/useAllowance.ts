import { BigNumber } from 'ethers'
import { useAccount, useQuery } from 'wagmi'

import { CDAI } from '../constants'
import useDaiContract from './useDaiContract'

const useAllowance = () => {
  const { address } = useAccount()
  const contract = useDaiContract()

  const response = useQuery<BigNumber>(
    ['allowance', address],
    async () => {
      return contract.allowance(address, CDAI.address)
    },
    { enabled: !!address }
  )

  return response
}

/**
 * Exports
 */

export default useAllowance
