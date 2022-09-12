import { BigNumber } from 'ethers'
import { useAccount, useQuery } from 'wagmi'

import useDaiContract from './useDaiContract'

const useDaiBalance = () => {
  const { address } = useAccount()
  const contract = useDaiContract()

  const response = useQuery<BigNumber>(
    ['balanceOf', address],
    async () => {
      return contract.balanceOf(address)
    },
    { enabled: !!address }
  )

  return response
}

export default useDaiBalance
