import { ChevronRightIcon } from '@chakra-ui/icons'
import { Avatar, Container, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

import Connect from '../../components/Connect'
import Nav from '../../components/Nav'
import useCdaiSupplyApy from '../../hooks/useCdaiApy'
import { useIsMounted } from '../../hooks/useIsMounted'
import useIsValidNetwork from '../../hooks/useIsValidNetwork'
import InvalidNetworkMessage from './components/InvalidNetworkMessage'

/**
 * Home
 */

const Home: NextPage = () => {
  const router = useRouter()
  const isMounted = useIsMounted()
  const { isConnected } = useAccount()
  const isValidNetwork = useIsValidNetwork()
  const { data: apy } = useCdaiSupplyApy()

  useEffect(() => {
    if (isConnected && isValidNetwork) {
      router.push('/dashboard')
    }
  }, [isConnected, isValidNetwork, router])

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <Head>
        <title>Exactly Challenge</title>
        <link rel="icon" href="/exactly.svg" />
      </Head>

      <Nav hideConnectButton />

      <Container maxW="2xl" py="10" role="main">
        {isConnected && !isValidNetwork && <InvalidNetworkMessage />}
        <Flex align="center" direction="column" px={6} py={10} textAlign="center">
          <Flex align="center" justify="space-around">
            <Avatar mr="5" name="Compound logo" src="/compound.svg" />
            <ChevronRightIcon fontSize="2xl" />
            <Avatar ml="5" name="DAI logo" src="/dai.svg" />
          </Flex>
          <Heading as="h1" mt={6} mb={2} size="xl">
            DAI Market for Compound
          </Heading>
          <Text color="gray.500">
            Use Compound&apos;s CDAI platform to invest your DAI and earn up to&nbsp;
            <Text as="span" fontWeight="bold">
              {apy ? formatApy(apy) : '0.21'}% APY
            </Text>
          </Text>

          {(!isConnected || (isConnected && isValidNetwork)) && (
            <>
              <Divider mt="4" />
              <Heading as="h2" mt="5" fontWeight="medium" size="md">
                Connect with
              </Heading>
              <Flex justify="center" mt="5">
                <Connect />
              </Flex>
            </>
          )}
        </Flex>
      </Container>
    </div>
  )
}

/**
 * Helpers
 */

const formatApy = (apy: number) => {
  return Math.round(apy * 100) / 100
}

/**
 * Exports
 */

export default Home
