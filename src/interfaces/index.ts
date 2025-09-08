import { Category, TrType } from '@/enums'
import { Currency } from '@/types'

export interface Transaction {
  readonly id?: string
  signature: string
  baseAmount: number
  origAmount: number
  orig_currency: Currency
  type: TrType.Income | TrType.Expense
  date: string
  category: Category
  description?: string
}

export interface ExpectingTransaction extends Transaction {
    time: number
    // repeatPeriod:
}