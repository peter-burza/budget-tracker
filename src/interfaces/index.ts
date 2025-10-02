import { Category, TrType } from '@/enums'
import { Currency } from '@/types'

export interface Transaction {
  readonly id?: string
  signature: string
  origAmount: number
  baseAmount: number
  currency: Currency
  type: TrType.Income | TrType.Expense
  date: string
  category: Category
  description?: string
  exchangeRate: number // 1 (baseCurrency) = exchangeRate (origCurrency)
}

export interface ExpectingTransaction {
  readonly id?: string
  signature: string
  origAmount: number
  baseAmount: number
  currency: Currency
  type: TrType.Income | TrType.Expense
  payDay: number
  startDate: string
  category: Category
  description?: string
  exchangeRate: number // 1 (baseCurrency) = exchangeRate (origCurrency)
  processedMonths: string[]
}