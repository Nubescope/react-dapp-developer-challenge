import { useEffect, useState } from 'react'
import { useAccount, useContract, useProvider } from 'wagmi'

import { CDAI } from '../constants'
import formatBigNumber from '../lib/formatters/formatBigNumber'

const useCdaiUnderlyingBalance = () => {
  const [result, setResult] = useState<string>()
  const { address } = useAccount()
  const provider = useProvider()

  const contract = useContract({
    addressOrName: CDAI.address,
    contractInterface: CDAI.abi,
    signerOrProvider: provider,
  })

  useEffect(() => {
    const run = async () => {
      const res = await contract.callStatic.balanceOfUnderlying(address)

      setResult(formatBigNumber(res, 4))
    }

    if (contract && address) {
      run()
    }
  }, [contract, address])

  return result
}

export default useCdaiUnderlyingBalance
