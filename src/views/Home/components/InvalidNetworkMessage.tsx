import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import React from 'react'

const InvalidNetworkMessage = () => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Invalid Network</AlertTitle>
      <AlertDescription>Please connect to Rinkeby in order to use this dapp</AlertDescription>
    </Alert>
  )
}

export default InvalidNetworkMessage
