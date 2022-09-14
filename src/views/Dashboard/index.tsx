import { Button, ButtonGroup, Container, Flex, Heading, Spinner, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { formatUnits } from 'ethers/lib/utils'
import { noop } from 'lodash'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAccount, useWaitForTransaction } from 'wagmi'

import Nav from '../../components/Nav'
import useAllowance from '../../hooks/useAllowance'
import useCdaiApprove from '../../hooks/useCdaiApprove'
import useCdaiDisapprove from '../../hooks/useCdaiDisapprove'
import { useIsMounted } from '../../hooks/useIsMounted'
import useTransactionHistory from '../../hooks/useTransactionHistory'
import { Transaction } from '../../types'
import DaiLogo from './components/DaiLogo'
import Stats from './components/Stats'
import SupplyModal from './components/SupplyModal'
import TransactionTable from './components/TransactionTable'

/**
 * Dashboard
 */

const Dashboard: NextPage = () => {
  const [localTransactions, setLocalTransactions] = useState<Transaction[]>([])
  const router = useRouter()
  const isMounted = useIsMounted()
  const supplyModalProps = useDisclosure()

  const { isDisconnected } = useAccount()
  const transactionHistoryQuery = useTransactionHistory()

  const { data: allowance, refetch: refetchAllowance } = useAllowance()

  const { isLoading: isApproveLoading, write: approveCdai = noop, data: approveResponseData } = useCdaiApprove()
  const { isLoading: isApproveRunning } = useWaitForTransaction({
    hash: approveResponseData?.hash,
  })
  const isEnablingMarket = isApproveLoading || isApproveRunning
  const isApproved = allowance ? parseFloat(formatUnits(allowance)) > 0 : false

  const {
    isLoading: isDisapproveLoading,
    write: disapproveCdai = noop,
    data: disapproveResponseData,
  } = useCdaiDisapprove()
  const { isLoading: isDisapproveRunning } = useWaitForTransaction({
    hash: disapproveResponseData?.hash,
  })
  const isDisabingMarket = isDisapproveLoading || isDisapproveRunning

  useEffect(() => {
    if (!isEnablingMarket) {
      refetchAllowance()
    }
  }, [isEnablingMarket, refetchAllowance])

  useEffect(() => {
    if (!isDisabingMarket) {
      refetchAllowance()
    }
  }, [isDisabingMarket, refetchAllowance])

  useEffect(() => {
    if (isDisconnected) {
      router?.push('/')
    }
  }, [isDisconnected, router])

  const handeSupplySuccess = (transaction: Transaction) => {
    setLocalTransactions([transaction, ...localTransactions])
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <Head>
        <title>Exactly Challenge</title>
        <link rel="icon" href="/exactly.svg" />
      </Head>

      <Nav />

      <Container maxW="4xl" py="10" role="main">
        <Stack justifyContent="space-between" direction="row" mb="10" spacing={7}>
          <Heading display="flex" size="2xl">
            <DaiLogo isApproved={isApproved} />
            <Text as="span" ml="3">
              DAI
            </Text>
          </Heading>
          <ButtonGroup>
            {isApproved && (
              <Button
                colorScheme="red"
                isLoading={isDisabingMarket}
                loadingText="Disabling Market"
                onClick={disapproveCdai}
              >
                Disable Market
              </Button>
            )}
            {allowance && !isApproved && (
              <Button
                colorScheme="blue"
                disabled={isApproved}
                isLoading={isEnablingMarket}
                loadingText="Enabling Market"
                onClick={approveCdai}
              >
                Enable Market
              </Button>
            )}
            {isApproved && (
              <Button colorScheme="blue" onClick={supplyModalProps.onOpen}>
                Supply
              </Button>
            )}
          </ButtonGroup>
        </Stack>

        <Stats />

        <Flex justify="space-between" direction="row" mb="5">
          <Heading as="h3" size="md">
            Recent Transactions
          </Heading>
        </Flex>
        <TransactionTable transactions={transactionHistoryQuery.data} localTransactions={localTransactions} />
        {transactionHistoryQuery.loading && (
          <Flex align="center" justify="center" pt="10">
            <Spinner />
          </Flex>
        )}
      </Container>

      <SupplyModal {...supplyModalProps} onSuccess={handeSupplySuccess} />
    </div>
  )
}

/**
 * Exports
 */

export default Dashboard
