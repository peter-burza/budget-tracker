'use client'

import { Transaction } from "@/interfaces";
import { Category } from '@/enums'
import { TrType } from '@/enums'
import ResponsiveHeader from "./ui/ResponsiveHeader";
import { JSX } from "@emotion/react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { renderSortingIcon } from "./List";
import { Currency } from "@/types";
import { useTransactions } from "@/context/TransactionsContext";

interface ExpenseBreakdownProps {
  dateFilteredTransactions: Transaction[];
  screenWidth: number
  selectedCurrency: Currency
  totalExpense: number
  displayCategory: (category: Category) => string | JSX.Element
  isLoading: boolean
  displayAmount: (amount: number) => string
}

type CategorySummary = {
  category: Category
  total: number
  percentage: number
};

function sortTotalHighFirst(list: CategorySummary[]): CategorySummary[] {
  return [...list].sort((a, b) => new Date(b.total).getTime() - new Date(a.total).getTime());
}
function sortTotalLowFirst(list: CategorySummary[]): CategorySummary[] {
  return [...list].sort((a, b) => new Date(a.total).getTime() - new Date(b.total).getTime());
}

const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ dateFilteredTransactions, screenWidth, selectedCurrency, totalExpense, displayCategory, displayAmount, isLoading }) => {
  const { transactions } = useTransactions()
  const [totalAscending, setTotalAscending] = useState<boolean | null>(null);

  const orderedBreakdown = useMemo(() => {
    const breakdown = getExpenseBreakdown();
    if (totalAscending !== null) {
      return totalAscending === false ? sortTotalHighFirst(breakdown) : sortTotalLowFirst(breakdown)
    }

    return breakdown
  }, [totalAscending, dateFilteredTransactions])

  function getExpenseBreakdown(): CategorySummary[] {
    const expenses = dateFilteredTransactions.filter(t => t.type === TrType.Expense)
    const categoryMap = new Map<Category, number>()

    expenses.forEach(t => {
      categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
    });

    return Array.from(categoryMap.entries()).map(([category, total]) => ({
      category,
      total,
      percentage: totalExpense ? (total / totalExpense) * 100 : 0,
    }));
  }

  function setTotalReorder(): void {
    setTotalAscending((prev) => (prev === false ? true : false));
  }

  function resetOrdering(): void {
    setTotalAscending(null);
  }

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
            ? orderedBreakdown.map(({ category, total, percentage }, idx) => {
              const isLastIdx = idx === orderedBreakdown.length - 1
              return (
                <tr key={category} className="bg-sky-800">
                  <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{displayCategory(category)}</td>
                  <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{displayAmount(total)}{" "}{selectedCurrency.symbol}</td>
                  <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{percentage.toFixed(1)}%</td>
                </tr>
              );
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
  );
};

export default ExpenseBreakdown;
