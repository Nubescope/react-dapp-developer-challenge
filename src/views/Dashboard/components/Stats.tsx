import { Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react'
import React from 'react'
import { useAccount } from 'wagmi'

import useCdaiSupplyApy from '../../../hooks/useCdaiApy'
import useCdaiBalance from '../../../hooks/useCdaiBalance'
import useCdaiUnderlyingBalance from '../../../hooks/useCdaiUnderlyingBalance'

/**
 * Stats
 */

const Stats: React.FC = () => {
  const { address } = useAccount()
  const underlyingBalance = useCdaiUnderlyingBalance()
  const apy = useCdaiSupplyApy()
  const cdaiBalance = useCdaiBalance(address)

  return (
    <StatGroup flexDir={['column', 'column', 'row']} mb="10">
      <Stat w="100%" mr={[0, 0, 5]} mb={[2, 2, 0]} p="3" border="1px solid" rounded="8" size="sm">
        <StatLabel color="GrayText" fontWeight="bold">
          SUPPLY BALANCE
        </StatLabel>
        <StatNumber>{underlyingBalance ? `$ ${underlyingBalance}` : 'Loading...'}</StatNumber>
      </Stat>
      <Stat w="100%" mr={[0, 0, 5]} mb={[2, 2, 0]} p="3" border="1px solid" rounded="8" size="sm">
        <StatLabel color="GrayText" fontWeight="bold">
          SUPPLY APY
        </StatLabel>
        <StatNumber>{apy.data ? `${apy.data} %` : 'Loading...'}</StatNumber>
      </Stat>

      <Stat w="100%" p="3" border="1px solid" rounded="8" size="sm">
        <StatLabel color="GrayText" fontWeight="bold">
          CDAI BALANCE
        </StatLabel>
        <StatNumber>{cdaiBalance || 'Loading...'}</StatNumber>
      </Stat>
    </StatGroup>
  )
}

/**
 * Exports
 */

export default Stats
