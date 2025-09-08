import { Category, TrType } from '@/enums'

export interface Transaction {
  readonly id?: string
  signature: string
  amount: number
  type: TrType.Income | TrType.Expense
  date: string
  category: Category
  description?: string
}

export interface ExpectingTransaction extends Transaction {
    time: number
}
