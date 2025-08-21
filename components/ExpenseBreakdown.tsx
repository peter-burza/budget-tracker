import { Category, Transaction } from "@/app/interfaces/Transaction";
import ResponsiveHeader from "./ResponsiveHeader";
import { JSX } from "@emotion/react/jsx-runtime";

interface ExpenseBreakdownProps {
  dateFilteredTransactions: Transaction[];
  screenWidth: number
  currency: JSX.Element
}

type CategorySummary = {
  category: Category
  total: number
  percentage: number
};

function getExpenseBreakdown(transactions: Transaction[]): CategorySummary[] {
  const expenses = transactions.filter(t => t.type === "-")
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0)

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


const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ dateFilteredTransactions, screenWidth, currency }) => {
  const breakdown = getExpenseBreakdown(dateFilteredTransactions);

  return (
    <div id="expense-breakdown" className="flex flex-col items-center gap-4">
      <h4>Expense Breakdown</h4>
      <table className="expenses-table">
        <thead>
          <tr>
            <th>
              <ResponsiveHeader label="Category" iconClass="fa-icons" screenWidth={screenWidth} />
            </th>
            <th className="hoverable">
              <ResponsiveHeader label="Total" screenWidth={screenWidth} /> {currency}</th>
            <th className="hoverable">
              <ResponsiveHeader label="Share" screenWidth={screenWidth} /> (%)</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map(({ category, total, percentage }, idx) => {
            const isLastIdx = idx === breakdown.length - 1
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
