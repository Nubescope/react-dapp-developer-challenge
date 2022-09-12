import { Alert, AlertDescription, AlertIcon, AlertTitle, Avatar, Button, ButtonGroup } from '@chakra-ui/react'
import * as React from 'react'
import { useAccount, useConnect } from 'wagmi'

import { useIsMounted } from '../hooks/useIsMounted'

/**
 * Constants
 */

const WalletIconUrls = {
  metaMask: '/metamask.svg',
  walletConnect: '/walletconnect.svg',
  coinbaseWallet: 'coinbase.svg',
}

/**
 * Connect
 */

const Connect: React.FC = () => {
  const isMounted = useIsMounted()
  const { address, connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div>
        {isConnected && (
          <Alert justifyContent="center" mt="3" fontSize="sm" status="success">
            <AlertIcon />
            <AlertTitle>Address</AlertTitle>
            <AlertDescription>{address}</AlertDescription>
          </Alert>
        )}

        <ButtonGroup flexDir={['column', 'row']}>
          {!isConnected &&
            connectors
              .filter((x) => x.ready && x.id !== connector?.id)
              .map((wallet) => {
                const isConnecting = isLoading && wallet.id === pendingConnector?.id
                const isDisabled = isLoading && wallet.id !== pendingConnector?.id

                return (
                  <Button
                    key={wallet.id}
                    alignItems="center"
                    mb={[2, 0]}
                    disabled={isDisabled}
                    isLoading={isConnecting}
                    leftIcon={<Avatar bg="transparent" size="xs" src={WalletIconUrls[wallet.id]} />}
                    loadingText={wallet.name}
                    onClick={() => connect({ connector: wallet })}
                  >
                    {wallet.name}
                  </Button>
                )
              })}
        </ButtonGroup>
      </div>

      {error && (
        <Alert justifyContent="center" mt="3" status="error">
          <AlertIcon />
          <AlertTitle>Connect Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

/**
 * Exports
 */

export default Connect
