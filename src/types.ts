export type TransactionType = 'supply' | 'borrow' | 'approval' | 'repay' | 'redeem'

export interface Transaction {
  type: TransactionType
  id: string
  amount: string
  address: string
  tokens: string
  hash?: string
}
