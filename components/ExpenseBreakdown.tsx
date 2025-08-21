'use client'

import { Category, Transaction } from "@/app/interfaces/Transaction";
import ResponsiveHeader from "./ResponsiveHeader";
import { JSX } from "@emotion/react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { renderSortingIcon } from "./List";

interface ExpenseBreakdownProps {
  dateFilteredTransactions: Transaction[];
  screenWidth: number
  currency: JSX.Element
  totalExpense: number
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

const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ dateFilteredTransactions, screenWidth, currency, totalExpense }) => {
  const [totalAscending, setTotalAscending] = useState<boolean | null>(null);

  const orderedBreakdown = useMemo(() => {
    const breakdown = getExpenseBreakdown();
    if (!totalAscending) {
      return totalAscending === false ? sortTotalHighFirst(breakdown) : sortTotalLowFirst(breakdown)
    }

    return breakdown
  }, [totalAscending])

  function getExpenseBreakdown(): CategorySummary[] {
    const expenses = dateFilteredTransactions.filter(t => t.type === "-")
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
            <th className={`hoverable ${totalAscending === null && 'text-[var(--color-light-blue)]'}`} onClick={resetOrdering}>
              <ResponsiveHeader label="Category" iconClass="fa-icons" screenWidth={screenWidth} />
            </th>
            <th className="hoverable" onClick={setTotalReorder}>
              <ResponsiveHeader label="Total" screenWidth={screenWidth} /> (€)
              {renderSortingIcon(totalAscending)}
            </th>
            <th>
              <ResponsiveHeader label="Share" screenWidth={screenWidth} /> (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {orderedBreakdown.map(({ category, total, percentage }, idx) => {
            const isLastIdx = idx === orderedBreakdown.length - 1
            return (
              <tr key={category} className="bg-sky-800">
                <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{category}</td>
                <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{total.toFixed(2)}€</td>
                <td className={`${isLastIdx ? '!border-b-0' : ''}`}>{percentage.toFixed(1)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseBreakdown;
