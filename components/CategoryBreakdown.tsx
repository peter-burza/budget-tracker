import { Category, Transaction } from "@/app/interfaces/Transaction"

interface CategoryBreakdownProps {
    dateFilteredTransactions: Transaction[]
}

type CategorySummary = {
    category: Category;
    total: number;
    percentage: number;
};

function getExpenseBreakdown(transactions: Transaction[]): CategorySummary[] {
    const expenses = transactions.filter(t => t.type === "-");
    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

    const categoryMap = new Map<Category, number>();

    expenses.forEach(t => {
        categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
    });

    const breakdown: CategorySummary[] = Array.from(categoryMap.entries()).map(([category, total]) => ({
        category,
        total,
        percentage: totalExpense ? (total / totalExpense) * 100 : 0,
    }));

    return breakdown;
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ dateFilteredTransactions }) => {

    return (
        <div id="category-breakdown" className="flex flex-col items-center gap-4">
            <h4>Expense Breakdown</h4>
            <p className="text-center -mt-2">
                This table shows only expense categories and their share of total expenses.
            </p>

            <table className="list-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Total (€)</th>
                        <th>Share (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {getExpenseBreakdown(dateFilteredTransactions).map(({ category, total, percentage }) => (
                        <tr key={category}>
                            <td className="category-cell">
                                {category}
                            </td>
                            <td>{total.toFixed(2)}€</td>
                            <td>{percentage.toFixed(1)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CategoryBreakdown