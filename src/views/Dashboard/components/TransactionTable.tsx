import { ArrowForwardIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Link, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import { formatUnits } from 'ethers/lib/utils'
import React from 'react'

import { Transaction, TransactionType } from '../../../types'
import styles from './TransactionTable.module.css'

/**
 * Constants
 */

const TransactionActions: Record<TransactionType, string> = {
  supply: 'Supplied',
  borrow: 'Borrowed',
  redeem: 'Redeemed',
  repay: 'Repayed',
  approval: 'Approved',
}

/**
 * Types
 */

interface TransactionTableProps {
  localTransactions?: Transaction[]
  transactions?: Transaction[]
}

interface TransactionRowProps {
  transaction: Transaction
  highlight?: boolean
}

/**
 * TransactionRow
 */

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, highlight }) => {
  const timestamp = parseInt(transaction.id.replace(transaction.address, ''), 10) * 1000
  const date = format(timestamp, 'MMM d, HH:mmaaa')

  return (
    <Tr className={highlight ? styles.highlight : undefined} key={transaction.id}>
      <Td overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
        <ArrowForwardIcon p="1" bg="gray.600" color="white" borderRadius="10" mr="3" fontSize="xl" />{' '}
        {TransactionActions[transaction.type]} ${formatUnits(transaction.amount, 18).toString()} DAI
        {transaction.hash && (
          <Tooltip label="Check transaction on Etherscan">
            <Link
              pos="relative"
              bottom={0.5}
              ml="3"
              href={`https://rinkeby.etherscan.io/tx/${transaction?.hash}`}
              target="_blank"
            >
              <ExternalLinkIcon fontSize="lg" />
            </Link>
          </Tooltip>
        )}
      </Td>
      <Td overflow="hidden" maxW={[10, 40, 60]} whiteSpace="nowrap" textOverflow="ellipsis" isNumeric>
        {date}
      </Td>
    </Tr>
  )
}

/**
 * TransactionTable
 */

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, localTransactions }) => {
  return (
    <TableContainer>
      <Table size={['sm', 'sm', 'md']} variant="simple">
        {transactions && !localTransactions.length && !transactions.length && <TableCaption>No data yet</TableCaption>}
        <Thead>
          <Tr>
            <Th>Transaction</Th>
            <Th isNumeric>Date</Th>
          </Tr>
        </Thead>
        <Tbody fontWeight="medium">
          {localTransactions?.map((transaction) => {
            return <TransactionRow key={transaction.id} transaction={transaction} highlight />
          })}
          {transactions?.map((transaction) => {
            return <TransactionRow key={transaction.id} transaction={transaction} />
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

/**
 * Exports
 */

export default TransactionTable
