import { ArrowUpIcon, CheckIcon, NotAllowedIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { isEmpty } from 'lodash'
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useAccount, useWaitForTransaction } from 'wagmi'

import useCdaiMint from '../../../hooks/useCdaiMint'
import useDaiBalance from '../../../hooks/useDaiBalance'
import formatBigNumber from '../../../lib/formatters/formatBigNumber'
import { Transaction } from '../../../types'

/**
 * Types
 */

interface Props {
  isOpen: boolean
  onClose: () => void
  onSuccess: (transaction: Transaction) => void
}

/**
 * DepositModal
 */

const DepositModal: React.FC<Props> = ({ onSuccess, onClose, isOpen }) => {
  const { address } = useAccount()
  const balanceResponse = useDaiBalance()
  const [amount, setAmount] = useState('')
  const { write: mint, isLoading: isMintRunning, data: mintResponseData, reset } = useCdaiMint()
  const inputRef = useRef<HTMLInputElement>(null)
  const balance = balanceResponse.data

  const mintTransactionHash = mintResponseData?.hash
  const lastInformedTransactionHash = useRef<string>()

  const { isLoading: isTransactionRunning, isSuccess: isTransactionSuccess } = useWaitForTransaction({
    hash: mintTransactionHash,
  })

  const displayBalance = useMemo(() => {
    if (!balance) {
      return 0
    }

    return formatBigNumber(balance, 4)
  }, [balance])

  useEffect(() => {
    if (isTransactionSuccess) {
      reset()
      onClose()
    }
  }, [isTransactionSuccess, onClose, reset])

  useEffect(() => {
    const isInformed = mintTransactionHash && lastInformedTransactionHash.current === mintTransactionHash

    if (!isInformed && isTransactionSuccess) {
      onSuccess({
        type: 'supply',
        id: `${address}${Date.now() / 1000}`,
        amount: parseUnits(amount).toString(),
        address: address || '',
        tokens: '0',
        hash: mintTransactionHash,
      })

      lastInformedTransactionHash.current = mintTransactionHash
    }
  }, [address, amount, isTransactionSuccess, mintTransactionHash, onSuccess])

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const handleMaxAmountClick = () => {
    if (inputRef?.current && balance) {
      const val = formatBigNumber(balance, 4)

      inputRef.current.value = val
      setAmount(val)
    }
  }

  const handleSupplyClick = () => {
    const val = parseUnits(amount)
    mint?.({ recklesslySetUnpreparedArgs: val })
  }

  const isRunning = isMintRunning || isTransactionRunning
  const isValidAmount = balance ? parseFloat(formatUnits(balance)) >= parseFloat(amount) : false
  const hasAmount = !isEmpty(amount)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="lg">
        <ModalHeader>
          <Flex align="center">
            <Avatar mr="2" name="DAI logo" size="xs" src="/dai.svg" />
            DAI
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <form>
          <ModalBody>
            <InputGroup>
              <InputLeftElement color="gray.300" fontSize="1.2em" pointerEvents="none">
                $
              </InputLeftElement>
              <Input
                ref={inputRef}
                autoFocus
                disabled={isRunning || isTransactionSuccess}
                errorBorderColor="red.300"
                isInvalid={hasAmount && !isValidAmount}
                maxLength={4}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                type="number"
              />
              <InputRightElement>
                {hasAmount && isValidAmount && <CheckIcon color="green.500" />}
                {hasAmount && !isValidAmount && <NotAllowedIcon color="red.300" />}
              </InputRightElement>
            </InputGroup>
          </ModalBody>

          <ModalFooter justifyContent="space-between" flexDir={['column', 'row']} display="flex">
            <Flex align="center" mb={[10, 0]} fontSize="sm">
              <Text color="GrayText">Wallet Balance: &nbsp;</Text>
              <Flex align="center" direction="row">
                <Text color="HighlightText">${displayBalance}</Text>
                <Tooltip label="Set max amount">
                  <Button ml="2" disabled={isRunning} onClick={handleMaxAmountClick} size="xs">
                    <ArrowUpIcon />
                  </Button>
                </Tooltip>
              </Flex>
            </Flex>
            <Box>
              <Button mr={3} onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                disabled={isRunning || isTransactionSuccess || !isValidAmount}
                isLoading={isRunning}
                loadingText="Supplying"
                onClick={handleSupplyClick}
                type="submit"
              >
                {isTransactionSuccess ? <CheckIcon /> : 'Supply'}
              </Button>
            </Box>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

/**
 * Exports
 */

export default DepositModal
