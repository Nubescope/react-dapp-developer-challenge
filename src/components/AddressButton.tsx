import { CheckIcon, ChevronDownIcon, CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import { parseUnits } from 'ethers/lib/utils'
import React, { useEffect, useState } from 'react'
import { useAccount, useBalance, useDisconnect } from 'wagmi'

import formatBigNumber from '../lib/formatters/formatBigNumber'

const AddressButton: React.FC<{}> = () => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [addressCopied, setAddressCopied] = useState(false)
  const { colorMode } = useColorMode()
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const { data: balance } = useBalance({ addressOrName: address })
  const formattedBalance = balance ? formatBigNumber(parseUnits(balance.formatted), 2) : ''
  const formattedAddress = address ? truncateAddress(address) : ''

  useEffect(() => {
    let t: NodeJS.Timeout

    if (addressCopied) {
      t = setTimeout(() => {
        setAddressCopied(false)
      }, 1000)
    }

    return () => clearTimeout(t)
  }, [addressCopied])

  const handleCopyAddressClick = () => {
    navigator.clipboard.writeText(address)
    setAddressCopied(true)
  }

  const handleDisconnectClick = () => {
    onClose()
    disconnect()
  }

  return (
    <>
      <Button p="0" colorScheme={colorMode === 'dark' ? 'blackAlpha' : undefined}>
        <Flex
          sx={{
            ':hover': { transform: 'scale(1.02)' },
          }}
          align="center"
          pr={[1, 0, 0.5]}
          pl={[1, 0, 3]}
          py="0.5"
          bg="white"
          borderRadius="10"
          shadow="md"
          onClick={onOpen}
        >
          <Text display={['none', 'none', 'inherit']} pr="3" fontWeight="bold">
            {formattedBalance} ETH
          </Text>
          <Flex align="center" p="2" bg="gray.100" borderRadius="10">
            <Avatar mr="2" size="2xs" />
            <Text mr="2" fontSize="md" fontWeight="bold">
              {formattedAddress}
            </Text>
            <ChevronDownIcon fontSize="xl" />
          </Flex>
        </Flex>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" direction="column">
              <Avatar mb="2" size="lg" />
              <Text fontSize="xl" fontWeight="bold">
                {formattedAddress}
              </Text>
              <Text fontSize="sm" fontWeight="normal" colorScheme="gray">
                {formattedBalance} ETH
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                minW={160}
                leftIcon={addressCopied ? <CheckIcon /> : <CopyIcon />}
                onClick={handleCopyAddressClick}
              >
                {addressCopied ? 'Address Copied' : 'Copy Address'}
              </Button>
              <Button minW={160} colorScheme="red" leftIcon={<ExternalLinkIcon />} onClick={handleDisconnectClick}>
                Disconnect
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

/**
 * Helpers
 */

const truncateAddress = (address: string) => {
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
}

/**
 * Exports
 */

export default AddressButton
