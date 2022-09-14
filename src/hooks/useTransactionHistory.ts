import { gql, useQuery } from '@apollo/client'
import _ from 'lodash'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'

import { Transaction, TransactionType } from '../types'

/**
 * Constants
 */

const TRANSACTIONS_QUERY = gql`
  query Transactions($address: String!) {
    mintEntities(orderBy: id, orderDirection: desc, where: { address: $address }) {
      id
      address
      amount
    }

    approvalEntities(orderBy: id, orderDirection: desc, where: { address: $address }) {
      id
      address
      amount
    }

    borrowEntities(orderBy: id, orderDirection: desc, where: { address: $address }) {
      id
      address
      amount
    }

    redeemEntities(orderBy: id, orderDirection: desc, where: { address: $address }) {
      id
      address
      amount
    }
  }
`

interface TransactionHistoryQueryResultData {
  mintEntities: Transaction[]
  approvalEntities: Transaction[]
  borrowEntities: Transaction[]
  redeemEntities: Transaction[]
  repayEntities: Transaction[]
}

const useTransactionHistory = () => {
  const { address } = useAccount()

  const response = useQuery<TransactionHistoryQueryResultData>(TRANSACTIONS_QUERY, {
    pollInterval: 5000,
    variables: { address },
  })

  const data = useMemo(() => {
    if (response.data) {
      const mintEntities = response.data.mintEntities.map((item) => ({
        ...item,
        type: 'supply' as TransactionType,
      }))

      const approvalEntities = response.data.approvalEntities.map((item) => ({
        ...item,
        type: 'approval' as TransactionType,
      }))

      const redeemEntities = response.data.redeemEntities.map((item) => ({
        ...item,
        type: 'redeem' as TransactionType,
      }))

      const borrowEntities = response.data.borrowEntities.map((item) => ({
        ...item,
        type: 'redeem' as TransactionType,
      }))

      return _.chain(mintEntities)
        .concat(approvalEntities)
        .concat(redeemEntities)
        .concat(borrowEntities)
        .sortBy('date')
        .value()
    }
  }, [response.data])

  return {
    ...response,
    data,
  }
}

export default useTransactionHistory
