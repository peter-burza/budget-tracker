'use client'

import { Transaction } from "@/interfaces"
import { Category } from '@/enums'
import { TrType } from '@/enums'
import ResponsiveHeader from "./ui/ResponsiveHeader"
import { JSX } from "@emotion/react/jsx-runtime"
import { useEffect, useMemo, useState } from "react"
import { renderSortingIcon } from "./TransactionsList"
import { Currency } from "@/types"
import { useTransactions } from "@/context/TransactionsContext"
// import { getMostUsedCurrency } from "./Summary"
import { useCurrencyStore } from "@/context/CurrencyState"
import { displayCategory, roundToTwo } from "@/utils"

interface ExpenseBreakdownProps {
  dateFilteredTransactions: Transaction[]
  screenWidth: number
  selectedCurrency: Currency
  totalExpense: number
  isLoading: boolean
  displayAmount: (amount: number, rate?: number) => string
}

type CategorySummary = {
  category: Category
  total: number
  percentage: number
  currency: Currency
}

function sortTotalHighFirst(list: CategorySummary[]): CategorySummary[] {
  return [...list].sort((a, b) => new Date(b.total).getTime() - new Date(a.total).getTime())
}
function sortTotalLowFirst(list: CategorySummary[]): CategorySummary[] {
  return [...list].sort((a, b) => new Date(a.total).getTime() - new Date(b.total).getTime())
}

const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ dateFilteredTransactions, screenWidth, selectedCurrency, totalExpense, displayAmount, isLoading }) => {
  const baseCurrency = useCurrencyStore(state => state.baseCurrency)
  const convertGlobalFunc = useCurrencyStore(state => state.convertGlobalFunc)
  const { transactions } = useTransactions()
  const [totalAscending, setTotalAscending] = useState<boolean | null>(null)
  const [orderedBreakdown, setOrderedBreakdown] = useState<CategorySummary[]>([])


  async function getExpenseBreakdown(): Promise<CategorySummary[]> {
    const expenses = dateFilteredTransactions.filter(t => t.type === TrType.Expense)
    const categoryMap: Record<string, { transactions: typeof expenses, totalAmount: number }> = {}

    for (const e of expenses) {
      const category = e.category as Category
      if (!category) continue

      if (!categoryMap[category]) {
        categoryMap[category] = {
          transactions: [],
          totalAmount: 0,
        }
      }

      const amountAddition =
        baseCurrency.code === selectedCurrency.code
          ? e.baseAmount
          : e.currency.code === selectedCurrency.code
            ? e.origAmount
            : await convertGlobalFunc(e.currency.code, selectedCurrency.code, e.origAmount)

      categoryMap[category].transactions.push(e)
      categoryMap[category].totalAmount += roundToTwo(amountAddition)
    }

    return Object.entries(categoryMap).map(([categoryKey, data]) => {
      const category = categoryKey as Category
      return {
        category,
        total: data.totalAmount,
        percentage: totalExpense ? (data.totalAmount / totalExpense) * 100 : 0,
        currency: selectedCurrency
      }
    })
  }

  function setTotalReorder(): void {
    setTotalAscending((prev) => (prev === false ? true : false))
  }

  function resetOrdering(): void {
    setTotalAscending(null)
  }


  useEffect(() => {
    async function fetchBreakdown() {
      const breakdown = await getExpenseBreakdown()
      const newOrderedBreakdown =
        totalAscending !== null
          ? (
            totalAscending === false
              ? sortTotalHighFirst(breakdown)
              : sortTotalLowFirst(breakdown)
          )
          : breakdown
      setOrderedBreakdown(newOrderedBreakdown)
          // if (totalAscending !== null) {
      //   const result = totalAscending === false ? sortTotalHighFirst(breakdown) : sortTotalLowFirst(breakdown)
      //   setOrderedBreakdown(result)
      // }
      // console.log('We are setting orderedBD to breakdown not ordered!');
      
      // setOrderedBreakdown(breakdown)
    }

    fetchBreakdown()
  }, [totalAscending, dateFilteredTransactions])


  return (
    <div id="expense-breakdown" className="flex flex-col items-center gap-4">
      <h4>Expense Breakdown</h4>
      <table className="expenses-table">
        <thead>
          <tr>
            <th className={`clickable ${totalAscending === null && 'text-[var(--color-light-blue)]'} category-table-header`} onClick={resetOrdering}>
              <ResponsiveHeader label="Category" iconClass="fa-icons" screenWidth={screenWidth} />
            </th>
            <th className="clickable" onClick={setTotalReorder}>
              <ResponsiveHeader label="Total" iconClass="fa-chart-simple" screenWidth={screenWidth} />
              {renderSortingIcon(totalAscending)}
            </th>
            <th>
              <ResponsiveHeader label="Percentage" iconClass="fa-percent" screenWidth={screenWidth} />
            </th>
          </tr>
        </thead>
        <tbody className={`${isLoading && 'opacity-50 duration-200'}`}>
          {dateFilteredTransactions.length > 0
            ? orderedBreakdown.map(({ category, total, percentage, currency }, idx) => {
              const isLastIdx = idx === orderedBreakdown.length - 1
              return (
                <tr key={category} className="bg-sky-800">
                  <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{displayCategory(category, screenWidth)}</td>
                  <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{total}{" "}{selectedCurrency.symbol}</td>
                  <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{percentage.toFixed(1)}%</td>
                </tr>
              )
            })
            : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  <p className="text-gray-400">
                    {transactions.length > 0
                      ? 'No transactions for selected period.'
                      : 'No transactions detected.'}
                  </p>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseBreakdown
