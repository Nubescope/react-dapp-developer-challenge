import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { useMemo } from 'react'
import { useContractRead, useProvider } from 'wagmi'

import { CDAI } from '../constants'

/**
 * Constants
 */

const blocksPerDay = 6570 // 13.15 seconds per block
const daysPerYear = 365

/**
 * useCdaiSupplyApy
 */

const useCdaiSupplyApy = () => {
  const provider = useProvider()
  const cDaiContractInfo = {
    addressOrName: CDAI.address,
    contractInterface: CDAI.abi,
    signerOrProvider: provider,
  }

  const response = useContractRead({
    ...cDaiContractInfo,
    functionName: 'supplyRatePerBlock',
  })

  const apy = useMemo(() => {
    const ratePerBlock = response?.data
    if (ratePerBlock) {
      return calculateApy(+formatUnits(ratePerBlock as unknown as BigNumber))
    }

    return undefined
  }, [response.data])

  return {
    ...response,
    data: apy,
  }
}

/**
 * Helpers
 */

function calculateApy(ratePerBlock: number): number {
  const apy = Math.pow(ratePerBlock * blocksPerDay + 1, daysPerYear) - 1

  return !isNaN(apy) && isFinite(apy) ? +apy.toFixed(5) : 0
}

/**
 * Exports
 */

export default useCdaiSupplyApy
